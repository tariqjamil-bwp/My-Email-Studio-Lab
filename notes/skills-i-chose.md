# Skills I chose

I searched skills.sh for email marketing, email sequences, campaign plans and Resend. I checked who publishes each result and how many stars its GitHub repo has. I have not installed anything.

## Use these

**1. For writing campaigns: `coreyhaines31/marketingskills`**
- It has the most useful skills for this studio: `emails` for multi-email sequences, `copywriting` for the words themselves, and `cold-email` for outreach.
- It's the most-used source in the results: about 81K installs for `emails` and 241K for `copywriting`.
- It has 57,560 stars and is actively updated (last push 31 October 2026).
- The catch: it's published by one person, not a company. Treat its advice as a starting point, and check it against your own brand voice.

**2. For sending email: `resend/resend-skills`**
- Resend is the sending service we planned to connect in `.mcp.json`, so its own skills are the right fit.
- It's published by the `resend` organization, which is the company behind the service. Its `resend` skill is the one for sending.
- Verified: the GitHub organization `github.com/resend` lists `https://resend.com` as its website, and resend.com links back to `github.com/resend`. The two point at each other, so the organization is the company's own account.
- The catch: it has only 208 stars, so rely on the publisher being the company that runs the service, not on popularity. The related `resend/email-best-practices` repo (also official, 146 stars) is worth reading alongside it.

## Avoid these

**1. `mbfinotti/sales-skills`**
- It has 3 stars and about 30K installs. Stars are a rough measure of real use, and this ratio is a red flag.
- It's published by one person, and its focus is sales outreach rather than your studio's campaigns.

**2. `caffeinelabs/skills` (`extension-email-marketing`)**
- It has 2 stars and about 29K installs. The installs don't match the stars, which is the same warning sign.
- Its publisher is a GitHub organization, `caffeinelabs`. I didn't check it further, and I haven't read its contents.

## How I decided

Before installing any skill, I'd check three things:

1. **Who publishes it?** Prefer the company that runs the service (for example `resend`) or a known, named author. Check whether the owner is a person or an organization.
2. **Does the repo show real use?** Look at the stars, the date of the last update, and whether the install count makes sense for the star count.
3. **What does it actually do?** Read the `SKILL.md` file and any scripts, hooks or config files. Look for anything that sends email, reads keys, or runs commands on your machine. I've only read the descriptions and folder layouts so far, so this step is still open for the two I recommend.
