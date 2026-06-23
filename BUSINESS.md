# BriefAsia Business Requirements

Last updated: 2026-06-23

This document summarizes the business scope of BriefAsia. It intentionally does
not describe the technical stack. For visual rules, read `DESIGN.md`.

BriefAsia should be built as a full news publication, close to the experience in
`BriefAsia (full site).html`, with an operating model similar to the existing
DTW site: an upstream content engine prepares publication-ready stories, the
editorial operation controls review and publishing, and the reader site presents
the final newsroom product.

---

## 1. Product Summary

BriefAsia is an Asia-focused business, markets, technology, real estate,
lifestyle, travel, sustainability, and perspectives publication.

The site serves readers who need fast, credible regional intelligence:

- Executives and operators.
- Investors and capital-market readers.
- Founders and startup teams.
- Policy and trade watchers.
- Real estate, travel, lifestyle, and sustainability professionals.
- Readers following Asia from both inside and outside the region.

The product promise:

> Tell readers what just happened in Asia, why it matters, and what to watch
> next.

BriefAsia is not a generic blog, company landing page, or content farm. It is a
newsroom product with strong editorial standards, visible trust policies,
newsletter habit loops, and commercial surfaces that are clearly separated from
journalism.

---

## 2. Core Operating Model

BriefAsia follows the same broad operating mechanism as DTW:

1. Sources and story candidates are gathered upstream.
2. The content engine filters relevant stories for BriefAsia.
3. The content engine drafts articles in BriefAsia's editorial voice.
4. Drafts retain source provenance and should never appear as unreviewed mystery
   content.
5. Editors review, revise, approve, reject, schedule, or publish stories.
6. Published stories become available on the reader site, vertical hubs,
   homepage modules, feeds, newsletters, search, account history, and related
   story surfaces.
7. Human editorial decisions always override automated drafts.
8. Commercial content is produced and labelled separately from newsroom
   journalism.

Business rule: automation supports the newsroom; it does not replace editorial
accountability.

---

## 3. Publication Identity

Name: BriefAsia

Positioning:

- Asia-wide business intelligence.
- Singapore-founded newsroom.
- Covers 12 markets across Asia.
- Publishes daily across many languages.
- Editorial lens: people, money, policy, markets, companies, infrastructure,
  technology, property, travel, lifestyle, and the energy transition.

Prototype newsroom facts to preserve unless the user changes them:

- Founded in Singapore in 2026.
- Covers 12 markets.
- Has 40+ correspondents.
- Editor in Chief: Mei Lin Tan.
- Editorial headquarters: Singapore.

Do not invent additional corporate history, awards, famous past employers, or
unverified biography claims.

---

## 4. Main Reader Segments

### Public Readers

Primary audience. They read homepage, article pages, vertical hubs, country
coverage, markets pages, RSS feeds, newsletters, podcasts, and trust pages.

Needs:

- Fast understanding of major Asia stories.
- Clear hierarchy of what matters.
- Trusted sourcing and correction practices.
- Easy saving, sharing, and newsletter subscription.
- Regional breadth without losing editorial focus.

### Registered Readers

Readers with accounts.

Needs:

- Saved articles.
- Reading history.
- Offline reading list.
- Followed topics.
- Account settings.
- Newsletter preferences.

### Newsletter Readers

Habit audience. They may arrive from newsletters more often than the homepage.

Needs:

- Clear newsletter value proposition.
- Multiple newsletters by topic and cadence.
- Easy selection of one or many newsletters.
- Confirmation states after signup.

### Editorial Team

Internal newsroom users.

Needs:

- Review story drafts.
- Confirm sources and labels.
- Publish, reject, schedule, or revise articles.
- Manage corrections.
- Manage editorial standards pages.
- Manage author and newsroom information.
- Keep commercial content separate from editorial content.

### Commercial Team

Handles advertising, sponsorships, branded content, partnerships, and media kit
requests.

Needs:

- Clearly defined commercial products.
- Audience and sponsorship pages.
- Contact channels.
- Rules that prevent commercial influence over newsroom coverage.

