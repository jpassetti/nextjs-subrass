import ConcertInteractive from "../components/concertInteractive";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Showcase from "../components/showcase";
import { getAllConcerts } from "../lib/api";

export const metadata = {
 title: "Syracuse University Brass Ensemble - Live Brass Music & Performances",
 description:
  "Experience the Syracuse University Brass Ensemble live! See upcoming concerts and enjoy powerful brass music by professional musicians from SU, SUNY Upstate, and beyond.",
};

export default async function HomePage() {
 const concertsData = await getAllConcerts();
 const today = new Date();
 const upcomingConcerts =
  concertsData?.filter(({ node }) => {
   const concertDate = new Date(node.concertInformation.date);
   return concertDate >= today;
  }) || [];

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
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
    }}
   />
   <Showcase />
  <Heading level={1} marginBottom="2" marginTop="2">
    Syracuse University Brass Ensemble - Live Brass Music
   </Heading>
   <ConcertInteractive concerts={upcomingConcerts} label="Upcoming Concerts" />
  </Layout>
 );
}
