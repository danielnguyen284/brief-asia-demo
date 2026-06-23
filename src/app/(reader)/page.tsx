import { Reveal } from "@/components/effects";
import { BreakingTicker } from "@/components/home/breaking-ticker";
import { HomeHero } from "@/components/home/home-hero";
import { MarketTicker } from "@/components/home/market-ticker";
import { PillarShowcase } from "@/components/home/pillar-showcase";
import { toArticleView, type ArticleView } from "@/lib/article-view";
import {
  getMarketSnapshots,
  getNavPillars,
  getPinnedLatest,
  getRecentArticles,
} from "@/lib/payload-server";
import type { PillarId } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [recent, pinnedDoc, pillars, marketSnapshots] =
    await Promise.all([
      getRecentArticles(40),
      getPinnedLatest(),
      getNavPillars(),
      getMarketSnapshots(),
    ]);

  const articles = recent.map(toArticleView);
  const pinned = pinnedDoc ? toArticleView(pinnedDoc) : null;
  const heroPool = articles.filter((a) => !a.sponsored);
  // A pinned story headlines the big hero slot (top-left of the homepage);
  // otherwise the newest non-sponsored story leads.
  const lead = pinned ?? heroPool[0] ?? articles[0]!;
  // "Also leading today" rail = the next newest non-sponsored stories, minus
  // whatever currently leads.
  const aside = heroPool.filter((a) => a.id !== lead.id).slice(0, 4);

  const byPillar: Partial<Record<PillarId, ArticleView[]>> = {};
  for (const a of articles) {
    const list = byPillar[a.pillar] ?? [];
    if (list.length < 7) {
      byPillar[a.pillar] = [...list, a];
    }
  }

  return (
    <>
      <BreakingTicker />
      <div className="container">
        <HomeHero lead={lead} aside={aside} />
        <Reveal>
          <MarketTicker snapshots={marketSnapshots} />
        </Reveal>
        <Reveal>
          <PillarShowcase pillars={pillars} byPillar={byPillar} />
        </Reveal>
      </div>
    </>
  );
}
