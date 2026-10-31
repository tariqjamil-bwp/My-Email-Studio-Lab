# My-Email-Studio-Lab

Project guide for Claude.

## What the studio is for

Planning and writing email campaigns for a small business. The studio holds the brand voice, the customer leads, the campaign plans and drafts, and research notes.

## Folders

- `brand/`: how the brand sounds, including `voice.md`.
- `leads/`: the customer list (`leads.csv`) and rules for that folder (`leads/CLAUDE.md`).
- `campaigns/`: campaign plans and their drafts. `renovation-launch/` is the first campaign.
- `notes/`: research notes, such as the shortlist of skills in `notes/skills-i-chose.md`.

## Rules

1. Write in plain English.
2. Never send email to real people. Drafts and plans stay in this project. The only exception is sending through Resend, and only to Resend's test addresses (ending in @resend.dev) and to the studio owner's own address, tj.yazman@gmail.com. A guard will enforce this in the next step.
3. Ask before deleting anything.

## Brand voice

@brand/voice.md

## Full layout

```
My-Email-Studio-Lab/
├── CLAUDE.md            the studio's rules
├── brand/voice.md       how the brand sounds
├── leads/
│   ├── leads.csv        24 practice customers
│   └── CLAUDE.md        rules for this folder only
├── campaigns/renovation-launch/
│   ├── plan.md          the campaign plan
│   ├── emails/          4 launch emails
│   └── groups/          a version per customer group
├── notes/               research notes
├── .claude/
│   ├── rules/emails.md  rules for every email file
│   ├── skills/personalize/
│   └── hooks/send-guard.mjs
├── .mcp.json            connection to Resend
└── scripts/review.mjs   automatic review
```
