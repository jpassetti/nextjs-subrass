import type { Metadata } from "next";
import EnsembleRoster from "../../components/ensemble-roster";
import EnsembleYearNav from "../../components/ensemble-year-nav";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllEnsembleSlugs, getEnsembleBySlug } from "../../lib/api";

const CURRENT_ENSEMBLE_SLUG = "2026-27";

export const revalidate = 86400;

export const metadata: Metadata = {
 title: "Ensembles - Syracuse University Brass Ensemble",
 description:
  "Browse Syracuse University Brass Ensemble member rosters by ensemble year.",
 alternates: {
  canonical: "/ensembles",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu/ensembles",
  title: "Ensembles - Syracuse University Brass Ensemble",
  description:
   "Browse Syracuse University Brass Ensemble member rosters by ensemble year.",
  images: [
   {
    url: "/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg",
    width: 1200,
    height: 630,
    alt: "Syracuse University Brass Ensemble",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Ensembles - Syracuse University Brass Ensemble",
  description:
   "Browse Syracuse University Brass Ensemble member rosters by ensemble year.",
  images: ["/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg"],
 },
};

export default async function EnsemblesPage() {
 const ensembles = await getAllEnsembleSlugs();
 const sorted = [...ensembles]
  .map((edge) => edge?.node?.slug)
  .filter(Boolean)
  .sort((a, b) => (a > b ? -1 : 1));
 const currentSlug = sorted.includes(CURRENT_ENSEMBLE_SLUG) ? CURRENT_ENSEMBLE_SLUG : sorted[0];
 const ensembleData = currentSlug ? await getEnsembleBySlug(currentSlug) : null;

 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   {
    "@type": "ListItem",
    position: 1,
    name: "Home",
    item: "https://subrass.syr.edu/",
   },
   {
    "@type": "ListItem",
    position: 2,
    name: "Ensembles",
    item: "https://subrass.syr.edu/ensembles",
   },
  ],
 };

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
   />
   <Section>
    <Heading level={1} marginTop="8" marginBottom="4">
     {ensembleData?.title || currentSlug || "Ensembles"} Ensemble
    </Heading>
    <Paragraph type="intro">
     Meet the current Syracuse University Brass Ensemble and explore member rosters from previous years.
    </Paragraph>

    {ensembleData ? (
     <>
      <EnsembleYearNav currentSlug={currentSlug} currentYearSlug={CURRENT_ENSEMBLE_SLUG} slugs={sorted} />
      <EnsembleRoster ensembleData={ensembleData} />
     </>
    ) : (
     <Paragraph diminish>No ensemble rosters are currently available.</Paragraph>
    )}
   </Section>
  </Layout>
 );
}
