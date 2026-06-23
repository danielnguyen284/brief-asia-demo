# BriefAsia Design System

Last updated: 2026-06-24

This file is the design source of truth for BriefAsia. Every page, component,
feature, CMS surface, intake-rendered article, and future redesign pass must
follow this document unless the user explicitly approves a design-system change.

Primary visual reference: `public/design-prototype.html`.

Content/prototype reference: `BriefAsia (full site).html`.

The old `design/project/` Claude Design handoff bundle was removed because it
contained DTW colors, DTW logo files, DTW upload PDFs, and stale instructions
from the previous site. Do not recreate or use that bundle as a BriefAsia
design reference.

If implementation code conflicts with this file or the prototype, pause and
reconcile the design decision before shipping UI.

---

## 1. Product Feel

BriefAsia is an executive Asia news and intelligence publication. The interface
must feel:

- Editorial, not SaaS.
- Premium, not decorative.
- Dense but calm.
- Asia-wide, business-literate, and newsroom-led.
- Built for readers who scan markets, politics, finance, technology, property,
  travel, lifestyle, sustainability, and opinion quickly.

The visual language is a warm paper newsroom with deep purple-navy structure and
wine-red editorial emphasis. Avoid playful startup UI, neon gradients, oversized
marketing hero sections, rounded blob decoration, and generic AI dashboard
styling.

---

## 2. Non-Negotiable Design Rules

1. Always use BriefAsia tokens for color, type, spacing, borders, and hover
   states.
2. Do not introduce a new visual style for a page or feature when an existing
   BriefAsia pattern can be extended.
3. Prefer editorial density: headlines, decks, bylines, timestamps, labels,
   section rails, and article cards.
4. Use real editorial imagery or faithful editorial placeholders. No abstract
   gradient art, decorative blobs, cartoon mascots, or generic tech wallpaper.
5. Cards are restrained. Border radius stays small, borders are hairline, and
   shadows are sparse.
6. Every interactive element must visibly react on hover/focus.
7. Headlines and section titles use the editorial serif voice. UI controls,
   labels, nav, buttons, metadata, and forms use the sans UI voice.
8. The accent color is used with discipline. It marks active states, hover
   emphasis, labels, CTAs, positive brand recall, and selected controls.
9. Never bury the BriefAsia brand. Header, logo, nav, and editorial hierarchy
   must remain immediately recognizable.
10. Before building any new page, identify the nearest existing BriefAsia page
    pattern and extend it.

---

## 3. Design Tokens

Use these exact tokens. Source of truth: the `:root` block embedded in
`public/design-prototype.html`.

```css
:root {
  --paper: #FCFBF8;
  --paper-2: #F4EEF0;
  --ph: #ece5e9;
  --ink: #241a33;
  --ink-soft: #4a4150;
  --muted: #6e6571;
  --faint: #9a958c;
  --line: #ece9e2;
  --line-strong: #ddd5cf;
  --accent: #A60F2D;
  --navy: #2E2147;
  --up: #1f8a5b;
  --down: #A60F2D;
}
```

### Color Usage

- `--paper`: global page background.
- `--paper-2`: soft tinted secondary surface, newsletter panels, and warm inset areas.
- `--ph`: pale placeholder/image field.
- `--ink`: primary body text and deep editorial copy.
- `--ink-soft`: secondary headings, support copy, and softer dark controls.
- `--muted`: bylines, metadata, helper text.
- `--faint`: lowest-emphasis timestamps and faint labels.
- `--line`: default hairline dividers.
- `--line-strong`: control outlines and emphasized borders.
- `--accent`: BriefAsia wine red, used for CTAs, active states, kickers,
  vertical tags, selected controls, hover emphasis, and the wordmark accent.
- `--navy`: BriefAsia deep purple-navy, used for the logo base, dark bands,
  masthead structure, nav rules, footer rules, and inactive nav text.
- `--up`: green for positive market changes.
- `--down`: same wine red as `--accent`, used for negative market changes and live dots.

