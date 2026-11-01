# My Email Studio Lab

A practice studio for planning, writing, personalizing, reviewing and (safely) sending email campaigns with [Claude Code](https://claude.com/claude-code).

The sample brand is **Naqshar Architect Studio**, a small architecture studio launching a renovation design service for homeowners. All customers in this repo are made-up practice people. **No real email is ever sent.**

> **Practice project, not affiliated with Naqshar.** This is a learning exercise. The studio name, website links and brand claims in `brand/voice.md` are used only as sample material. Nothing here is written, approved or endorsed by Naqshar Architect Studio, and none of the customers, reviews or campaign emails are real. Don't send these emails to real people.

## What is in the repo

```
My-Email-Studio-Lab/
├── CLAUDE.md                     the studio's rules (Claude reads this every session)
├── brand/voice.md                how the brand sounds, and what it must never claim
├── leads/
│   ├── leads.csv                 24 practice customers, all @example.com
│   └── CLAUDE.md                 rules for this folder only
├── campaigns/
│   ├── renovation-launch/        the real sample campaign
│   │   ├── plan.md               the campaign plan
│   │   ├── emails/               4 launch emails
│   │   └── groups/               a version of each email per customer group
│   └── test-bad/                 a deliberately bad campaign, used to test the review
├── notes/                        research notes, handoff notes, review-mining scratchpad
├── review/                       findings.json and findings.schema.json (review output)
├── scripts/review.mjs            automatic (headless) email review
├── plugins/email-studio-kit/     the packaged plugin (skills, review script, templates)
├── .claude-plugin/marketplace.json  makes this repo a plugin marketplace
├── .claude/
│   ├── settings.json             project plugin, marketplace and the send-guard hook
│   ├── rules/emails.md           rules that apply to every email file
│   ├── skills/personalize/       the personalize skill
│   └── hooks/send-guard.mjs      blocks sends to anyone except test addresses and the owner
├── .mcp.json                     Resend connection (practice mode)
└── .github/workflows/            pull-request review and Claude Code workflows
```

## Plugins and skills

### 1. The `marketing` plugin (installed for this project)

This repo uses Anthropic's official **marketing** plugin from the `anthropics/knowledge-work-plugins` marketplace. It is enabled for the project in `.claude/settings.json`, so anyone who clones the repo and trusts the folder gets it.

Use these commands inside Claude Code:

| Command | What it does here |
|---|---|
| `/marketing:campaign-plan <idea>` | Builds a campaign plan. Save it to `campaigns/<name>/plan.md`. |
| `/marketing:email-sequence <brief>` | Drafts the emails. Save each to `campaigns/<name>/emails/`. |
| `/marketing:brand-review <folder>` | Reviews drafts against `brand/voice.md` and the email rules. |

Plugins load when a session starts. If you just cloned the repo, start (or restart) `claude` in this folder and accept the trust prompts.

### 2. The `personalize` skill (built in this repo)

`.claude/skills/personalize/SKILL.md` writes one version of every email for each lead group in `leads/leads.csv` (`first-time`, `kitchen-bath`, `whole-home`).

**How to use it**

```
/personalize campaigns/renovation-launch
```

- Run it only when the campaign's emails are final.
- It writes to `campaigns/<name>/groups/<group>/emails/`, using the same file names as the originals.
- Each version keeps the subject, preview, link and footer. Only the opening line and one example change.
- It runs in its own forked context (`context: fork`), so your chat gets a short summary, not every email.
- Its tools are limited to `Read, Glob, Grep, Write`.
- With no folder given, it stops and lists the campaign folders it could use.

### 3. The `email-studio-kit` plugin (packaged from this repo)

The reusable parts of this studio are also packaged as an installable plugin, so a second client's studio can use them without copying files. It lives in `plugins/email-studio-kit/`, and `.claude-plugin/marketplace.json` makes this repo a plugin marketplace.

**What is inside**

| Part | What it does |
|---|---|
| `/email-studio-kit:personalize <folder>` | Same as the project skill above, but works in any studio. It uses whatever groups are in that studio's `leads/leads.csv`. |
| `/email-studio-kit:setup-email-rules [brand name]` | Creates `.claude/rules/emails.md` from a template. It asks for your brand name, main link and footer, and never overwrites an existing file. |
| `/email-studio-kit:review-campaign <folder>` | Runs the headless review and saves `review/findings.json` in the project you run it from. |
| `scripts/review.mjs` | The review script. It reviews the folder you run it in; the findings schema ships with the plugin. |

**Install it in another project**

```
claude plugin marketplace add tariqjamil-bwp/My-Email-Studio-Lab
claude plugin install email-studio-kit@email-studio-lab --scope project
```

Then restart `claude` in that project. Plugins load when a session starts.

**Try it from a local clone, without installing**

```
claude --plugin-dir ./plugins/email-studio-kit
```

**Use it**

1. In a new studio, run `/email-studio-kit:setup-email-rules` once.
2. Write your emails into `campaigns/<name>/emails/`.
3. Run `/email-studio-kit:review-campaign campaigns/<name>` and fix what it finds.
4. Run `/email-studio-kit:personalize campaigns/<name>` to get one version per lead group.

**What it expects from the project:** `brand/voice.md`, `leads/leads.csv` with a `group` column, and campaigns under `campaigns/<name>/emails/`.

**Not included:** the send guard hook and the Resend connection. Those hold the studio's safety rules and the owner's address, so each studio sets up its own.

**Status:** the manifests pass `claude plugin validate`. The three skills and the packaged review script haven't been run end to end, and the install commands haven't been tried from a second project. This repo's own `.claude/skills/personalize/` copy still exists. With both in place you will see two `personalize` skills, and the plugin one has the `email-studio-kit:` prefix.

## Rules every email follows

From `.claude/rules/emails.md` (applies automatically to `campaigns/**/emails/*.md`):

- `Subject:` of 50 characters or fewer, then `Preview:` of 90 characters or fewer.
- Greets the reader with `{{first_name}}`.
- Exactly one main link.
- Ends with the sign-off from `brand/voice.md`, then the two-line plain-text footer.

From `brand/voice.md`: warm, clear, inspiring. Never promise a fixed price and never make health or wellness claims.

## Sending safely (Resend, practice mode)

`.mcp.json` connects to Resend, but the defaults point at a local practice server (`http://localhost:4000`) with a placeholder key, so nothing goes to the real internet by default.

A `PreToolUse` hook, `.claude/hooks/send-guard.mjs`, checks every Resend tool call:

- Allowed recipients: Resend test addresses (`@resend.dev`) and the studio owner's address.
- The owner's address is read from the `MY_EMAIL` environment variable, set in `.claude/settings.local.json`. That file is personal and git-ignored, so each person sets their own.
- Tools that send to a stored audience, such as broadcasts, drafts and automations, are blocked, because their recipients can't be checked.
- Anything unclear is blocked (the guard fails closed).

To change the connection, set `RESEND_API_KEY`, `RESEND_BASE_URL` or `SENDER_EMAIL_ADDRESS` in your environment. Never put a real key in a committed file.

## Automatic review

`scripts/review.mjs` runs Claude without chatting and returns results a program can read.

```
node scripts/review.mjs campaigns/renovation-launch
```

- Checks every email in the folder against `brand/voice.md` and `.claude/rules/emails.md`.
- Writes `review/findings.json`, which follows `review/findings.schema.json` (file, line, severity, problem, fix).
- If the last review was for the same folder, it passes the earlier findings back so fixed problems aren't repeated.
- Exit codes: `0` clean or only medium/low findings, `1` at least one high-severity finding, `2` the run itself failed.
- `campaigns/test-bad/` is a deliberately bad sample for testing that the review catches problems.

### In GitHub

`.github/workflows/review.yml` runs this review on pull requests that touch `campaigns/`, `brand/` or `.claude/rules/`. A change to the brand or the rules re-reviews every campaign. It skips `test-bad`. It needs the `ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN` repository secret. The other two workflows (`claude.yml`, `claude-code-review.yml`) add `@claude` mentions and a general Claude code review on pull requests.

## Getting started

1. Install **Node.js 22+**, **Git** and **Claude Code** (`npm install -g @anthropic-ai/claude-code`).
2. Clone this repo and open Claude Code in the folder: `claude`.
3. Accept the folder and plugin trust prompts.
4. Set `MY_EMAIL` in `.claude/settings.local.json` if you want the send guard to allow sends to your own address.
5. Try: `/personalize campaigns/renovation-launch`, then `node scripts/review.mjs campaigns/renovation-launch`.

## Working rules

1. Write in plain English.
2. Never send email to real people. Drafts and plans stay in this project. The only exceptions are Resend test addresses and the studio owner's own address, and the send guard enforces that.
3. Ask before deleting anything.

## Notes folder

`notes/` holds research and working notes: the skills shortlist, the two subject-line angles and handoff note, and a customer-review exercise (`notes/reviews/` and `notes/scratchpad.md`). The reviews are made-up practice data. The scratchpad is a per-finding log, and some of its delay counts are known to be overstated.
