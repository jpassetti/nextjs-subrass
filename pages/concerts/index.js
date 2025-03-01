import Layout from "../../components/layout";
import Heading from "../../components/heading";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllConcerts } from "../../lib/api";

import SEO from "../../components/SEO";
import ConcertInteractive from "../../components/concertInteractive";
import Head from "next/head";

export async function getStaticProps() {
 // Fetch necessary data for the blog post using params.id
 const concertsData = await getAllConcerts();
 return {
  props: {
   concertsData,
  },
  revalidate: 86400, // In seconds
 };
}

const Concerts = ({ concertsData }) => {
 const today = new Date();
 const filterOldConcerts =
  concertsData?.filter(({ node }) => {
   const concertDate = new Date(node.concertInformation.date);
   return concertDate >= today;
  }) || [];
 return (
  <Layout>
   <Head>
    <script type="application/ld+json">
     {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Syracuse University Brass Ensemble - Live Performance",
      startDate: filterOldConcerts.length
       ? filterOldConcerts[0].node.concertInformation.date
       : "",
      location: {
       "@type": "Place",
       name: "Hendricks Chapel",
       address: {
        "@type": "PostalAddress",
        streetAddress: "100 College Pl",
        addressLocality: "Syracuse",
        addressRegion: "NY",
        postalCode: "13244",
        addressCountry: "US",
       },
      },
      image: [
       "https://subrass.syr.edu/photos/1x1/photo.jpg",
       "https://subrass.syr.edu/photos/4x3/photo.jpg",
       "https://subrass.syr.edu/photos/16x9/photo.jpg",
      ],
      description:
       "Experience the Syracuse University Brass Ensemble live! See our upcoming concert dates and locations.",
      performer: {
       "@type": "MusicGroup",
       name: "Syracuse University Brass Ensemble",
      },
      organizer: {
       "@type": "Organization",
       name: "Syracuse University Brass Ensemble",
       url: "https://subrass.syr.edu",
      },
     })}
    </script>
   </Head>
   <SEO
    title="Upcoming Concerts – Syracuse University Brass Ensemble Live Performances"
    url="https://subrass.syr.edu/concerts"
    description="Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond."
   />
   <Section>
    <Heading level="1" marginTop="8" marginBottom="4">
     Upcoming Concerts – Live Brass Music
    </Heading>
    <Paragraph type="intro">
     Experience the powerful sound of brass live! The Syracuse University Brass
     Ensemble performs throughout the year with a diverse repertoire, from
     classical to contemporary. Check out our upcoming concerts and enjoy an
     evening of inspiring music.
    </Paragraph>
    <ConcertInteractive concerts={filterOldConcerts} label="2024-25" />
   </Section>
  </Layout>
 );
};
export default Concerts;
