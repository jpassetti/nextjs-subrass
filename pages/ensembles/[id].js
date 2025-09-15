import Grid from "../../components/grid";
import Head from "next/head";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import Musician from "../../components/musician";
import Section from "../../components/section";
import SEO from "../../components/SEO";

import { getEnsembleBySlug, getAllEnsembleSlugs } from "../../lib/api";

export async function getStaticPaths() {
 console.log("get static paths");
 // Return a list of possible value for id
 const slugs = await getAllEnsembleSlugs();
 //console.log({ slugs });
 const paths = slugs.map((edge) => {
  const { slug } = edge.node;
  return {
   params: {
    id: slug,
   },
  };
 });

 return {
  paths,
  fallback: false,
 };
}
export async function getStaticProps({ params }) {
 // Fetch necessary data for the blog post using params.id
 //console.log({params});
 const ensembleData = await getEnsembleBySlug(params.id);
 return {
  props: {
   ensembleData,
  },
 };
}
export default function Ensemble({ ensembleData }) {
 const { title, ensembleInformation, slug } = ensembleData || {};

 // Defensive fallbacks to avoid crashes if data is missing/empty
 const conductors = Array.isArray(ensembleInformation?.conductor)
    ? ensembleInformation.conductor
    : [];
 const instruments = Array.isArray(ensembleInformation?.instruments)
    ? ensembleInformation.instruments
    : [];
 function addProductJsonLd() {
  const members = [];

    // Add conductors (if any)
    conductors.forEach((part) => {
     const {
        prefix,
        firstName,
        middleInitial,
        lastName,
        suffix,
     } = part?.personInformation || {};

     // Skip if we don't have minimum name info
     if (!firstName && !lastName) return;

     let nameParts = [];
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

    // Add musicians by instrument (if any)
    instruments.forEach((part) => {
     const musicians = Array.isArray(part?.musicians) ? part.musicians : [];
     musicians.forEach((musician) => {
        const {
         prefix,
         firstName,
         middleInitial,
         lastName,
         suffix,
        } = musician?.personInformation || {};

        if (!firstName && !lastName) return;

        let nameParts = [];
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

  const schema = {
   "@context": "https://schema.org",
   "@type": "MusicGroup",
   name: `${title} Ensemble`,
   description:
    "The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians.",
   image: "images/group-photo-2019-crop-m_orig.jpg",
   member: members,
   genre: "Brass",
  };

  return {
   __html: JSON.stringify(schema),
  };
 }
 return (
  <Layout>
   <SEO
    title={`${title} Members & Instruments - Syracuse University Brass Ensemble`}
    url={`https://subrass.syr.edu/ensembles/${slug}`}
   />
   <Head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={addProductJsonLd()}
     key="product-jsonld"
    />
   </Head>
   <Heading level="1" marginTop="8" marginBottom="4">
    {title} Ensemble
   </Heading>

  {conductors.filter((c) => c?.personInformation).length > 0 && (
   <Section>
    <Heading
     level="2"
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
      .map((part, index) => {
       return (
        <Grid.Item key={`conductor-${index}`}>
         <Musician data={part} teaser />
        </Grid.Item>
       );
      })}
    </Grid>
   </Section>
  )}

  {instruments.length > 0 &&
   instruments.map((part, index) => {
     const instrumentObj = part?.instrument || {};
     const instrumentName = instrumentObj?.name || "";
    const musicians = (Array.isArray(part?.musicians) ? part.musicians : []).filter(
     (m) => m?.personInformation
    );
     return (
      <Section key={`instrument-${index}`}>
        {instrumentName && (
         <Heading
          level="2"
          marginTop="6"
          marginBottom="2"
          borderTop="1"
          textTransform="uppercase"
         >
          {instrumentName}
          {instrumentName !== "Percussion" ? `s` : ""}
         </Heading>
        )}
        <Grid>
         {musicians.map((musician, index) => {
          return (
            <Grid.Item key={`musician-${index}`}>
             <Musician data={musician} teaser />
            </Grid.Item>
          );
         })}
        </Grid>
      </Section>
     );
    })}
  </Layout>
 );
}
