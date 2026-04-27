import { getAllConcertSlugs, getAllEnsembleSlugs, getAllMusicians } from "../lib/api";

const BASE_URL = "https://subrass.syr.edu";

function toSitemapEntry(path, lastModified, changeFrequency = "monthly") {
 return {
  url: `${BASE_URL}${path}`,
  lastModified: lastModified || undefined,
  changeFrequency,
 };
}

export default async function sitemap() {
 const [musicians, concerts, ensembles] = await Promise.all([
  getAllMusicians(),
  getAllConcertSlugs(),
  getAllEnsembleSlugs(),
 ]);

 const staticEntries = ["", "/about", "/concerts", "/contact"].map((path) =>
  toSitemapEntry(path, undefined, "weekly")
 );

 const musicianEntries = musicians
  .map((musician) => {
   const slug = musician?.node?.slug;
   if (!slug) return null;
   return toSitemapEntry(
    `/about/musicians/${slug}`,
    musician?.node?.modifiedGmt,
    "monthly"
   );
  })
  .filter(Boolean);

 const concertEntries = concerts
  .map((concert) => {
   const uri = concert?.node?.uri;
   if (!uri) return null;
   return toSitemapEntry(uri, concert?.node?.modifiedGmt, "monthly");
  })
  .filter(Boolean);

 const ensembleEntries = ensembles
  .map((ensemble) => {
   const uri = ensemble?.node?.uri;
   if (!uri) return null;
   return toSitemapEntry(uri, ensemble?.node?.modifiedGmt, "monthly");
  })
  .filter(Boolean);

 return [...staticEntries, ...musicianEntries, ...concertEntries, ...ensembleEntries];
}