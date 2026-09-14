import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Layout from "../../../../components/layout";
import Musician from "../../../../components/musician";
import Section from "../../../../components/section";
import { getAllMusicians, getMusicianBySlug } from "../../../../lib/api";

export const revalidate = 86400;

function stripHtml(input) {
 if (!input) return "";
 return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildMusicianName(musicianData) {
 const personInfo = musicianData?.personInformation || {};
 const nameParts = [
  personInfo.prefix,
  personInfo.firstName,
  personInfo.middleInitial ? `${personInfo.middleInitial}.` : "",
  personInfo.lastName,
  personInfo.suffix ? `, ${personInfo.suffix}` : "",
 ].filter(Boolean);

 return nameParts.join(" ").replace(/\s+,/g, ",").trim();
}

export async function generateStaticParams() {
 const musicians = await getAllMusicians();

 return musicians
  .map((edge) => edge?.node?.slug)
  .filter(Boolean)
  .map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
 const resolvedParams = await params;
 const musicianId = resolvedParams?.id;

 if (!musicianId) {
  return {
   title: "Syracuse University Brass Ensemble Musicians",
   alternates: {
    canonical: "/about",
   },
  };
 }

 const musicianData = await getMusicianBySlug(musicianId);

 if (!musicianData) {
  return {
   title: "Musician Not Found",
   robots: {
    index: false,
    follow: false,
   },
  };
 }

 const musicianName = buildMusicianName(musicianData) || "SU Brass Musician";
 const description =
  stripHtml(musicianData?.content) ||
  `${musicianName} performs with the Syracuse University Brass Ensemble.`;
 const canonicalUrl = `https://subrass.syr.edu/about/musicians/${musicianData?.slug || musicianId}`;
 const socialImage =
  musicianData?.featuredImage?.node?.sourceUrl ||
  "https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg";

 return {
  title: `${musicianName} - Syracuse University Brass Ensemble`,
  description,
  alternates: {
   canonical: canonicalUrl,
  },
  openGraph: {
   type: "profile",
   url: canonicalUrl,
   title: `${musicianName} - Syracuse University Brass Ensemble`,
   description,
   images: [
    {
     url: socialImage,
     alt: musicianName,
    },
   ],
  },
  twitter: {
   card: "summary_large_image",
   title: `${musicianName} - Syracuse University Brass Ensemble`,
   description,
   images: [socialImage],
  },
 };
}

export default async function SingleMusicianPage({ params }) {
 const resolvedParams = await params;
 const musicianId = resolvedParams?.id;

 if (!musicianId) {
  notFound();
 }

 const musicianData = await getMusicianBySlug(musicianId);

 if (!musicianData) {
  notFound();
 }

 const musicianName = buildMusicianName(musicianData) || "Musician";
 const musicianCanonicalUrl = `https://subrass.syr.edu/about/musicians/${musicianData?.slug || musicianId}`;
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
    name: "About",
    item: "https://subrass.syr.edu/about",
   },
   {
    "@type": "ListItem",
    position: 3,
    name: "Musicians",
    item: "https://subrass.syr.edu/ensembles",
   },
   {
    "@type": "ListItem",
    position: 4,
    name: musicianName,
    item: musicianCanonicalUrl,
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
    <Musician data={musicianData} />
   </Section>
  </Layout>
 );
}