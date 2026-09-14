import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Grid from "../../../components/grid";
import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import Musician from "../../../components/musician";
import Section from "../../../components/section";
import { getAllEnsembleSlugs, getEnsembleBySlug } from "../../../lib/api";

export const revalidate = 86400;

export async function generateStaticParams() {
 const slugs = await getAllEnsembleSlugs();

 return slugs
  .map((edge) => edge?.node?.slug)
  .filter(Boolean)
  .map((slug) => ({ id: slug }));
}

function getEnsembleJsonLd(data) {
 const { title, slug, ensembleInformation } = data;
 const conductors = Array.isArray(ensembleInformation?.conductor)
  ? ensembleInformation.conductor
  : [];
 const instruments = Array.isArray(ensembleInformation?.instruments)
  ? ensembleInformation.instruments
  : [];

 const memberMap = new Map<string, { "@type": "Person"; name: string; url: string }>();

 conductors.forEach((part) => {
  const { prefix, firstName, middleInitial, lastName, suffix } =
   part?.personInformation || {};

  if (!firstName && !lastName) return;

  const nameParts: string[] = [];
  if (prefix) nameParts.push(prefix);
  if (firstName) nameParts.push(firstName);
  if (middleInitial) nameParts.push(`${middleInitial}.`);
  if (lastName) nameParts.push(lastName);
  if (suffix) nameParts.push(`, ${suffix}`);

  const fullName = nameParts.join(" ").trim();
  if (fullName) {
    const personSlug = part?.slug;
    memberMap.set(fullName, {
    "@type": "Person",
    name: fullName,
     url: personSlug
      ? `https://subrass.syr.edu/about/musicians/${personSlug}`
      : "https://subrass.syr.edu/about",
   });
  }
 });

 instruments.forEach((part) => {
  const musicians = Array.isArray(part?.musicians) ? part.musicians : [];

  musicians.forEach((musician) => {
   const { prefix, firstName, middleInitial, lastName, suffix } =
    musician?.personInformation || {};

   if (!firstName && !lastName) return;

  const nameParts: string[] = [];
   if (prefix) nameParts.push(prefix);
   if (firstName) nameParts.push(firstName);
   if (middleInitial) nameParts.push(`${middleInitial}.`);
   if (lastName) nameParts.push(lastName);
   if (suffix) nameParts.push(`, ${suffix}`);

   const fullName = nameParts.join(" ").trim();
   if (fullName) {
   const personSlug = musician?.slug;
   memberMap.set(fullName, {
     "@type": "Person",
     name: fullName,
    url: personSlug
    ? `https://subrass.syr.edu/about/musicians/${personSlug}`
    : "https://subrass.syr.edu/about",
    });
   }
  });
 });

 const members = Array.from(memberMap.values());
 const canonicalUrl = `https://subrass.syr.edu/ensembles/${slug}`;

 return {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": canonicalUrl,
  url: canonicalUrl,
  name: title,
  description:
   "The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians.",
  image:
  "https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg",
  member: members,
  genre: "Brass",
 };
}

export async function generateMetadata({ params }): Promise<Metadata> {
 const resolvedParams = await params;
 const ensembleId = resolvedParams?.id;

 if (!ensembleId) {
  return {
   title: "Syracuse University Brass Ensemble",
   alternates: {
    canonical: "https://subrass.syr.edu/ensembles",
   },
  };
 }

 const ensembleData = await getEnsembleBySlug(ensembleId);
 const title = ensembleData?.title || "Syracuse University Brass Ensemble";
 const slug = ensembleData?.slug || ensembleId;
 const canonicalUrl = `https://subrass.syr.edu/ensembles/${slug}`;
 const description = `${title} members and instrumentation for the Syracuse University Brass Ensemble.`;

 return {
  title: `${title} Members & Instruments - Syracuse University Brass Ensemble`,
  description,
  alternates: {
   canonical: canonicalUrl,
  },
  openGraph: {
   type: "website",
   url: canonicalUrl,
   title: `${title} Members & Instruments - Syracuse University Brass Ensemble`,
   description,
   images: [
    {
     url: "https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg",
     width: 1200,
     height: 630,
     alt: title,
    },
   ],
  },
  twitter: {
   card: "summary_large_image",
   title: `${title} Members & Instruments - Syracuse University Brass Ensemble`,
   description,
   images: ["https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg"],
  },
 };
}

export default async function EnsemblePage({ params }) {
 const resolvedParams = await params;
 const ensembleId = resolvedParams?.id;

 if (!ensembleId) {
  notFound();
 }

 const ensembleData = await getEnsembleBySlug(ensembleId);

 if (!ensembleData) {
  notFound();
 }

 const { title, ensembleInformation } = ensembleData;
 const conductors = Array.isArray(ensembleInformation?.conductor)
  ? ensembleInformation.conductor
  : [];
 const instruments = Array.isArray(ensembleInformation?.instruments)
  ? ensembleInformation.instruments
  : [];
 const ensembleCanonicalUrl = `https://subrass.syr.edu/ensembles/${ensembleData?.slug || ensembleId}`;
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
   {
    "@type": "ListItem",
    position: 3,
    name: `${title} Ensemble`,
    item: ensembleCanonicalUrl,
   },
  ],
 };

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(getEnsembleJsonLd(ensembleData)) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
   />
  <Heading level={1} marginTop="8" marginBottom="4">
    {title} Ensemble
   </Heading>

   {conductors.filter((c) => c?.personInformation).length > 0 ? (
    <Section>
     <Heading
      level={2}
      marginTop="6"
      marginBottom="2"
      borderTop="1"
      textTransform="uppercase"
     >
      Conductors
     </Heading>
     <Grid>
      {conductors
       .filter((part) => part?.personInformation)
       .map((part, index) => (
        <Grid.Item key={`conductor-${index}`}>
         <Musician data={part} teaser />
        </Grid.Item>
       ))}
     </Grid>
    </Section>
   ) : null}

   {instruments.length > 0
    ? instruments.map((part, index) => {
       const instrumentObj = part?.instrument || {};
       const instrumentName = instrumentObj?.name || "";
       const musicians = (Array.isArray(part?.musicians) ? part.musicians : []).filter(
        (m) => m?.personInformation
       );

       return (
        <Section key={`instrument-${index}`}>
         {instrumentName ? (
          <Heading
           level={2}
           marginTop="6"
           marginBottom="2"
           borderTop="1"
           textTransform="uppercase"
          >
           {instrumentName}
           {instrumentName !== "Percussion" ? "s" : ""}
          </Heading>
         ) : null}
         <Grid>
          {musicians.map((musician, musicianIndex) => (
           <Grid.Item key={`musician-${musicianIndex}`}>
            <Musician data={musician} teaser />
           </Grid.Item>
          ))}
         </Grid>
        </Section>
       );
      })
    : null}
  </Layout>
 );
}