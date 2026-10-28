import { ensembleImage1x1, ensembleStructuredImages } from "./site-images";

export const SITE_URL = "https://subrass.syr.edu";
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ENSEMBLE_ID = `${SITE_URL}/#ensemble`;

export const ensembleReference = {
 "@type": "MusicGroup",
 "@id": ENSEMBLE_ID,
 name: "Syracuse University Brass Ensemble",
 alternateName: "SU Brass Ensemble",
 url: SITE_URL,
};

export const ensembleIdentity = {
 ...ensembleReference,
 description:
  "A professional-level brass and percussion ensemble based at Syracuse University in Syracuse, New York.",
 image: ensembleStructuredImages,
 thumbnailUrl: `${SITE_URL}${ensembleImage1x1}`,
 telephone: "+1-315-443-3436",
 email: "subrass@syr.edu",
 address: {
  "@type": "PostalAddress",
  streetAddress: "Room 1-014, Center for Science and Technology, Syracuse University",
  addressLocality: "Syracuse",
  addressRegion: "NY",
  postalCode: "13244-4100",
  addressCountry: "US",
 },
 sameAs: [
  "https://www.facebook.com/subrass",
  "https://www.soundcloud.com/thesubrass",
  "https://www.youtube.com/thesubrass",
 ],
};