Additional permitted derived colors:

- White text on dark navy: `#fff` / `#ffffff`.
- Common prototype neutrals: `#a8a39b`, `#b9b1c9`, `#e3ddd6`,
  `#d8cdd3`, `#ecd3d9`, `#f0a9b5`.
- Soft accent tint: `color-mix(in oklab, var(--accent) 8%, transparent)` for flash highlights.

Do not add unrelated palettes. New verticals should use taxonomy labels,
hierarchy, and imagery, not new dominant color systems. Do not use the old DTW
colors `#D4623C`, `#1B2A52`, `#FDFCF8`, or the DTW pillar palette for
BriefAsia UI.

---

## 4. Typography

### Families

The prototype embeds these typefaces directly in `public/design-prototype.html`:

- Editorial serif (CSS `--font-serif`): `Newsreader` for headlines, decks,
  ticker text, editorial cards, article titles, quotes, and section hierarchy.
- UI sans (CSS `--font-sans`): `IBM Plex Sans` for navigation, buttons, labels,
  metadata, form fields, chips, account controls, and most interface text.
- Numeric mono (CSS `--font-mono`): `IBM Plex Mono` for market numbers,
  timestamps, compact stats, ticker feed times, technical strings, and tabular
  account/status data.
- Local-language/UI support: `Be Vietnam Pro` is embedded in the prototype and
  may be used for language-sensitive UI or text that benefits from Vietnamese
  coverage.
- Heavy display accent: `Archivo Black` is embedded in the prototype for
  occasional compact display accents only. Do not use it for article headlines.
- Splash/thumbnail only: the loader thumbnail uses `Georgia, serif` for the
  large `BA` monogram and `Arial, sans-serif` for `BRIEFASIA`. Do not carry
  those loader fallback fonts into normal page typography.

### Usage Rules

- Apply `className="serif"` (or `font-family: var(--font-serif)`) for every
  headline, hero title, deck, section title, article card headline.
- Apply `className="mono"` for market data, timestamps, wire drop times, live
  counts, keyboard hints, and tabular numbers.
- Use `font-variant-numeric: tabular-nums` (class `tnum`) on any columnar numbers.
- Never use default browser fonts or introduce additional typefaces without approval.
- Do not use `Schibsted Grotesk`; that belonged to the old DTW-derived design
  bundle, not the BriefAsia prototype.

### Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero lead headline | 44px | 650 | `letterSpacing: -0.025em, lineHeight: 1.05` |
| Deep dive headline | 36px | 650 | `letterSpacing: -0.025em, lineHeight: 1.1` |
| SectionHeader title | 28px | 650 | `letterSpacing: -0.02em` |
| ProPage H1 | 60px | 650 | `letterSpacing: -0.03em` |
| Aside card headline | 18px | 600 | `letterSpacing: -0.01em, lineHeight: 1.25` |
| Vertical card headline (lead) | 17px | 600 | `lineHeight: 1.3` |
| Vertical card headline (rest) | 15px | 600 | `lineHeight: 1.3` |
| BriefBand title | 14.5px | 600 | `lineHeight: 1.35` |
| Body deck | 18px | 400 | `lineHeight: 1.45` |
| Kicker / category label | 11px | 600 | uppercase, `letterSpacing: 0.14em` |
| Metadata / byline | 11-13px | 400 | `var(--muted)` |
| Mono timestamps | 11-12px | 500 | `var(--font-mono)` |

Do not use viewport-width-only font scaling. Use `clamp()` with sensible min
and max values when needed.

---

## 5. Layout System

### Global

- Background: `--paper`.
- Main content max width: `1280px`.
- Article/narrow text max widths: about `680px` to `720px`.
- Smaller panels/cards: common widths include `300px`, `420px`, `460px`,
  `560px`, and `700px`.
- Page gutters should feel editorial and roomy: about 22-32px on desktop, tighter
  but still breathable on mobile.

