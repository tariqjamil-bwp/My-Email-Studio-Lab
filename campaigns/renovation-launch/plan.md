# Renovation Launch: campaign plan

Status: draft from the marketing plugin's campaign-plan skill. Anything marked **ASSUMPTION** was not provided and needs checking before this plan is used.

## 1. Campaign overview

- **Campaign name:** Renovation Launch
- **Summary:** Introduce Naqshar's renovation design service to homeowners on our list, through a four-email sequence over four weeks. Each email is written for one of three customer groups, and the sequence ends with a request for a quote.
- **Primary objective:** 30 quote requests in the first month of the campaign (conversion).
- **Secondary objectives:**
  - Learn which customer group responds to which message.
  - Get enquiries from about 200 homeowners who have already expressed interest.

## 2. Target audience

- **Primary audience:** About 200 homeowners who enquired about a renovation, from `leads/leads.csv`. They fall into three groups:
  - **first-time renovators:** have not renovated before and need to understand the process.
  - **kitchen and bath upgraders:** planning a focused upgrade to one or two rooms.
  - **whole-home remodellers:** planning a larger project covering the whole house.
- **Secondary audience:** None yet.
- **Pain points and motivations:** **ASSUMPTION:** Homeowners worry about cost surprises, delays and unclear next steps. They want a space that suits their life and feels inspiring. The leads file is currently empty, so this is not yet confirmed by customer data.
- **Where they are reached:** Email only, the studio's channel.
- **Buying stage:** **ASSUMPTION:** Consideration. They have enquired but have not yet asked for a quote.

## 3. Key messages

- **Core message:** Building Ideas Into Lasting Spaces: a considered plan for your home, from first sketch to finished space.
- **Supporting messages:**
  1. **Clear process:** The design work follows clear steps, from concept to construction drawings (from the website's services).
  2. **Tailored to you:** Each group gets a version that speaks to its own kind of project.
  3. **Thoughtful, functional design:** Spaces are planned for how they will be used, and built to last.
  4. **Next step:** Request a quote, and the studio will talk through your project.
- **Proof points:** The website claims listed in `brand/voice.md`. Each one must be checked before it is used in an email, including the 100% satisfaction guarantee and the percentages.
- **Voice:** Warm, clear and inspiring, following `brand/voice.md`. No fixed prices, no health claims.

## 4. Channel strategy

- **Channel:** Email only. The studio is set up for email campaigns, and the brief rules out paid ads.
- **Format:** Four emails, each with a version for each of the three customer groups.
- **Effort:** Medium.
- **Budget allocation:** Small budget, email only. Not allocated in detail (see section 8).

## 5. Content calendar

Start date: **ASSUMPTION:** "The first Monday of next month" is Monday 2 November 2026. The four weeks are shown below, and the schedule should be adjusted if the launch date changes.

| Week | Dates (Mon to Sun) | Content piece | Channel | Owner/Notes | Status |
|------|--------------------|---------------|---------|-------------|--------|
| 1 | 2 to 8 Nov 2026 | Email 1: introduce our renovation design service | Email | Group versions needed | Not started |
| 2 | 9 to 15 Nov 2026 | Email 2: what the design process includes | Email | Group versions needed | Not started |
| 3 | 16 to 22 Nov 2026 | Email 3: answers to common questions | Email | Group versions needed | Not started |
| 4 | 23 to 29 Nov 2026 | Email 4: request a quote | Email | Group versions needed | Not started |

Send days within each week are to be confirmed. **ASSUMPTION:** Mondays.

**Dependencies:**
- The group versions depend on the customer groups in `leads/leads.csv`.
- Email 1 depends on confirming the service details and the quote process.
- Email 4 depends on the quote request route (the "Get A Quote" button on the website) working.

## 6. Content pieces needed

- **Must have:** Four emails in `campaigns/renovation-launch/emails/`.
- **Must have:** A group version of each email in `campaigns/renovation-launch/groups/`.
- **Nice to have:** None yet.

## 7. Success metrics

- **Primary KPI:** Quote requests in the first month. **Target: 30.**
- **Secondary KPIs:** Email open rate, click rate, unsubscribe rate, and quote requests by group.
- **Tracking:** Resend is planned in `.mcp.json` but not connected yet. Until then, track results manually.
- **Reporting cadence:** **ASSUMPTION:** Weekly during the campaign.
- **Benchmarks:** None, since no historical data has been provided.

## 8. Budget allocation

Small budget, email only, no paid ads. The amount is not provided, so no split is given. Add a budget, and a 10 to 15 percent contingency, once one is known.

## 9. Risks and mitigations

- **Customer groups are undefined.** `leads/leads.csv` is empty, so the group versions can't be written. Mitigation: fill in the leads file first.
- **The service details and quote process are unconfirmed.** Without them, the emails would be generic. Mitigation: confirm the services and the quote route before drafting Email 1.
- **Unverified website claims.** The 100% satisfaction guarantee and the percentages in `brand/voice.md` need checking before use. Mitigation: confirm the guarantee terms and the figures, or leave them out.
- **Accidental sends to real people.** The `send-guard` hook is still a stub. Mitigation: follow the CLAUDE.md rule that email is never sent from this project, and implement the hook before any sending tool is connected.
- **Timing.** The start date is an assumption. Mitigation: confirm the launch date before the calendar is locked.

## 10. Next steps

1. Confirm the renovation services, the quote process and the launch date.
2. Fill in `leads/leads.csv` and define the three customer groups.
3. Check the website claims in `brand/voice.md`, including the guarantee terms and the percentages.
4. Confirm the quote-request target of 30 and the reporting cadence.
5. Draft Email 1, then its three group versions, for your review.
