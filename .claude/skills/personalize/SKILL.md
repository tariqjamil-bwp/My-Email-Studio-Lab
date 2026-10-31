---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize

Write one version of each campaign email for each lead group in `leads/leads.csv`.

## Steps

1. If no campaign folder is given, stop. List the folders under `campaigns/` that contain an `emails/` folder, and write nothing.
2. Read `leads/leads.csv` and collect the distinct values in the `group` column. The groups are first-time, kitchen-bath and whole-home.
3. For each email file in `<campaign folder>/emails/`, and for each group, write a version to `<campaign folder>/groups/<group>/emails/` with the same file name.
4. Each version keeps the same structure, subject, preview, link and footer as the original. Change only the opening line and one example, so the version fits that group.
5. Follow `.claude/rules/emails.md` for every version.
6. When finished, reply with a short summary only: how many files were written, and one example opening line per group. Do not paste the emails.
