---
name: setup-email-rules
description: Add the standard email rules file to this project at .claude/rules/emails.md. Use when starting a new studio or client and the project has no email rules yet.
argument-hint: "[brand name]"
allowed-tools: Read, Glob, Write
---

# Set up email rules

Install the standard email rules so they apply to every email file in every campaign.

## Steps

1. If `.claude/rules/emails.md` already exists, stop and tell the user. Do not overwrite it.
2. Read `templates/emails.md` from this plugin (it sits two folders above this skill's base directory).
3. Ask the user for: the brand name, the main link for emails, and the two footer lines. If a brand name was given as an argument, use it and only ask for what is still missing.
4. Replace every `<...>` placeholder with the user's answers. Leave `{{first_name}}`, `{{company_address}}` and `{{unsubscribe_url}}` exactly as written. They are filled in at send time.
5. Write the result to `.claude/rules/emails.md`.
6. Reply with the path written and the five rules in one line each.
