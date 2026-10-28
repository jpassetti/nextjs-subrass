import { getAllConcertSlugs, getAllEnsembleSlugs, getAllMusicians } from "../lib/api";
import { getAllConcerts } from "../lib/api";
import { getConcertPagePath, getVenuePagePath } from "../lib/utilities";
import { toIsoLastModified } from "../lib/sitemap-date.mjs";

const BASE_URL = "https://subrass.syr.edu";

function normalizeSitemapPath(path) {
 if (!path || path === "/") return "";
 return `/${String(path).replace(/^\/+|\/+$/g, "")}`;
}

function toSitemapEntry(path, lastModified) {
 return {
  url: `${BASE_URL}${normalizeSitemapPath(path)}`,
  lastModified: toIsoLastModified(lastModified),
 };
}

export default async function sitemap() {
 const [musicians, concerts, ensembles, concertDetails] = await Promise.all([
  getAllMusicians(),
  getAllConcertSlugs(),
  getAllEnsembleSlugs(),
    getAllConcerts(),
 ]);

 const staticEntries = ["", "/about", "/concerts", "/ensembles", "/contact", "/concerts/america250", "/concerts/america250/promotions", "/concerts/america250/master-class"].map((path) =>
  toSitemapEntry(path, undefined)
 );

 const musicianEntries = musicians
  .map((musician) => {
   const slug = musician?.node?.slug;
   if (!slug) return null;
   return toSitemapEntry(
    `/about/musicians/${slug}`,
    musician?.node?.modifiedGmt
   );
  })
  .filter(Boolean);

 const concertEntries = concerts
  .map((concert) => {
   const uri = concert?.node?.uri;
   if (!uri) return null;
   return toSitemapEntry(getConcertPagePath(concert.node), concert?.node?.modifiedGmt);
  })
  .filter(Boolean);

 const ensembleEntries = ensembles
  .map((ensemble) => {
   const uri = ensemble?.node?.uri;
   if (!uri) return null;
   return toSitemapEntry(uri, ensemble?.node?.modifiedGmt);
  })
  .filter(Boolean);

 const venueMap: Record<string, { path: string; lastModified?: string }> = {};

 concertDetails.forEach((concert: any) => {
  const venueTitle = concert?.node?.concertInformation?.venue?.title;
  if (!venueTitle) {
  return;
  }

  const path = getVenuePagePath(venueTitle);
  if (!venueMap[path]) {
  venueMap[path] = {
   path,
   lastModified: concert?.node?.modifiedGmt,
  };
  return;
  }

  if (concert?.node?.modifiedGmt) {
  venueMap[path].lastModified =
   venueMap[path].lastModified && venueMap[path].lastModified > concert.node.modifiedGmt
    ? venueMap[path].lastModified
    : concert.node.modifiedGmt;
  }
 });

 const venueEntries = Object.values(venueMap).map((venue) =>
  toSitemapEntry(venue.path, venue.lastModified)
 );

 const entries = [
  ...staticEntries,
  ...musicianEntries,
  ...concertEntries,
  ...ensembleEntries,
  ...venueEntries,
 ];

 const entriesByUrl = new Map();
 entries.forEach((entry) => {
  const existing = entriesByUrl.get(entry.url);
  if (!existing || (!existing.lastModified && entry.lastModified)) {
   entriesByUrl.set(entry.url, entry);
  }
 });

 return Array.from(entriesByUrl.values());
}
