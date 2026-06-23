import { getRecentArticles } from "@/lib/payload-server";

export async function GET() {
  const articles = await getRecentArticles(40);
  const items = articles
    .map((a) => {
      const url = `https://briefasia.com/article/${a.slug}`;
      return `<item><title><![CDATA[${a.title}]]></title><link>${url}</link><guid>${url}</guid><description><![CDATA[${a.dek}]]></description><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BriefAsia</title><link>https://briefasia.com</link><description>Asia intelligence from BriefAsia.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
