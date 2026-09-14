import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Concert from "../../../../components/concert";
import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import { getAllConcertSlugs, getConcertBySlug } from "../../../../lib/api";

export const revalidate = 86400;

function stripHtml(input) {
 if (!input) return "";
 return input.replace(/<[^>]*>/g, "").trim();
}

export async function generateStaticParams() {
 const concerts = await getAllConcertSlugs();

 return concerts
  .filter((edge) => {
   return Boolean(edge?.node?.slug && edge?.node?.academicYears?.edges?.[0]?.node?.slug);
  })
  .map((edge) => ({
   slug: edge.node.slug,
   year: edge.node.academicYears.edges[0].node.slug,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
 const resolvedParams = await params;
 const concertSlug = resolvedParams?.slug;

 if (!concertSlug) {
  return {
   title: "Syracuse University Brass Ensemble",
  };
 }

 const concertData = await getConcertBySlug(concertSlug);
 const concertTitle = concertData?.title || "Concert";
 const canonicalUrl = concertData?.uri
  ? `https://subrass.syr.edu${concertData.uri}`
  : `https://subrass.syr.edu/concerts/${resolvedParams.year}/${concertSlug}`;
 const socialImage =
  concertData?.featuredImage?.node?.sourceUrl ||
  "https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg";
 const description =
  stripHtml(concertData?.excerpt) ||
  `Join the Syracuse University Brass Ensemble for ${concertTitle}.`;

 return {
  title: `${concertTitle} - Live Concert by Syracuse University Brass Ensemble`,
  description,
  alternates: {
   canonical: canonicalUrl,
  },
  openGraph: {
   type: "article",
   url: canonicalUrl,
   title: `${concertTitle} - Live Concert by Syracuse University Brass Ensemble`,
   description,
   images: [
    {
     url: socialImage,
     alt: concertTitle,
    },
   ],
  },
  twitter: {
   card: "summary_large_image",
   title: `${concertTitle} - Live Concert by Syracuse University Brass Ensemble`,
   description,
   images: [socialImage],
  },
 };
}

export default async function SingleConcertPage({ params }) {
 const resolvedParams = await params;
 const concertSlug = resolvedParams?.slug;

 if (!concertSlug) {
  notFound();
 }

 const concertData = await getConcertBySlug(concertSlug);

 if (!concertData) {
  notFound();
 }

 const concertTitle = concertData?.title || "Concert";
 const concertCanonicalUrl = concertData?.uri
  ? `https://subrass.syr.edu${concertData.uri}`
  : `https://subrass.syr.edu/concerts/${resolvedParams.year}/${concertSlug}`;
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
    name: "Concerts",
    item: "https://subrass.syr.edu/concerts",
   },
   {
    "@type": "ListItem",
    position: 3,
    name: concertTitle,
    item: concertCanonicalUrl,
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
    <Concert data={concertData} />
   </Section>
  </Layout>
 );
}