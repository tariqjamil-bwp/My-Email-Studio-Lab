// Headless review of a campaign folder. Usage: node scripts/review.mjs <campaign-folder>
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}

const schema = readFileSync(resolve(root, "review/findings.schema.json"), "utf8");
const prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

const run = spawnSync(
  "claude",
  ["-p", prompt, "--output-format", "json", "--json-schema", schema, "--allowedTools", "Read,Glob,Grep"],
  { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);
if (run.error || run.status !== 0) {
  console.error("claude failed:", run.error?.message ?? run.stderr);
  process.exit(2);
}

let out = JSON.parse(run.stdout);
if (Array.isArray(out)) out = out[out.length - 1]; // list form: last item is the result
const findings = out?.structured_output?.findings;
if (!Array.isArray(findings)) {
  console.error("No structured_output.findings in result:", JSON.stringify(out).slice(0, 500));
  process.exit(2);
}

mkdirSync(resolve(root, "review"), { recursive: true });
writeFileSync(resolve(root, "review/findings.json"), JSON.stringify({ findings }, null, 2) + "\n");

const count = (s) => findings.filter((f) => f.severity === s).length;
console.log(
  `${folder}: ${findings.length} findings (${count("high")} high, ${count("medium")} medium, ${count("low")} low)`,
);
process.exit(count("high") > 0 ? 1 : 0);