### Structure

The site is built from editorial bands, not floating marketing sections.

Use:

- Full-width top ticker or promo bands.
- Constrained inner content.
- Thin dividers.
- Editorial grids.
- Article cards.
- Rail layouts.
- Dense section headers.

Avoid:

- Nested cards inside cards.
- Large rounded dashboard tiles as the default layout.
- One-page landing style where every section is a large hero.
- Decorative background ornaments.

### Borders, Radius, Shadows

- Default border: `1px solid var(--line)`.
- Strong border: `1px solid var(--line-strong)`.
- Dropdown top accent: `2.5px solid var(--accent)`.
- Radius: small, usually 3-8px. Keep it crisp.
- Shadows are reserved for dropdowns, hover cards, and elevated overlays.

Example dropdown shadow:

```css
box-shadow: 0 26px 52px -14px rgba(46,33,71,.30);
```

Example hover card shadow:

```css
box-shadow: 0 18px 36px -20px rgba(46,33,71,.45);
```

---

## 6. Navigation Architecture

### Primary Nav

Primary verticals, in order:

1. Asia
2. Finance
3. Technology
4. Real Estate
5. Travel & Dining
6. Lifestyle
7. Sustainability
8. Perspectives

The nav is not a generic category list. Treat it as the editorial spine of the
publication.

### Subnav

```text
Asia: Across Asia, Markets, Trending, Politics, Business, Trade, Environment
Finance: Banking, Fintech, Markets, Deals, Crypto
Technology: AI, Startups, Dev, Products, Policy
Real Estate: Homes, Offices, Hotels, Proptech, Land
Travel & Dining: Trends, Style, Destinations, Retreat, Dining
Lifestyle: Luxury, Fashion, Art, Culture, Health
Sustainability: Energy, Climate, ESG, Mobility, Nature
Perspectives: Opinion, Founders, Analysis, Interviews, Essays
```

### Asia Mega Menu

Asia gets a mega menu, not a plain dropdown. It contains:

- Topics: the Asia subnav above.
- Southeast Asia: Singapore, Vietnam, Indonesia, Malaysia, Philippines,
  Thailand.
- East Asia: China, Japan, South Korea, Taiwan, Hong Kong.
- South Asia: India, Bangladesh, Sri Lanka, Pakistan.

Use thin dividers between mega-menu groups.

### Header Behavior

- Nav link padding: about `14px 13px`.
- Nav items are uppercase or title-case depending on context, but always tight
  and controlled.
- Active vertical: `--accent`, weight 800.
- Inactive vertical: `--navy` / `--ink`, weight 600.
- Hover: nav turns `--accent`.
- Dropdown opens on hover with slight downward motion.

---

## 7. Brand Elements

### Logo

The prototype uses a BA/BriefAsia masthead language:

- Deep navy base: `#2E2147`.
- Wine-red BriefAsia wordmark/accent: `#A60F2D`.
- Cream/paper contrast: `#FCFBF8`.
- Large `BA` monogram is acceptable when a thumbnail, splash, or brand card is
  needed.

Logo hover:

```css
.ba-logo:hover { opacity: .85; }
```

Do not redesign the logo treatment casually. Do not substitute another acronym
style, icon, or mascot.

---

## 8. Core Components

### Article Card

Use class/pattern equivalent to `.ba-card`.

Behavior:

```css
.ba-card {
  transition: transform .28s cubic-bezier(.2,.7,.2,1);
}
.ba-card:hover {
  transform: translateY(-3px);
}
.ba-card-img {
  transition: transform .5s cubic-bezier(.2,.7,.2,1);
}
.ba-card:hover .ba-card-img {
  transform: scale(1.04);
}
```

Card titles:

- Default color: `--navy`.
- Hover color: `--accent`.
- Keep headlines serif unless the card is a compact utility/control card.

### Underline Link

Use animated underline for editorial text links.

