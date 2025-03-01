import Head from "next/head";

import { getAllConcerts } from "../lib/api";
import ConcertInteractive from "../components/concertInteractive";
import Layout from "../components/layout";
import Heading from "../components/heading";
import Showcase from "../components/showcase";
import SEO from "../components/SEO";

export async function getStaticProps() {
 const concertsData = await getAllConcerts();
 return {
  props: {
   concertsData,
  },
  revalidate: 86400, // Revalidate every 24 hours
 };
}

const Home = ({ concertsData }) => {
 const today = new Date();
 const filterOldConcerts =
  concertsData?.filter(({ node }) => {
   const concertDate = new Date(node.concertInformation.date);
   return concertDate >= today;
  }) || [];

 function addOrganizationJsonLd() {
  return {
   __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Syracuse University Brass Ensemble",
    description:
     "A group of 35 professional-level brass and percussion musicians.",
    logo: "https://subrass.syr.edu/photos/1x1/photo.jpg",
    url: "https://subrass.syr.edu",
    telephone: "+1-315-443-3436",
    address: {
     "@type": "PostalAddress",
     streetAddress:
      "Room 1-014, Center for Science and Technology, Syracuse University",
     addressLocality: "Syracuse",
     addressRegion: "NY",
     postalCode: "13244",
     addressCountry: "US",
    },
    sameAs: [
     "https://www.facebook.com/subrass",
     "https://www.soundcloud.com/thesubrass",
     "https://www.youtube.com/thesubrass",
    ],
   }),
  };
 }

 return (
  <Layout>
   <SEO
    title="Syracuse University Brass Ensemble – Live Brass Music & Performances"
    description="Experience the Syracuse University Brass Ensemble live! See upcoming concerts and enjoy powerful brass music by professional musicians from SU, SUNY Upstate, and beyond."
   />
   <Head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={addOrganizationJsonLd()}
     key="organization-jsonld"
    />
   </Head>
   <Showcase />
   <Heading level="1" marginBottom="2" marginTop="2">
    Syracuse University Brass Ensemble – Live Brass Music
   </Heading>
   <ConcertInteractive concerts={filterOldConcerts} label="Upcoming Concerts" />
  </Layout>
 );
};

export default Home;
