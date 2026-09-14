import type { Metadata } from "next";
import Link from "next/link";

import Heading from "../../components/heading";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllEnsembleSlugs } from "../../lib/api";

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

function formatSlugLabel(slug) {
 return slug
  .split("-")
  .map((part) => part.trim())
  .filter(Boolean)
  .join("-");
}

export default async function EnsemblesPage() {
 const ensembles = await getAllEnsembleSlugs();
 const sorted = [...ensembles]
  .map((edge) => edge?.node?.slug)
  .filter(Boolean)
  .sort((a, b) => (a > b ? -1 : 1));

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
     Ensembles
    </Heading>
    <Paragraph type="intro">
     Explore member rosters and instrumentation by ensemble year.
    </Paragraph>

    {sorted.length ? (
     sorted.map((slug) => (
      <Paragraph key={slug} marginBottom="2">
       <Link href={`/ensembles/${slug}`}>{formatSlugLabel(slug)} Ensemble</Link>
      </Paragraph>
     ))
    ) : (
     <Paragraph diminish>No ensemble rosters are currently available.</Paragraph>
    )}
   </Section>
  </Layout>
 );
}