```css
.ba-uline {
  background-image: linear-gradient(var(--accent), var(--accent));
  background-size: 0% 1.5px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size .25s ease;
}
.ba-uline:hover {
  background-size: 100% 1.5px;
}
```

### Button

Use `.ba-btn` / `.ba-pill` patterns.

Rules:

- Hover lifts by `-1px`.
- Border turns accent.
- Shadow is small and red-tinted.
- Active state returns to neutral position.
- Primary CTA may use accent fill.
- Secondary CTA should be outline or paper/white with accent hover.

```css
.ba-btn:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
  box-shadow: 0 5px 14px -7px rgba(166,15,45,.45);
}
```

### Chip

Chips are small, clickable editorial filters or topic pills.

```css
.ba-chip:hover {
  background: #A60F2D;
  color: #fff !important;
  border-color: #A60F2D;
  transform: translateY(-2px);
}
```

### Search Field

Search controls use a visible border and subtle red focus/hover ring.

```css
.ba-search:hover {
  border-color: #A60F2D !important;
  box-shadow: 0 0 0 3px rgba(166,15,45,.07);
}
```

### Dropdown

Dropdowns are crisp, white, editorial, and bordered.

```css
.ba-dropdown {
  top: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(7px);
  transition: opacity .18s ease, transform .18s ease;
  z-index: 140;
}
.ba-dropdown-inner {
  background: #fff;
  border: 1px solid #d6ccd3;
  border-top: 2.5px solid #A60F2D;
  border-radius: 3px;
  box-shadow: 0 26px 52px -14px rgba(46,33,71,.30);
}
```

### Breaking Ticker

The ticker is part of the brand rhythm.

- Dark navy band.
- White editorial text.
- `Newsreader` headline typography.
- Continuous horizontal marquee.
- Pauses on hover.
- Underline on item hover.

```css
@keyframes ba-ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ba-ticker-track {
  display: inline-flex;
  gap: 26px;
  animation: ba-ticker 38s linear infinite;
}
.ba-ticker-mask:hover .ba-ticker-track {
  animation-play-state: paused;
}
```

### Language Menu

Supported UI language entries in prototype:

- English `EN`
- Tiếng Việt `VI`
- Thai `TH`
- Bahasa Indonesia `ID`
- Japanese `JA`
- Korean `KO`
- Traditional Chinese `繁`
- Simplified Chinese `简`

Active language uses accent and weight 800. Inactive languages use navy/ink and
weight 600. Language rows use a soft paper hover.

### Share Actions

Article share actions include:

- Copy link
- LinkedIn
- Facebook
- Email

Copy state must visibly change to "Link copied" and use accent styling.

### Account Tabs

Account tabs:

- Saved
- History
- Offline
- Following
- Settings

Active tab: accent color, accent border, weight 800. Inactive tab: muted color,
transparent border, weight 600.

---

## 9. Page Patterns

### Home

Home must feel like a full newspaper front page for Asia business intelligence.
It should combine:

- Breaking ticker.
- Lead story.
- Supporting story grid.
- Vertical coverage modules.
- Markets/Across Asia modules.
- Newsletter or subscription CTA.
- Podcast/audio entry points where relevant.
- Sponsored/advertising surfaces only when clearly labelled.

Do not replace the homepage with a marketing landing page.

### Vertical Hub

Use for all verticals and country pages.

Required pieces:

- Vertical name.
- Editorial description from `VMETA` or country metadata.
- Subnav where relevant.
- Lead story with image.
- Side list of top stories.
- Grid of additional stories.
- Byline/time metadata.
- Kicker labels in accent or muted uppercase.

Special cases:

- `Asia / Across Asia` uses regional roundup behavior.
- `Asia / Markets` uses market coverage behavior.
- `Perspectives` has a more opinion/analysis-led layout.

### Article Page

Article pages must be editorial and reading-focused.

Required pieces:

