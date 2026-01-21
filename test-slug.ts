
import { getNewsBySlug, sampleNews } from "./lib/data/sample-news";

const slug = "tdc-ghana-ltd-commences-2026-with-prayer-and-thanksgiving";
console.log(`Testing slug: "${slug}"`);
console.log(`Total sample news: ${sampleNews.length}`);

const found = getNewsBySlug(slug);
console.log("Found article:", found ? found.title : "null");

const manualFind = sampleNews.find(a => a.slug === slug);
console.log("Manual find:", manualFind ? manualFind.title : "null");

sampleNews.forEach(a => {
  if (a.slug.includes("tdc-ghana-ltd-commences")) {
    console.log(`Partial match: "${a.slug}"`);
    console.log(`Slug match: ${a.slug === slug}`);
    console.log(`Status: ${a.status}`);
  }
});
