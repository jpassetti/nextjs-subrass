import { notFound } from "next/navigation";

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
 const { title, ensembleInformation } = data;
 const conductors = Array.isArray(ensembleInformation?.conductor)
  ? ensembleInformation.conductor
  : [];
 const instruments = Array.isArray(ensembleInformation?.instruments)
  ? ensembleInformation.instruments
  : [];

 const members: Array<{ "@type": "Person"; name: string }> = [];

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
   members.push({
    "@type": "Person",
    name: fullName,
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
    members.push({
     "@type": "Person",
     name: fullName,
    });
   }
  });
 });

 return {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: `${title} Ensemble`,
  description:
   "The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians.",
  image: "images/group-photo-2019-crop-m_orig.jpg",
  member: members,
  genre: "Brass",
 };
}

export async function generateMetadata({ params }) {
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

 return {
  title: `${title} Members & Instruments - Syracuse University Brass Ensemble`,
  alternates: {
   canonical: `https://subrass.syr.edu/ensembles/${slug}`,
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

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(getEnsembleJsonLd(ensembleData)) }}
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