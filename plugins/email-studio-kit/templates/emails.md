---
paths:
  - "campaigns/**/emails/*.md"
---

# Email rules

Every email file must:

- Start with a line "Subject: ..." of 50 characters or fewer, then a line "Preview: ..." of 90 characters or fewer.
- Greet the reader with {{first_name}}.
- Have exactly one main link, written as [Button text](<MAIN LINK>).
- End with our sign-off from brand/voice.md, then this two-line footer as plain text, not inside a code block:

<FOOTER LINE 1: why the reader is getting this, for example "You're getting this because you enquired with <BRAND NAME>.">
<BRAND NAME>, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