- Kicker / vertical label.
- Large serif headline.
- Standfirst/deck.
- Author, role, date, update time, read time.
- Hero image or editorial placeholder.
- Share actions.
- Save/offline action when account features exist.
- Audio/listen control where available.
- Body copy in a narrow readable column.
- Pull quote or highlighted takeaways where useful.
- Tags.
- Related stories.
- Most-read or rail content if layout allows.
- Source/transparency box when content-engine provenance is used.

Never place ads inside article body unless they follow the explicit sponsored
policy and are visually separated.

### Markets

Markets UI must stay dense and numeric.

Use:

- Country/index cards.
- Positive `--up`, negative `--down`.
- Monospace or tabular numeric treatment.
- Updated timestamp.
- Region/country grouping.
- Brief explanatory headline per market.

### Newsletter

Newsletter surfaces should emphasize selectable products:

- Morning Brief as flagship.
- Finance Weekly.
- Technology, Real Estate, Sustainability, and other vertical newsletters.
- Count of selected newsletters.
- Submit label changes based on selected count.
- Success and error states are visible.

### Podcast

Podcast pages use editorial audio hierarchy:

- Featured episode.
- Show label, episode number, title, deck.
- Duration/date/host metadata.
- Episode cards.
- Platform list: Apple Podcasts, Spotify, Amazon Music, Pocket Casts, RSS.

### About / Editorial Standards / Corrections / Sponsored Policy

Trust pages must feel institutional and transparent.

Use:

- Numbered sections.
- Published standards.
- Public correction log.
- Clear distinction between newsroom and commercial work.
- Stats such as founded year, markets covered, correspondents, language posture.

Important content principles from the prototype:

- Founded in Singapore.
- Covers 12 markets.
- Corrections are public, never quiet.
- Translation must be flagged.
- Sponsored and affiliate content must be clearly labelled and excluded from
  editorial recommendation/ranking surfaces.

### Contact

Contact channels:

- General enquiries
- Partnerships & advertising
- Press & media
- Tips, editorial & corrections

Use outline icons, compact cards, and explicit email CTAs.

### Advertise

Commercial pages must still feel like BriefAsia, not a generic media kit.

Observed ad stats:

- 1M+ monthly readers.
- 68% director-level and above.
- 42% C-suite and founders.
- 12 markets across Asia.

Ad products:

- Newsletter sponsorship.
- Display and takeovers.
- Branded content.
- Podcast sponsorship.

All commercial content must preserve the newsroom/commercial wall.

### RSS

RSS page must expose clear feed URLs:

- All stories: `https://briefasia.com/feed.xml`
- Finance
- Technology
- Real Estate
- Sustainability
- Perspectives

Feed URLs should be copyable and selectable on focus.

### Account

Account surfaces are utility-dense but still editorial:

- Greeting.
- Email.
- Plan.
- Member since.
- Saved stories.
- History.
- Offline articles.
- Followed topics.
- Settings.

Follow chips use accent fill when active.

---

## 10. Imagery

Use real editorial imagery. The prototype imagery themes include:

- Finance
- Payments
- Data centers
- Ports
- Offices
- Energy
- Solar
- Luxury
- Dining
- AI / infrastructure

Rules:

- Images should reveal the subject: market, city, office, port, data center,
  energy infrastructure, hospitality, dining, founder/operator, or regional
  business context.
- Avoid dark blurred stock photos.
- Avoid purely atmospheric images.
- Avoid illustration-first treatment unless the page is explicitly an abstract
  methodology or empty-state surface.
- Maintain aspect ratios so card grids do not jump.
- Image hover may scale subtly to `1.04`.

---

## 11. Content Voice In UI

BriefAsia UI copy is concise, intelligent, and newsroom-clear.

Prefer:

- "What just happened, why it matters, and what to watch next."
- "Every BriefAsia article, the moment it publishes."
- "The latest intelligence from across Asia."
- "A clear wall between newsroom and commercial."

Avoid:

- Hype words like revolutionary, game-changing, ultimate, unlock.
- Marketing filler.
- SaaS onboarding language.
- Overexplaining the UI.
- Cute empty states.

