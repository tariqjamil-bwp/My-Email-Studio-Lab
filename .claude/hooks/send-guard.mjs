// Send guard: a PreToolUse hook for every Resend tool.
// Allows sending only to Resend test addresses (@resend.dev) and the studio owner.
// Anything unclear is blocked (fail closed).

const OWNER = "owner@example.com";
const TEST_DOMAIN = "resend.dev";

// Tools that send or reply or forward and carry explicit recipients.
const RECIPIENT_TOOLS = new Set([
  "send-email",
  "send-batch-emails",
  "send-new-inbox-email",
  "reply-to-inbox-thread-email",
  "forward-inbox-thread-email",
  "share-email",
]);

// Tools that send to a stored audience or draft, so the recipients can't be checked here.
const BLOCKED_TOOLS = new Set([
  "send-broadcast",
  "send-inbox-draft",
  "send-event",
  "manage-events",
  "create-automation",
  "update-automation",
]);

const RECIPIENT_KEYS = new Set(["to", "cc", "bcc", "reply_to", "replyto", "recipients", "recipient", "email"]);

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: `Send guard: ${reason}`,
      },
    }),
  );
  process.exit(0);
}

function allow() {
  process.exit(0);
}

function isAllowed(address) {
  const a = address.trim().toLowerCase();
  if (a === OWNER) return true;
  const at = a.lastIndexOf("@");
  return at > 0 && a.slice(at + 1) === TEST_DOMAIN;
}

// Collect every recipient string under recipient-like keys, at any depth.
function collect(value, underRecipientKey, out) {
  if (typeof value === "string") {
    if (underRecipientKey) out.push(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collect(v, underRecipientKey, out);
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      collect(v, underRecipientKey || RECIPIENT_KEYS.has(k.toLowerCase()), out);
    }
  }
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let event;
try {
  event = JSON.parse(raw);
} catch {
  deny("could not read the tool call, so it was blocked.");
}

const tool = String(event.tool_name ?? "");
const match = tool.match(/^mcp__resend__(.+)$/);
if (!match) allow();
const name = match[1];

if (BLOCKED_TOOLS.has(name)) {
  deny(`${name} sends to a stored audience or draft, so its recipients can't be checked. Send with send-email to an allowed address instead.`);
}
if (!RECIPIENT_TOOLS.has(name)) allow(); // reads, lists and other non-sending tools

const found = [];
collect(event.tool_input ?? {}, false, found);

// Pull out the address from "Name <a@b.com>" forms, and split comma lists.
const addresses = [];
for (const s of found) {
  for (const part of s.split(",")) {
    const m = part.match(/<([^>]+)>/);
    const addr = (m ? m[1] : part).trim();
    if (addr) addresses.push(addr);
  }
}

if (addresses.length === 0) {
  deny(`${name} has no recipient I can check, so it was blocked.`);
}
const bad = addresses.filter((a) => !isAllowed(a));
if (bad.length > 0) {
  deny(`blocked ${name}. Not allowed: ${bad.join(", ")}. Only @${TEST_DOMAIN} addresses and ${OWNER} are allowed.`);
}
allow();
