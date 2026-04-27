import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }) {
 const resolvedParams = await params;
 const concertSlug = resolvedParams?.slug;

 if (!concertSlug) {
  return {
   title: "Syracuse University Brass Ensemble",
  };
 }

 const concertData = await getConcertBySlug(concertSlug);
 const concertTitle = concertData?.title || "Concert";
 const description =
  stripHtml(concertData?.excerpt) ||
  `Join the Syracuse University Brass Ensemble for ${concertTitle}.`;

 return {
  title: `${concertTitle} - Live Concert by Syracuse University Brass Ensemble`,
  description,
  alternates: {
   canonical: concertData?.uri
    ? `https://subrass.syr.edu${concertData.uri}`
    : `https://subrass.syr.edu/concerts/${resolvedParams.year}/${concertSlug}`,
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

 return (
  <Layout>
   <Section>
    <Concert data={concertData} />
   </Section>
  </Layout>
 );
}