---

## 5. Editorial Verticals

Primary verticals must exist as top-level editorial destinations:

1. Asia
2. Finance
3. Technology
4. Real Estate
5. Travel & Dining
6. Lifestyle
7. Sustainability
8. Perspectives

Each vertical has its own hub, description, lead story, supporting stories,
subsections, and feed logic.

### Asia

Purpose: the regional front page.

Scope:

- Across Asia
- Markets
- Trending
- Politics
- Business
- Trade
- Environment

Asia also owns country navigation:

- Southeast Asia: Singapore, Vietnam, Indonesia, Malaysia, Philippines,
  Thailand.
- East Asia: China, Japan, South Korea, Taiwan, Hong Kong.
- South Asia: India, Bangladesh, Sri Lanka, Pakistan.

### Finance

Scope:

- Banking
- Fintech
- Markets
- Deals
- Crypto

Editorial focus:

- Capital flows.
- Banks.
- Listings.
- Investment funds.
- Payments.
- Regional market movement.
- Major deals.

### Technology

Scope:

- AI
- Startups
- Dev
- Products
- Policy

Editorial focus:

- AI and compute.
- Startups and funding.
- Platforms.
- Chips and infrastructure.
- Developer tools.
- Product-market shifts.
- Technology regulation.

### Real Estate

Scope:

- Homes
- Offices
- Hotels
- Proptech
- Land

Editorial focus:

- Asian property markets.
- Office demand.
- Hotels and hospitality assets.
- City development.
- Proptech.
- Land and infrastructure.

### Travel & Dining

Scope:

- Trends
- Style
- Destinations
- Retreat
- Dining

Editorial focus:

- Premium travel.
- Destination intelligence.
- Hotels and retreats.
- Dining and restaurant culture.
- Regional spending shifts.

### Lifestyle

Scope:

- Luxury
- Fashion
- Art
- Culture
- Health

Editorial focus:

- Asia's consumer class.
- Luxury and fashion.
- Art and culture.
- Health and wellness.
- High-end lifestyle markets.

### Sustainability

Scope:

- Energy
- Climate
- ESG
- Mobility
- Nature

Editorial focus:

- Green finance.
- Energy transition.
- Climate policy.
- Circular economy.
- Mobility.
- Environmental business.

### Perspectives

Scope:

- Opinion
- Founders
- Analysis
- Interviews
- Essays

Editorial focus:

- Expert views.
- Founder stories.
- Long-form analysis.
- Interviews.
- Essays that explain forces shaping Asia.

---

## 6. Country Coverage

Country pages and country routes are part of the core product, not a later add-on.

Countries in scope:

- Singapore
- Vietnam
- Indonesia
- Malaysia
- Philippines
- Thailand
- China
- Japan
- South Korea
- Taiwan
- Hong Kong
- India
- Bangladesh
- Sri Lanka
- Pakistan

Each country should be able to show:

- Country description.
- Lead story.
- Supporting stories.
- Relevant vertical labels.
- Country-specific business, finance, policy, trade, technology, real estate,
  energy, or market context.

Country coverage should connect to the Asia mega-navigation and Across Asia
story modules.

---

## 7. Homepage Business Scope

The homepage is the editorial front page.

Required business modules:

- Brand/header/navigation.
- Breaking or live ticker.
- Lead story.
- Supporting headline stack.
- Vertical coverage blocks.
- Across Asia module.
- Markets snapshot.
- Newsletter subscription call-to-action.
- Podcast/audio promotion.
- Sponsored or commercial modules only when clearly labelled.
- Footer with trust, contact, RSS, and publication links.

The first viewport must communicate that BriefAsia is a news publication. It
must not behave like a marketing landing page.

---

## 8. Article Business Scope

Article pages are the main unit of value.

Every article should support:

- Vertical or country label.
- Headline.
- Standfirst/deck.
- Byline.
- Author role or desk when available.
- Publish date.
- Updated time when applicable.
- Estimated read time.
- Hero image or editorial visual.
- Body.
- Share actions.
- Save action.
- Offline/download action when accounts are enabled.
- Audio/listen action when available.
- Tags.
- Related stories.
- Most-read or rail stories when appropriate.
- Source or provenance information when the story came through the content
  engine.