Headlines should feel like serious business journalism: specific actors,
regions, stakes, money, policy, markets, and consequences.

---

## 12. Interaction Rules

Every clickable surface must have a visible interactive state.

Required interaction patterns:

- Cards lift `-3px`.
- Card images scale to `1.04`.
- Card headlines turn accent.
- Buttons lift `-1px`.
- Chips invert to accent fill.
- Search border and ring turn accent.
- Dropdowns fade and slide down.
- Ticker pauses on hover.
- Close icons scale slightly and turn accent.
- Copy states visibly change label and accent treatment.

Use transitions in the `120ms` to `500ms` range. Keep motion subtle.

Respect `prefers-reduced-motion` in production implementations: disable marquee,
large transforms, and nonessential animation while preserving hover color and
focus states.

---

## 13. Accessibility

- Maintain contrast between `--paper` and `--ink`.
- Dark navy surfaces must use white/pale text.
- All icon-only buttons need labels or `aria-label`.
- Dropdowns and language/account menus must be keyboard reachable.
- Search and copyable fields must show focus state.
- Form errors and success states must be textual, not color-only.
- Ticker content must not be the only path to breaking news.
- Tap targets should be at least 40px where practical.

---

## 14. Responsive Behavior

The desktop editorial grid is the design anchor. On mobile:

- Collapse multi-column grids to one column.
- Preserve story hierarchy: lead first, then side/top stories, then grids.
- Keep the top nav usable; horizontal scroll or compact menu is acceptable.
- Do not shrink text until it becomes unreadable.
- Maintain image aspect ratios.
- Keep metadata concise; wrap instead of clipping.
- Dropdown/mega-menu content must become a tappable panel or stacked menu.

---

## 15. Implementation Checklist

Before creating or editing any BriefAsia page or feature:

1. Read this file.
2. Open `public/design-prototype.html` and identify the closest existing page
   or component pattern. Use `BriefAsia (full site).html` for content parity
   only when needed.
3. Reuse the token palette exactly.
4. Reuse `Newsreader` via `--font-serif` for editorial hierarchy and
   `IBM Plex Sans` via `--font-sans` for UI.
5. Check that navigation taxonomy still matches this document.
6. Add all hover/focus/active states.
7. Verify mobile layout does not overlap, clip, or lose hierarchy.
8. Verify imagery is editorial and subject-revealing.
9. Verify sponsored/affiliate/trust surfaces are labelled.
10. If a proposed design needs new tokens or new patterns, get explicit user
    approval and update this file in the same change.

---

## 16. Do Not Do

- Do not make BriefAsia look like DTW.
- Do not introduce purple-blue SaaS gradients.
- Do not use beige/brown as the dominant palette beyond the warm paper system.
- Do not use rounded pill-heavy UI everywhere.
- Do not use decorative blobs, orb backgrounds, or bokeh.
- Do not hide navigation behind a marketing hero.
- Do not make a page that lacks visible editorial content in the first viewport.
- Do not put UI cards inside other cards.
- Do not create fake publications, fake parent-company facts, or unsupported
  newsroom claims unless provided by the user.
- Do not silently change the brand colors, typography, or navigation taxonomy.

---

## 17. Component Rules (from BriefAsia Prototype Source)

These rules are normalized from `public/design-prototype.html` and are
mandatory. Do not backfill values from old DTW handoff files.

### Header — Utility Strip (top row)

```
Height:     32px
Background: #fff with 1px var(--line) border-bottom
Font:       mono 11px, var(--muted)
Left:       date string (fmtFullDate) + live-dot + "N wire drops in the last hour"
Right:      "Editorial Standards" · "AI Disclosure" · language select (EN/VI/ID)
```

### Header — Main Bar

