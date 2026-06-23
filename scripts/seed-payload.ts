/**
 * Seed Payload with the static-site fixtures: 6 pillars, 6 authors, ~8 tags,
 * 9 articles, 4 wire drops. Idempotent: re-runs upsert by slug/name.
 *
 * Run with: `pnpm --filter web db:seed`
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Load .env.local manually so this script doesn't need dotenv-cli installed
// at apps/web. The Payload config validates DATABASE_URL + PAYLOAD_SECRET
// immediately on import, so env has to be set before we import it.
const here = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(here, "../.env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (!m) continue;
  const key = m[1]!;
  let value = m[2]!.trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  if (process.env[key] == null) process.env[key] = value;
}

const { getPayload } = await import("payload");
const config = (await import("../payload.config")).default;

// ──────────────────────────────────────────────────────────────────────────────
// Fixtures (inline so the seed script doesn't drag reader-app deps)
// ──────────────────────────────────────────────────────────────────────────────

const PILLARS: ReadonlyArray<{
  slug: string;
  titleEn: string;
  titleVi: string;
  titleId: string;
  heading: string;
  color: string;
  icon: string;
  order: number;
  description: string;
}> = [
  { slug: "asia", titleEn: "Asia", titleVi: "Châu Á", titleId: "Asia", heading: "Asia", color: "var(--asia)", icon: "asia", order: 1, description: "Regional front page for markets, policy, trade, companies, infrastructure, and environment across Asia." },
  { slug: "finance", titleEn: "Finance", titleVi: "Tài chính", titleId: "Keuangan", heading: "Finance", color: "var(--finance)", icon: "dollar", order: 2, description: "Banking, fintech, markets, listings, funds, payments, crypto, and consequential regional deals." },
  { slug: "technology", titleEn: "Technology", titleVi: "Công nghệ", titleId: "Teknologi", heading: "Technology", color: "var(--technology)", icon: "spark", order: 3, description: "AI, startups, platforms, chips, developer tools, product-market shifts, and technology regulation." },
  { slug: "real-estate", titleEn: "Real Estate", titleVi: "Bất động sản", titleId: "Properti", heading: "Real Estate", color: "var(--real-estate)", icon: "product", order: 4, description: "Homes, offices, hotels, proptech, land, city development, and infrastructure across Asian property markets." },
  { slug: "travel-dining", titleEn: "Travel & Dining", titleVi: "Du lịch & Ẩm thực", titleId: "Travel & Dining", heading: "Travel & Dining", color: "var(--travel-dining)", icon: "globe", order: 5, description: "Premium travel, destination intelligence, hotels, retreats, restaurants, and regional spending shifts." },
  { slug: "lifestyle", titleEn: "Lifestyle", titleVi: "Phong cách sống", titleId: "Gaya Hidup", heading: "Lifestyle", color: "var(--lifestyle)", icon: "star", order: 6, description: "Luxury, fashion, art, culture, health, wellness, and Asia's changing consumer class." },
  { slug: "sustainability", titleEn: "Sustainability", titleVi: "Bền vững", titleId: "Keberlanjutan", heading: "Sustainability", color: "var(--sustainability)", icon: "trend-up", order: 7, description: "Green finance, energy transition, climate policy, mobility, nature, and circular economy." },
  { slug: "perspectives", titleEn: "Perspectives", titleVi: "Góc nhìn", titleId: "Perspektif", heading: "Perspectives", color: "var(--perspectives)", icon: "feather", order: 8, description: "Opinion, founder stories, analysis, interviews, and essays explaining the forces shaping Asia." },
];

const AUTHORS: ReadonlyArray<{ name: string; role: string; city: string }> = [
  { name: "Mei Lin", role: "Asia Bureau Chief", city: "Singapore" },
  { name: "Ravi Kim", role: "AI Correspondent", city: "Seoul" },
  { name: "Thao Nguyen", role: "Senior Reporter", city: "Hanoi" },
  { name: "Jordan Chen", role: "Markets Editor", city: "Hong Kong" },
  { name: "Arif Rahman", role: "Startups Reporter", city: "Jakarta" },
  { name: "Ananya Iyer", role: "Policy Reporter", city: "Bengaluru" },
  // Engine bylines — must match content-engine's BriefAsia byline pool EXACTLY
  // (src/lib/publications/dtw/index.ts BriefAsia_BYLINES). The intake endpoint
  // resolves a published byline to one of these Author rows by name. Roles +
  // cities below are editorial assignments — FLAG FOR REVIEW.
  { name: "Arjun S. Mehta", role: "AI Correspondent", city: "Bengaluru" },
  { name: "Mei-Lin Tan", role: "Asia Tech Correspondent", city: "Singapore" },
  { name: "Daniel R. Whitfield", role: "Markets & Venture Reporter", city: "Hong Kong" },
  { name: "Priya Nair", role: "Startups Reporter", city: "Bengaluru" },
  { name: "Kenji Watanabe", role: "Hardware & Products Reporter", city: "Tokyo" },
  { name: "Sofia M. Reyes", role: "Policy & Trade Reporter", city: "Manila" },
  { name: "Wei Zhang", role: "China Tech Correspondent", city: "Hangzhou" },
  { name: "Hana Park", role: "Semiconductors Reporter", city: "Seoul" },
  { name: "Marcus Halloran", role: "Developer Tools Reporter", city: "Singapore" },
  { name: "Linh T. Pham", role: "Southeast Asia Reporter", city: "Hanoi" },
];

const TAGS: ReadonlyArray<{ slug: string; en: string }> = [
  { slug: "sovereign-ai", en: "Sovereign AI" },
  { slug: "datacenters", en: "Datacenters" },
  { slug: "asean", en: "ASEAN" },
  { slug: "open-weights", en: "Open weights" },
  { slug: "china", en: "China" },
  { slug: "reasoning", en: "Reasoning" },
  { slug: "ipo", en: "IPO" },
  { slug: "vietnam", en: "Vietnam" },
  { slug: "cloud", en: "Cloud" },
];

// ── Minimal Lexical editor-state builder ────────────────────────────────────
// Payload's richText field stores a Lexical SerializedEditorState. The reader
// renders it via @payloadcms/richtext-lexical/react RichText. We build a tiny
// subset (paragraph / h2 / h3 / quote) from plain text so seed articles have
// real body content to render.
type BlockKind = "p" | "h2" | "h3" | "quote";
type Block = readonly [BlockKind, string];

function lexText(text: string) {
  return { type: "text", text, detail: 0, format: 0, mode: "normal", style: "", version: 1 };
}
function lexBody(blocks: ReadonlyArray<Block>) {
  const children = blocks.map(([kind, text]) => {
    const base = { direction: "ltr" as const, format: "" as const, indent: 0, version: 1, children: [lexText(text)] };
    if (kind === "h2" || kind === "h3") return { ...base, type: "heading", tag: kind };
    if (kind === "quote") return { ...base, type: "quote" };
    return { ...base, type: "paragraph", textFormat: 0, textStyle: "" };
  });
  return { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1, children } };
}

interface ArticleFixture {
  slug: string;
  pillarSlug: string;
  authorName: string;
  coAuthorNames?: string[];
  tagSlugs?: string[];
  title: string;
  dek: string;
  section: string;
  readMin: number;
  publishedAt: string;
  aiAssisted?: boolean;
  sponsored?: boolean;
  sponsor?: string;
  affiliate?: boolean;
  deepDive?: boolean;
  imageLabel?: string;
  bodyBlocks?: ReadonlyArray<Block>;
}

const ARTICLES: ReadonlyArray<ArticleFixture> = [
  {
    slug: "sea-ai-cluster-singapore",
    pillarSlug: "technology",
    authorName: "Mei Lin",
    coAuthorNames: ["Ravi Kim"],
    tagSlugs: ["sovereign-ai", "datacenters", "asean"],
    title:
      "Singapore quietly built Southeast Asia's largest sovereign AI cluster – and Jakarta wants in",
    dek:
      "Inside a 220-megawatt build-out that has rewired regional capital flows, ministerial visits, and the careers of a dozen researchers nobody had heard of six months ago.",
    section: "Frontier",
    readMin: 14,
    publishedAt: "2026-05-26T08:12:00+08:00",
    imageLabel: "HERO – rack hall, low blue light",
    bodyBlocks: [
      ["p", "On the edge of Tuas, behind two security fences and a row of palm trees nobody planted, sits a building most Singaporeans will never enter. Inside: 220 megawatts of compute, a private fibre ring to Changi, and the quiet ambition of a city-state to host the largest sovereign AI cluster in Southeast Asia."],
      ["p", "The official story is procurement. The unofficial story — told over three months of conversations with engineers, ministry officials, and one very tired procurement lawyer — is more interesting."],
      ["p", "Tuas-3, as it is internally called, was conceived in late 2024 as a hedge. Singapore's compute exports to the rest of ASEAN had quietly become an instrument of soft power, and the Economic Development Board wanted to keep the option open as workloads grew."],
      ["h3", "The wait-list, in order"],
      ["p", "By the time the second of three halls came online this March, the wait-list for capacity included two ministerial-grade tenants from Jakarta, a Hanoi-based foundation model lab, and three Bangkok unicorns."],
      ["quote", "Tuas-3 sidesteps the moratorium by operating as a regulated industrial customer of a power purchase agreement that nobody else can replicate."],
      ["p", "Whether the model travels is the open question. Singapore's regulatory consistency is part of what makes the financing work; the next reveal is expected in Q3."],
    ],
  },
  {
    slug: "baidu-open-weights",
    pillarSlug: "technology",
    authorName: "Ravi Kim",
    tagSlugs: ["open-weights", "china", "reasoning"],
    title: "Baidu releases open-weights model that beats GPT-class on Chinese-language reasoning",
    dek:
      "ERNIE-X 350B is the first frontier-tier Chinese model with permissive commercial terms – and it's already inside three Vietnamese banks.",
    section: "Models",
    readMin: 8,
    publishedAt: "2026-05-27T07:40:00+07:00",
    bodyBlocks: [
      ["p", "Baidu's ERNIE-X 350B landed on Friday with permissive commercial terms and benchmark scores that, on Chinese-language reasoning, edge past the GPT-class incumbents it was measured against."],
      ["p", "The release matters less for the leaderboard than for the licence. For the first time a frontier-tier Chinese model can be self-hosted and shipped in a commercial product without a bespoke agreement."],
      ["p", "Three Vietnamese banks have already pulled the weights into internal evaluation sandboxes, drawn by data-residency control as much as by cost."],
      ["p", "The open question is durability: open-weights releases have a habit of arriving with fanfare and quietly stagnating. Baidu says a 3B and a 30B variant follow this quarter."],
    ],
  },
  {
    slug: "vng-cloud-listing",
    pillarSlug: "finance",
    authorName: "Thao Nguyen",
    tagSlugs: ["ipo", "vietnam", "cloud"],
    title: "VNG cloud arm files for a Singapore listing as Vietnam's tech IPO window cracks open",
    dek:
      "The carve-out values infrastructure ahead of consumer – a deliberate signal to the next ten founders watching from HCMC.",
    section: "Markets",
    readMin: 6,
    publishedAt: "2026-05-27T05:55:00+07:00",
    bodyBlocks: [
      ["p", "VNG has filed to list its cloud-infrastructure arm in Singapore, carving the unit out ahead of its better-known consumer businesses in a sequencing that is itself the signal."],
      ["p", "By valuing infrastructure first, the company is telling the next ten Vietnamese founders watching from Ho Chi Minh City where the durable multiples are."],
      ["p", "Bankers close to the deal frame the Singapore venue as a liquidity and governance choice rather than a flight from Hanoi — a distinction Vietnamese regulators have been keen to preserve."],
      ["p", "If the window holds, two more carve-outs are expected to test it before year-end."],
    ],
  },
  {
    slug: "briefasia-studio-aws-asean",
    pillarSlug: "asia",
    authorName: "Mei Lin",
    title: "How an ASEAN insurer rebuilt its claims pipeline on serverless in 18 weeks",
    dek:
      "A BriefAsia Studio Presents feature, produced for AWS ASEAN. The BriefAsia newsroom was not involved in writing or editing.",
    section: "Sponsored",
    readMin: 6,
    publishedAt: "2026-05-24T09:00:00+08:00",
    sponsored: true,
    sponsor: "AWS ASEAN",
    bodyBlocks: [
      ["p", "When a mid-sized ASEAN insurer set out to rebuild its claims pipeline, the brief was unglamorous: cut the 11-day median settlement time without adding headcount."],
      ["p", "The team rebuilt the pipeline on a serverless event architecture in 18 weeks, replacing a nightly batch job with per-event processing and a managed queue."],
      ["p", "Median settlement fell to four days. This feature was produced by BriefAsia Studio for AWS ASEAN; the BriefAsia newsroom was not involved in its writing or editing."],
    ],
  },
  {
    slug: "deep-dive-asia-capex",
    pillarSlug: "asia",
    authorName: "Mei Lin",
    coAuthorNames: ["Jordan Chen", "Arif Rahman"],
    title: "The $84B build-out: every datacenter announced across ASEAN in the last 12 months, mapped",
    dek:
      "We pulled filings, planning permits, and grid-connection requests from seven jurisdictions. Here is what the spreadsheet actually says.",
    section: "Deep Dive",
    readMin: 22,
    publishedAt: "2026-05-23T07:00:00+08:00",
    deepDive: true,
    bodyBlocks: [
      ["p", "We pulled filings, planning permits, and grid-connection requests from seven ASEAN jurisdictions to answer one question: how much datacenter capacity has actually been committed in the last twelve months?"],
      ["p", "The headline figure is $84 billion across 41 announced projects. But “announced” is doing a lot of work in that sentence."],
      ["h3", "What the spreadsheet actually says"],
      ["p", "Strip out projects without a secured grid connection and the committed total falls to roughly $51 billion — still a record, but a third smaller than the press releases imply."],
      ["p", "Indonesia leads on announced capacity; Malaysia leads on capacity with power actually contracted. The gap between those two columns is the real story of ASEAN's build-out."],
    ],
  },
  {
    slug: "ai-assisted-translation-note",
    pillarSlug: "technology",
    authorName: "Ravi Kim",
    title: "What 'AI-assisted' actually means in our newsroom – a worked example",
    dek: "Translation, transcription, summarisation. Not generation. Here's our checklist.",
    section: "Tools",
    readMin: 5,
    publishedAt: "2026-05-22T10:00:00+08:00",
    aiAssisted: true,
    bodyBlocks: [
      ["p", "Every article on BriefAsia that used an AI tool carries a disclosure box. This piece explains exactly what that box does and does not mean."],
      ["p", "We use machine assistance for three things: translating source documents, transcribing interviews, and summarising long filings for a reporter to verify. We do not use it to generate published prose."],
      ["h3", "The checklist"],
      ["p", "Before an AI-assisted tag goes on, an editor confirms a human wrote the article, a human verified every translated quote against the source, and no generated text reached the page unedited."],
    ],
  },
  {
    slug: "react-server-actions-tradeoffs",
    pillarSlug: "technology",
    authorName: "Jordan Chen",
    title: "Server Actions in production: three teams, three regrets, one quiet success",
    dek:
      "What the framework docs don't tell you about caching, error boundaries, and 03:00 alerts.",
    section: "Engineering",
    readMin: 11,
    publishedAt: "2026-05-26T11:00:00+08:00",
    bodyBlocks: [
      ["p", "Server Actions promised to collapse the boundary between client and server. Three teams we spoke to shipped them to production; here is what the framework docs left out."],
      ["p", "The first regret was caching. Actions that mutate data need their revalidation wired explicitly, and the failure mode is silent: stale reads that look fine in development."],
      ["p", "The second was error surfacing. A thrown action error with no boundary drops users to a blank screen — the kind of thing you discover at 03:00, not in review."],
      ["p", "The quiet success: one team treated actions as a thin transport over a well-tested service layer, and barely noticed the framework at all. That, they argue, is the point."],
    ],
  },
  {
    slug: "oppo-find-x9-review",
    pillarSlug: "lifestyle",
    authorName: "Jordan Chen",
    title: "Oppo Find X9 Pro review: a camera-first flagship that finally trusts its own sensors",
    dek: "The 1-inch main is doing real work. The compute is doing less work – and that's the point.",
    section: "Review",
    readMin: 10,
    publishedAt: "2026-05-25T16:20:00+08:00",
    affiliate: true,
    bodyBlocks: [
      ["p", "The Oppo Find X9 Pro is a camera-first flagship that, refreshingly, trusts its own hardware. The 1-inch main sensor does real work; the computational pipeline does less, and is better for it."],
      ["p", "In daylight the results are clean and unhurried. The phone resists the over-sharpened, over-saturated look that has crept into its rivals' night modes."],
      ["h3", "Where it slips"],
      ["p", "Battery life is merely good, not exceptional, and the bundled-charger politics will annoy. But for anyone who buys a phone primarily to photograph, this is the one to beat this year."],
    ],
  },
  {
    slug: "taiwan-chip-export-rules",
    pillarSlug: "perspectives",
    authorName: "Ananya Iyer",
    title: "Taipei's new chip export schedule reshapes who gets advanced packaging in 2026",
    dek: "The list is short. The exclusions are louder than the inclusions.",
    section: "Trade",
    readMin: 7,
    publishedAt: "2026-05-26T15:10:00+08:00",
    bodyBlocks: [
      ["p", "Taipei published a revised export schedule for advanced packaging this week. The list of who qualifies is short; the list of who was quietly left off is the document worth reading."],
      ["p", "Advanced packaging — not raw wafers — is the current chokepoint for high-end AI accelerators, which makes the schedule a more precise instrument of policy than headline chip bans."],
      ["p", "Two ASEAN assembly partners gained eligibility. One prominent mainland-linked subcontractor did not, despite meeting the stated technical criteria — a reminder that the exclusions are louder than the inclusions."],
    ],
  },
];

const WIRE_DROPS: ReadonlyArray<{ time: string; city: string; text: string }> = [
  { time: "08:42", city: "Singapore", text: "MAS approves digital asset custody licence for DBS – first major bank to clear the revised framework." },
  { time: "08:31", city: "Seoul", text: "SK Hynix says HBM4 sampling to top customers begins June; volume in Q4." },
  { time: "08:14", city: "Jakarta", text: "GoTo posts adjusted EBITDA positive for second straight quarter; on-demand take-rate ticks up 40bps." },
  { time: "07:58", city: "Hanoi", text: "VNG Cloud confirms Singapore listing filing; Q4 revenue grew 31% YoY per draft prospectus." },
];
const COUNTRIES: ReadonlyArray<{ slug: string; name: string; region: string; description: string }> = [
  { slug: "singapore", name: "Singapore", region: "southeast-asia", description: "Financial, technology, property, and policy hub for Southeast Asia." },
  { slug: "vietnam", name: "Vietnam", region: "southeast-asia", description: "Manufacturing, fintech, infrastructure, consumer, travel, and energy-transition coverage." },
  { slug: "indonesia", name: "Indonesia", region: "southeast-asia", description: "Capital flows, platforms, mining, mobility, policy, and the region's largest consumer market." },
  { slug: "malaysia", name: "Malaysia", region: "southeast-asia", description: "Chips, data centers, property, energy, logistics, and cross-border investment." },
  { slug: "philippines", name: "Philippines", region: "southeast-asia", description: "Banks, remittances, consumer platforms, real estate, and infrastructure." },
  { slug: "thailand", name: "Thailand", region: "southeast-asia", description: "Tourism, manufacturing, retail, mobility, sustainability, and capital markets." },
  { slug: "china", name: "China", region: "east-asia", description: "Industrial policy, capital markets, technology platforms, trade, and consumer shifts." },
  { slug: "japan", name: "Japan", region: "east-asia", description: "Markets, corporate reform, chips, travel, consumer, and sustainability coverage." },
  { slug: "south-korea", name: "South Korea", region: "east-asia", description: "Semiconductors, entertainment, AI, mobility, finance, and consumer exports." },
  { slug: "taiwan", name: "Taiwan", region: "east-asia", description: "Chips, hardware supply chains, export controls, and capital markets." },
  { slug: "hong-kong", name: "Hong Kong", region: "east-asia", description: "Listings, banks, wealth, property, and regional capital flows." },
  { slug: "india", name: "India", region: "south-asia", description: "Founders, capital markets, payments, policy, infrastructure, and energy transition." },
  { slug: "bangladesh", name: "Bangladesh", region: "south-asia", description: "Manufacturing, climate, finance, infrastructure, and consumer shifts." },
  { slug: "sri-lanka", name: "Sri Lanka", region: "south-asia", description: "Tourism, debt, logistics, real estate, and energy coverage." },
  { slug: "pakistan", name: "Pakistan", region: "south-asia", description: "Payments, startups, trade, policy, manufacturing, and infrastructure." },
];

const NEWSLETTER_PRODUCTS = [
  ["morning-brief", "Morning Brief", "Weekdays, 7AM SGT", "Flagship 5-minute read for Asia decision-makers.", "asia", 1],
  ["finance-weekly", "Finance Weekly", "Fridays", "Banking, capital markets, fintech, and consequential regional deals.", "finance", 2],
  ["tech-weekly", "Tech Weekly", "Thursdays", "AI, startups, platforms, infrastructure, and funding signals.", "technology", 3],
  ["travel-lifestyle-weekly", "Travel & Lifestyle Weekly", "Saturdays", "Hotels, tables, destinations, luxury, and spending shifts.", "travel-dining", 4],
  ["esg-monthly", "ESG Monthly", "First of the month", "Green finance, energy transition, and circular economy.", "sustainability", 5],
] as const;

const PODCAST_PRODUCTS = [
  ["the-morning-brief-001", "The Morning Brief", "001", "The markets Asia is watching this week", "A fast walk through capital flows, policy signals, and what to watch next.", "12:40", "Mei Lin Tan"],
  ["capital-flows-018", "Capital Flows", "018", "Why Asia's listing window is selective", "Jordan Chen explains the new discipline in regional equity issuance.", "31:22", "Jordan Chen"],
  ["asia-tech-show-009", "The Asia Tech Show", "009", "Compute, chips, and the Southeast Asia grid", "Ravi Kim on why infrastructure is now the technology beat.", "38:11", "Ravi Kim"],
] as const;

const MARKET_SNAPSHOTS = [
  ["Singapore", "STI", "3,742.10", 0.23, "Banks lead as the city-state's REIT rally extends."],
  ["Japan", "NIKKEI 225", "39,128.40", 0.82, "BOJ signals patience as wage growth firms."],
  ["Hong Kong", "HANG SENG", "18,476.20", -0.41, "Southbound flows hit a 2024 high despite the dip."],
  ["Indonesia", "JCI", "7,205.40", 0.34, "Rupiah steadies after Bank Indonesia holds rates."],
  ["South Korea", "KOSPI", "2,738.50", 0.55, "Chipmakers rally on AI-memory demand."],
  ["Vietnam", "VN-INDEX", "1,284.66", 1.12, "Foreign buying returns ahead of FTSE upgrade decision."],
  ["Taiwan", "TAIEX", "22,940.10", 0.74, "TSMC leads as foundry orders strengthen."],
  ["Thailand", "SET", "1,318.90", -0.18, "Tourism names slip on a softer arrivals forecast."],
] as const;

// ──────────────────────────────────────────────────────────────────────────────
// Upsert helpers
// ──────────────────────────────────────────────────────────────────────────────

type CollSlug = "pillars" | "countries" | "authors" | "tags" | "articles" | "wireDrops" | "newsletters" | "podcasts" | "marketSnapshots";

async function findIdBy(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: CollSlug,
  where: Record<string, { equals: string }>
): Promise<string | number | null> {
  const res = await payload.find({ collection, where, limit: 1, depth: 0 });
  return res.docs.length > 0 ? (res.docs[0] as { id: string | number }).id : null;
}

async function upsert(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: CollSlug,
  where: Record<string, { equals: string }>,
  data: Record<string, unknown>
): Promise<string | number> {
  const existing = await findIdBy(payload, collection, where);
  if (existing != null) {
    // Payload's generated types for `update()` over a unioned slug aren't
    // useful for a dynamic seed shape.
    // `disableRevalidate` stops the E3c afterChange hook from calling
    // `revalidateTag` — there's no Next request scope in this tsx process.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.update({ collection, id: existing, data, context: { disableRevalidate: true } } as any);
    return existing;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const created = await payload.create({ collection, data, context: { disableRevalidate: true } } as any);
  return (created as { id: string | number }).id;
}

// ──────────────────────────────────────────────────────────────────────────────
// Seed
// ──────────────────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config });
  console.log("[seed] connected");

  // 0. First editorial admin (idempotent) — so a fresh DB can log into /admin
  //    without the create-first-user dance. Set SEED_ADMIN_EMAIL +
  //    SEED_ADMIN_PASSWORD in .env.local. Skipped if unset or already present.
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: adminEmail } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "users",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { email: adminEmail, password: adminPassword, name: "BriefAsia Admin", role: "admin" } as any,
        context: { disableRevalidate: true },
      });
      console.log(`[seed] admin user created: ${adminEmail}`);
    } else {
      console.log(`[seed] admin user already exists: ${adminEmail}`);
    }
  } else {
    console.log(
      "[seed] SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD not set — skipping admin seed (use /admin create-first-user instead)"
    );
  }

  // 1. Pillars
  const pillarIds = new Map<string, string | number>();
  for (const p of PILLARS) {
    const id = await upsert(payload, "pillars", { slug: { equals: p.slug } }, {
      slug: p.slug,
      title: { en: p.titleEn, vi: p.titleVi, id: p.titleId },
      heading: p.heading,
      color: p.color,
      icon: p.icon,
      order: p.order,
      description: p.description,
    });
    pillarIds.set(p.slug, id);
  }
  console.log(`[seed] pillars: ${pillarIds.size}`);
  const countryIds = new Map<string, string | number>();
  for (const [index, country] of COUNTRIES.entries()) {
    const id = await upsert(payload, "countries", { slug: { equals: country.slug } }, {
      ...country,
      order: index + 1,
    });
    countryIds.set(country.slug, id);
  }
  console.log(`[seed] countries: ${countryIds.size}`);

  // 2. Authors
  const authorIds = new Map<string, string | number>();
  for (const a of AUTHORS) {
    const id = await upsert(payload, "authors", { name: { equals: a.name } }, a);
    authorIds.set(a.name, id);
  }
  console.log(`[seed] authors: ${authorIds.size}`);

  // 3. Tags
  const tagIds = new Map<string, string | number>();
  for (const t of TAGS) {
    const id = await upsert(payload, "tags", { slug: { equals: t.slug } }, {
      slug: t.slug,
      title: { en: t.en },
    });
    tagIds.set(t.slug, id);
  }
  console.log(`[seed] tags: ${tagIds.size}`);

  // 4. Articles
  let inserted = 0;
  let updated = 0;
  for (const a of ARTICLES) {
    const pillarId = pillarIds.get(a.pillarSlug);
    const authorId = authorIds.get(a.authorName);
    if (pillarId == null || authorId == null) {
      console.warn(`[seed] skipping ${a.slug}: pillar=${pillarId} author=${authorId}`);
      continue;
    }
    const coAuthorIds = (a.coAuthorNames ?? [])
      .map((n) => authorIds.get(n))
      .filter((v): v is string | number => v != null);
    const tagRelIds = (a.tagSlugs ?? [])
      .map((s) => tagIds.get(s))
      .filter((v): v is string | number => v != null);

    const data = {
      title: a.title,
      slug: a.slug,
      dek: a.dek,
      body: lexBody(a.bodyBlocks ?? []),
      section: a.section,
      readMin: a.readMin,
      publishedAt: new Date(a.publishedAt).toISOString(),
      pillar: pillarId,
      author: authorId,
      coAuthors: coAuthorIds,
      tags: tagRelIds,
      aiAssisted: a.aiAssisted ?? false,
      sponsored: a.sponsored ?? false,
      sponsor: a.sponsor,
      affiliate: a.affiliate ?? false,
      deepDive: a.deepDive ?? false,
      imageLabel: a.imageLabel,
      origin: "manual" as const,
      editedByHuman: true,
      lockedFields: [],
      version: 1,
      // Publish on seed so the published-only reader queries surface them
      // (drafts are enabled on the Articles collection).
      _status: "published" as const,
    };

    const existing = await findIdBy(payload, "articles", { slug: { equals: a.slug } });
    if (existing != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.update({ collection: "articles", id: existing, data, context: { disableRevalidate: true } } as any);
      updated++;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection: "articles", data, context: { disableRevalidate: true } } as any);
      inserted++;
    }
  }
  console.log(`[seed] articles: inserted=${inserted} updated=${updated}`);

  // 5. Wire drops — clear existing first so reruns don't accumulate duplicates
  const existingDrops = await payload.find({ collection: "wireDrops", limit: 500, depth: 0 });
  for (const d of existingDrops.docs) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.delete({ collection: "wireDrops", id: (d as any).id, context: { disableRevalidate: true } } as any);
  }
  for (const w of WIRE_DROPS) {
    await payload.create({
      collection: "wireDrops",
      data: { ...w, publishedAt: new Date().toISOString() },
      context: { disableRevalidate: true },
    });
  }
  console.log(`[seed] wireDrops: ${WIRE_DROPS.length}`);
  for (const [slug, name, cadence, description, verticalSlug, order] of NEWSLETTER_PRODUCTS) {
    await upsert(payload, "newsletters", { slug: { equals: slug } }, {
      slug,
      name,
      cadence,
      description,
      vertical: pillarIds.get(verticalSlug),
      active: true,
      order,
    });
  }
  console.log(`[seed] newsletters: ${NEWSLETTER_PRODUCTS.length}`);

  for (const [slug, show, episode, title, description, duration, host] of PODCAST_PRODUCTS) {
    await upsert(payload, "podcasts", { slug: { equals: slug } }, {
      slug,
      show,
      episode,
      title,
      description,
      duration,
      host,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`[seed] podcasts: ${PODCAST_PRODUCTS.length}`);

  for (const [country, market, value, changePct, summary] of MARKET_SNAPSHOTS) {
    await upsert(payload, "marketSnapshots", { market: { equals: market } }, {
      country,
      market,
      value,
      changePct,
      summary,
      updatedAt: new Date().toISOString(),
    });
  }
  console.log(`[seed] marketSnapshots: ${MARKET_SNAPSHOTS.length}`);

  console.log("[seed] done");
  process.exit(0);
}

seed().catch((err: unknown) => {
  console.error("[seed] FAILED", err);
  process.exit(1);
});
