---
name: review-campaign
description: Review every email in a campaign folder against brand/voice.md and .claude/rules/emails.md and save structured findings. Use before sending, or in CI.
argument-hint: "[campaign folder]"
allowed-tools: Bash, Read, Glob, Grep
---

# Review campaign

Run the plugin's headless review on a campaign folder.

## Steps

1. If no campaign folder is given, stop and list the folders under `campaigns/`.
2. Run, from the project root: `node <this skill's base directory>/../../scripts/review.mjs <campaign folder>`.
3. The script writes `review/findings.json` in the project and prints a count by severity. Read that file.
4. Reply with the findings grouped by severity (high, medium, low): file, line, problem and suggested fix. Do not change any email files.

## Exit codes

- `0`: no high-severity findings.
- `1`: at least one high-severity finding.
- `2`: the review itself failed (for example, Claude returned something that was not JSON).
