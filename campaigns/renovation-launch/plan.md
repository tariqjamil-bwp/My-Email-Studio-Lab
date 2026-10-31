# Naqshar renovation launch plan

Status: draft. Anything marked **ASSUMPTION** was not provided and needs checking before this plan is used.

## 1. Campaign overview

- **Suggested name:** Renovation Launch
- **Summary:** Introduce Naqshar's renovation design services to homeowners through a four-email sequence, with a version of each email for each customer group, ending with a request for a quote.
- **Primary objective:** Get homeowners to request a quote. **ASSUMPTION:** The campaign promotes the design services listed on the website, and the call to action is "Get A Quote."
- **Target number:** To be set. No quote-request goal or benchmark has been provided.
- **Secondary objective:** Learn which customer group responds to which message.

## 2. Target audience

- **Primary audience:** Homeowners planning a renovation, from `leads/leads.csv`, split into customer groups. **ASSUMPTION:** The groups are defined in that file. It is currently empty, so the groups are unknown.
- **Secondary audience:** None yet.
- **Pain points and motivations:** Unknown. To fill in from the customer data. The brand interview says the emails should leave readers feeling inspired.
- **Where they are reached:** Email only, the studio's channel.
- **Buying stage:** **ASSUMPTION:** Consideration. They know the studio but haven't asked for a quote.

## 3. Key messages

- **Core message:** To be written. Start from the tagline "Building Ideas Into Lasting Spaces" in `brand/voice.md`.
- **Supporting messages:** To be written once the service details are confirmed.
- **Proof points:** The website claims listed in `brand/voice.md`, each checked before use.
- **Voice:** Follow `brand/voice.md`.

## 4. Channel strategy

- **Channel:** Email only. The studio is set up for email campaigns.
- **Format:** Four emails, each with a version per customer group.
- **Effort:** Medium.
- **Budget allocation:** Not provided, so this plan does not allocate budget.

## 5. Content calendar

**ASSUMPTION:** One email per week over four weeks. The schedule should be adjusted once a launch date is known.

| Week | Content piece | Channel | Owner/Notes | Status |
|------|---------------|---------|-------------|--------|
| 1 | Email 1: introduce our renovation design service | Email | Group versions needed | Not started |
| 2 | Email 2: what the design process includes | Email | Group versions needed | Not started |
| 3 | Email 3: answers to common questions | Email | Group versions needed | Not started |
| 4 | Email 4: request a quote | Email | Group versions needed | Not started |

**Dependencies:**
- The group versions depend on the customer groups in `leads/leads.csv`.
- Email 1 depends on confirming the service details.

## 6. Content pieces needed

- **Must have:** Four emails in `campaigns/renovation-launch/emails/`.
- **Must have:** A group version of each email in `campaigns/renovation-launch/groups/`.
- **Nice to have:** None yet.

## 7. Success metrics

- **Primary KPI:** Quote requests. Target to be set.
- **Secondary KPIs:** Email open rate, click rate, unsubscribe rate, and quote requests by group.
- **Tracking:** Resend is planned in `.mcp.json` but not connected yet. Until then, track results manually.
- **Reporting cadence:** **ASSUMPTION:** Weekly during the campaign.
- **Benchmarks:** None, since no historical data has been provided.

## 8. Budget allocation

Not provided. This plan is channel-agnostic. Add a budget, and a 10 to 15 percent contingency, once one is known.

## 9. Risks and mitigations

- **Customer groups are undefined.** `leads/leads.csv` is empty, so the group versions can't be written. Mitigation: fill in the leads file first.
- **The service details are unconfirmed.** Without them, the emails would be generic. Mitigation: confirm the services and the quote process before drafting.
- **Unverified website claims.** The guarantee terms and the percentages in `brand/voice.md` need checking before use.
- **Accidental sends to real people.** The `send-guard` hook is still a stub. Mitigation: follow the CLAUDE.md rule that email is never sent from this project, and implement the hook before any sending tool is connected.

## 10. Next steps

1. Confirm the renovation services and the quote process.
2. Fill in `leads/leads.csv` and define the customer groups.
3. Check the website claims in `brand/voice.md`.
4. Confirm the timeline and the quote-request target.
5. Draft email 1, then its group versions, for your review.