- Corrections relationship when applicable.

Editorial rules:

- Articles should be written in BriefAsia's own voice.
- Source copy must not be republished verbatim.
- Source attribution must be clear.
- Translated or software-assisted material must be labelled and reviewed.
- If an article is sponsored or affiliate-supported, that must be visibly
  disclosed.

---

## 9. Markets Business Scope

Markets is a core BriefAsia product lane.

It should show:

- Country or index cards.
- Market name.
- Latest value.
- Movement up/down.
- Short explanation.
- Updated time.
- Regional breadth across Asia.

Market movement rules:

- Positive movement should be visually distinct.
- Negative movement should be visually distinct.
- Numbers should be easy to scan and compare.
- Markets content should be editorially contextualized, not just numbers.

Prototype market examples include:

- Singapore / STI
- Japan / Nikkei 225
- Hong Kong / Hang Seng
- Indonesia / JCI
- South Korea / KOSPI
- Vietnam / VN-Index
- Taiwan / TAIEX
- Thailand / SET
- Malaysia / KLCI
- India / Sensex

---

## 10. Newsletters

Newsletters are a key retention product.

Newsletter products:

1. Morning Brief
   - Cadence: weekdays, 7AM SGT.
   - Positioning: flagship 5-minute read for Asia decision-makers.

2. Finance Weekly
   - Cadence: Fridays.
   - Scope: banking, capital markets, fintech, and consequential regional deals.

3. Tech Weekly
   - Cadence: Thursdays.
   - Scope: AI, startups, platforms, infrastructure, and funding signals.

4. Travel & Lifestyle Weekly
   - Cadence: Saturdays.
   - Scope: hotels, tables, destinations, luxury, and spending shifts.

5. ESG Monthly
   - Cadence: first of the month.
   - Scope: green finance, energy transition, and circular economy.

Signup behavior:

- Readers can select one or multiple newsletters.
- The UI should show selected count.
- The submit label should reflect how many newsletters are selected.
- Success and error states must be clear.
- Newsletter pages must make cadence and value proposition explicit.

---

## 11. Audio and Podcasts

Audio is part of the publication experience.

Podcast products:

- The Morning Brief
- Capital Flows
- The Asia Tech Show
- Founders of the Region

Podcast page should support:

- Featured episode.
- Show name.
- Episode number.
- Title.
- Description/deck.
- Duration.
- Date.
- Host.
- Episode list.
- Listening platforms.

Platforms:

- Apple Podcasts
- Spotify
- Amazon Music
- Pocket Casts
- RSS

Article audio:

- Article pages may include a listen/pause action.
- Audio should support long-form reading, not replace article text.

---

## 12. Account and Reader Library

Registered readers should have a personal area.

Account sections:

- Saved
- History
- Offline
- Following
- Settings

Account should show:

- Greeting.
- Email.
- Plan or membership state.
- Member since.
- Counts for saved/history/offline/following.

Reader actions:

- Save article.
- Remove saved article.
- Read saved article.
- Download for offline.
- Remove offline copy.
- Clear history.
- Follow/unfollow topics.

Followable topics should include the main verticals and relevant lifestyle/travel
interests:

- Finance
- Technology
- Real Estate
- Sustainability
- Asia
- Perspectives
- Travel & Dining
- Lifestyle

---

## 13. Search and Discovery

Search is a reader utility, not a decorative overlay.

Search should help readers discover:

- Articles.
- Verticals.
- Countries.
- Topics.
- Authors when available.
- Newsletters or podcasts when relevant.

Search behavior should prioritize:

- Current published stories.
- Clear titles and decks.
- Vertical/country filters.
- Useful empty state.
- Fast path back into article or hub pages.

---

## 14. RSS and Feeds

RSS is a first-class distribution surface.

Feeds in scope:

- All stories: `https://briefasia.com/feed.xml`
- Finance: `https://briefasia.com/finance/feed.xml`
- Technology: `https://briefasia.com/technology/feed.xml`
- Real Estate: `https://briefasia.com/real-estate/feed.xml`
- Sustainability: `https://briefasia.com/sustainability/feed.xml`
- Perspectives: `https://briefasia.com/perspectives/feed.xml`

RSS page should:

- Explain the value of feeds.
- Show feed URLs.
- Let readers copy feed URLs.
- Mention common feed readers such as Feedly, Inoreader, NetNewsWire, Reeder,
  and The Old Reader.

---

## 15. Trust Pages

Trust is part of the product.

Required trust pages:

- About
- Editorial Standards
- Corrections
- Sponsored & Affiliate Policy
- Contact

### About

Should explain:

- What BriefAsia covers.
- Who it serves.
- The newsroom's editorial principles.
- Leadership and newsroom structure.
- Bureaus or coverage bases.
- Markets covered.

Core principles:

- Reported, not republished.
- Sources on the record.
- Corrections in the open.
- Translation flagged.

### Editorial Standards

Must cover:

- How BriefAsia reports.
- Independence.
- Anonymous sources.
- Verification.
- AI and translation.
- Conflicts of interest.
- Corrections.

### Corrections

Must provide a public correction log.

Each correction should show:

- Date.
- Article.
- Original issue.
- Corrected version.
- Responsible editor or editorial desk.

Corrections must be visible and specific. Never silently fix important errors
without record.

### Sponsored & Affiliate Policy

Must explain:

- Newsroom/commercial separation.
- How sponsored content is labelled.
- How affiliate links work.
- How recommendations are chosen.
- How affiliate revenue and reader data are handled.
- How readers can complain or ask questions.

Sponsored content must be excluded from rankings, most-read lists, and editorial
recommendations unless explicitly labelled and contextually appropriate.

---

## 16. Contact and Communication

Contact channels:

1. General enquiries
   - Address questions about BriefAsia, subscriptions, account help, and general
     requests.

2. Partnerships & advertising
   - Address sponsorships, branded content, events, syndication, and commercial
     collaboration.

3. Press & media
   - Address interviews, media kit requests, speaking engagements, and reuse of
     BriefAsia reporting.

4. Tips, editorial & corrections
   - Address story tips, editorial feedback, and corrections.
   - An editor should review messages from this channel.

Business email pattern:

- `info@briefasia.com`
- `partnership@briefasia.com`
- `media@briefasia.com`
- `editor@briefasia.com`

Parent/group contact examples in prototype:

- `editor@asiapresscentre.com`
- `partnership@asiapresscentre.com`
- `media@asiapresscentre.com`
- `info@asiapresscentre.com`

Do not add more contact channels unless they map to a clear business owner.

---

## 17. Commercial Products

BriefAsia has commercial surfaces, but they must not compromise editorial trust.

Audience claims in prototype:

- 1M+ monthly readers.
- 68% director-level and above.
- 42% C-suite and founders.
- 12 markets across Asia.

Commercial products:

- Newsletter sponsorship.
- Display and takeovers.
- Branded content.
- Podcast sponsorship.

Audience positioning:

- Seniority: director-level and above.
- Function: investing, strategy, founding, operating.
- Sectors: finance, technology, real estate, energy.
- Geography: Singapore, Japan, India, Vietnam, and beyond.

Commercial reasons to advertise:

- Trusted environment.
- Decision-makers, not just eyeballs.
- Whole-region reach through one editorial voice.

Rules:

- Sponsors must not see or shape newsroom coverage before publication.
- Reporters and editors must not sell commercial packages.
- Sponsored work must be clearly labelled.
- Branded content belongs to a commercial studio or equivalent commercial
  production workflow, not the newsroom.
- Sponsored and affiliate content must not be disguised as independent
  journalism.

---

## 18. Content Engine and Editorial Review

The content engine is allowed to support BriefAsia with drafts and source
processing, but the publication must behave like a newsroom.

Business expectations:

- BriefAsia has its own relevance criteria, voice, taxonomy, and byline pool.
- The engine should not reuse DTW editorial voice.
- The engine should prioritize BriefAsia topics: Asia, finance, technology,
  real estate, travel, lifestyle, sustainability, and perspectives.
- Drafts should arrive with source context.
- Drafts should be clearly identified as engine-originated inside the editorial
  workflow.
- Editors can edit any field before publication.
- Editors can reject or schedule stories.
- If a human edits a story, automation must not overwrite the human decision.
- Published articles should appear in all relevant reader surfaces.

Allowed automation support:

- Candidate discovery.
- Relevance filtering.
- Drafting.
- Translation assistance.
- Tag suggestions.
- Summary/deck suggestions.
- Newsletter candidate suggestions.

Human-owned decisions:

- Final headline.
- Final deck.
- Final body.
- Story framing.
- Source confidence.
- Legal/editorial risk.
- Sponsored/affiliate labels.
- Publish timing.
- Corrections.
- Retractions.

---

## 19. Content Taxonomy and Metadata

Every story should be assignable to:

- One primary vertical.
- Optional subsection.
- Optional country or region.
- Tags.
- Author/byline.
- Source/provenance information when applicable.
- Published date.
- Updated date when applicable.
- Read time.
- Sponsored/affiliate/translation labels when applicable.

Taxonomy should support homepage modules, vertical hubs, country pages, related
stories, newsletters, feeds, account follows, and search.

---

## 20. Editorial Labels and Disclosures

Labels must be reader-visible where relevant.

Required label types:

- Sponsored.
- Paid Partnership.
- Affiliate link.
- Translation assisted.
- Source/provenance.
- Correction.
- Updated.
- Opinion or Perspective.
- Podcast/audio.

Rules:

- Sponsored and paid partnership labels must name the sponsor.
- Affiliate links must disclose potential commission.
- Translation assistance must be reviewed by an editor and labelled.
- Corrections must link back to correction records where appropriate.
- Opinion/perspectives should not be confused with straight news.

---

## 21. Homepage-to-Article Flow

Business flow:

1. Reader lands on homepage.
2. Reader sees breaking/regional priority stories.
3. Reader can open article, vertical, market, country, newsletter, podcast, or
   trust pages.
4. Reader can save/share/download an article.
5. Reader can sign in or create an account when the value is clear.
6. Reader can subscribe to newsletters.
7. Reader can follow topics.
8. Reader can return through account library, newsletter, search, RSS, or
   related stories.

This flow should make the publication feel alive and habit-forming.

---

## 22. International and Language Business Rules

BriefAsia is Asia-wide and multilingual in posture.

Language options shown in the prototype:

- English
- Vietnamese
- Thai
- Bahasa Indonesia
- Japanese
- Korean
- Traditional Chinese
- Simplified Chinese

Business rules:

- The user interface may support multiple languages.
- Source-language reporting should be treated as canonical.
- Translation assistance must be labelled and reviewed.
- The site should not pretend translated articles were originally reported in
  English if they were not.
- Language choices should support regional readership, not merely decoration.

---

## 23. Out of Scope Unless Approved

Do not add these without user approval:

- Paid subscription or hard paywall.
- New publication brands.
- Awards program.
- Events business.
- Job board.
- E-commerce store.
- Investment advice product.
- User-generated comments.
- Social network/community features.
- AI chatbot as a reader-facing editorial product.
- New verticals outside the taxonomy in this file.

---

## 24. Acceptance Checklist

A BriefAsia feature is business-complete only when:

1. It maps to a named reader, editorial, or commercial need.
2. It uses the BriefAsia vertical/country/topic taxonomy correctly.
3. It preserves newsroom-commercial separation.
4. It supports the content-engine-to-editorial-review-to-publish operating
   model where relevant.
5. It does not invent unsupported newsroom facts.
6. It keeps trust, corrections, source, translation, sponsored, and affiliate
   rules intact.
7. It works as part of the reader journey: discover, read, save/share/follow,
   subscribe, return.
8. It stays consistent with `DESIGN.md`.

