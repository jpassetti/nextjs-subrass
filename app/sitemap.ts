import { getAllConcertSlugs, getAllEnsembleSlugs, getAllMusicians } from "../lib/api";
import { getAllConcerts } from "../lib/api";
import { getVenuePagePath } from "../lib/utilities";

const BASE_URL = "https://subrass.syr.edu";

function toSitemapEntry(path, lastModified, changeFrequency = "monthly") {
 return {
  url: `${BASE_URL}${path}`,
  lastModified: lastModified || undefined,
  changeFrequency,
 };
}

export default async function sitemap() {
 const [musicians, concerts, ensembles, concertDetails] = await Promise.all([
  getAllMusicians(),
  getAllConcertSlugs(),
  getAllEnsembleSlugs(),
    getAllConcerts(),
 ]);

 const staticEntries = ["", "/about", "/concerts", "/ensembles", "/contact"].map((path) =>
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
  toSitemapEntry(venue.path, venue.lastModified, "monthly")
 );

 return [
  ...staticEntries,
  ...musicianEntries,
  ...concertEntries,
  ...ensembleEntries,
  ...venueEntries,
 ];
}