```
Background: var(--paper), sticky, transition border-bottom on scroll
Logo:       Wordmark SVG (navy box + "briefasia" IBM Plex Sans 700 + pulse-dot signature)
Tagline:    "Asia intelligence, briefed daily" — mono 11px, letterSpacing .08em, var(--muted)
Search:     flex button, #fff bg, 1px var(--line) border, borderRadius 6,
            var(--muted) 13px text, ⌘K hint in mono 10px
Right:      Subscribe button (accent fill, 12px 600) + dark-mode toggle (38×38px, var(--line) border)
            + Login button or user avatar menu
Padding:    14px 24px
```

### Header — Vertical Nav Row

```
Height:          46px
Border:          borderTop 1px var(--line) + borderBottom 3px solid var(--navy)
Vertical links:  fontSize 14px, fontWeight 500, padding 0 18px
Active vertical: borderBottom 3px solid var(--accent), marginBottom -3px
                 (overlaps the row rule so only the color changes at the bottom)
Right nav items: fontSize 12px, uppercase, letterSpacing .08em, var(--muted)
                 separated by borderLeft 1px var(--line), padding 0 19px
```

### SectionHeader

```jsx
// Exact implementation:
<div style={{
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  marginBottom: 18,
  paddingBottom: 10,
  borderBottom: "2px solid var(--navy)",
}}>
  {kicker && <div className="kicker" style={{ marginBottom: 4 }}>{kicker}</div>}
  <h2 className="serif" style={{ margin: 0, fontSize: 28, fontWeight: 650, letterSpacing: "-0.02em" }}>
    {title}
  </h2>
  {right}
</div>
```

### Kicker label

```css
.kicker {
  font: 600 11px/1 var(--font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);   /* wine red #A60F2D */
}
```

### Shadow system

Use a restrained shadow only for dropdowns, elevated overlays, and lifted cards:
```css
box-shadow: 0 26px 52px -14px rgba(46,33,71,.30);
```

Keep shadows sparse. Do not create heavy SaaS-style elevation.

### BriefBand floating dividers

Dividers between BriefBand cells must be `position: absolute` with a fractional
`top`/`bottom` (22%) so they don’t extend to the card edges:

```jsx
<div style={{
  position: "absolute", right: 0,
  top: "22%", bottom: "22%",
  width: 1, background: "var(--line)",
}} />
```

### AwardsBanner accent stripe

A 4px accent stripe on the left edge:
```jsx
<div style={{
  position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
  background: "var(--accent)",
}} />
```

### Footer

```
Top border:        3px solid var(--navy)
Newsletter strip:  2-column grid (1fr 1fr), 1px var(--line) border-bottom
Column grid:       1.4fr 1fr 1fr 1fr 1fr, gap 32px
Trust band:        var(--paper) background, 1px var(--line) border-top,
                   mono 11px text-mute, copyright + compliance on same row
```

### Live-dot animation

```css
.live-dot {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--down);   /* always uses the red token */
  animation: pulseDot 1.6s ease-in-out infinite;
  display: inline-block;
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(166,15,45,.6); }
  50%       { opacity: .55; box-shadow: 0 0 0 6px rgba(166,15,45,0); }
}
```

### Wire Drops flash highlight

New wire drops must briefly flash an accent-tinted background:
```jsx
background: flash === d.id
  ? "color-mix(in oklab, var(--accent) 8%, transparent)"
  : "transparent",
transition: "background 1.5s ease"
```

### Card hover

```css
.card-hover { transition: transform .25s ease, box-shadow .25s ease; }
.card-hover:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
```

### Button variants

| Variant | Background | Color | Border |
|---|---|---|---|
| `primary` | `var(--navy)` | `var(--paper)` | `var(--navy)` |
| `accent` | `var(--accent)` | `#fff` | `var(--accent)` |
| `outline` | `transparent` | `var(--ink)` | `var(--line-strong)` |
| `ghost` | `transparent` | `var(--ink)` | none |

Sizes: `sm` = 12px/6-10px pad/r4, `md` = 13px/9-14px pad/r5, `lg` = 14px/12-18px pad/r6.
