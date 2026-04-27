import ConcertInteractive from "../../components/concertInteractive";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllConcerts } from "../../lib/api";

export const metadata = {
 title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
 description:
  "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
};

function getCurrentAcademicYear() {
 const now = new Date();
 const year = now.getFullYear();
 const month = now.getMonth();
 const startYear = month >= 6 ? year : year - 1;
 const endYear = String(startYear + 1).slice(-2);
 return `${startYear}-${endYear}`;
}

export default async function ConcertsPage() {
 const concertsData = await getAllConcerts();
 const currentAcademicYear = getCurrentAcademicYear();
 const now = new Date();

 const concertsByAcademicYear =
  concertsData?.reduce((accumulator, concert) => {
   const yearNode = concert.node.academicYears?.edges?.[0]?.node;
   if (!yearNode?.name) {
    return accumulator;
   }

   if (!accumulator[yearNode.name]) {
    accumulator[yearNode.name] = [];
   }

   accumulator[yearNode.name].push(concert);
   return accumulator;
  }, {}) || {};

 const currentYearConcerts = concertsByAcademicYear[currentAcademicYear] || [];
 const currentYearUpcomingConcerts = currentYearConcerts.filter(({ node }) => {
  return new Date(node.concertInformation.date) >= now;
 });

 const currentYearPastConcerts = currentYearConcerts
  .filter(({ node }) => {
   return new Date(node.concertInformation.date) < now;
  })
  .sort((a, b) => {
   return (
    new Date(b.node.concertInformation.date).getTime() -
    new Date(a.node.concertInformation.date).getTime()
   );
  });

 const previousAcademicYears = Object.keys(concertsByAcademicYear)
  .filter((yearLabel) => yearLabel !== currentAcademicYear)
  .sort((a, b) => {
   const startYearA = parseInt(a.split("-")[0], 10);
   const startYearB = parseInt(b.split("-")[0], 10);
   return startYearB - startYearA;
  });

 const hasAnyPastConcerts =
  currentYearPastConcerts.length > 0 || previousAcademicYears.length > 0;

 const nextConcertDate =
  currentYearUpcomingConcerts[0]?.node.concertInformation.date || "";

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
     __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Syracuse University Brass Ensemble - Live Performance",
      startDate: nextConcertDate,
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
     }),
    }}
   />
   <Section>
    <Heading level={1} marginTop="8" marginBottom="4">
     Upcoming Concerts - Live Brass Music
    </Heading>
    <Paragraph type="intro">
     Experience the powerful sound of brass live! The Syracuse University Brass
     Ensemble performs throughout the year with a diverse repertoire, from
     classical to contemporary. Check out our upcoming concerts and enjoy an
     evening of inspiring music.
    </Paragraph>

    <Heading level={2} marginTop="6" marginBottom="2">
     Upcoming Concerts
    </Heading>
    {currentYearUpcomingConcerts.length ? (
     <ConcertInteractive
      concerts={currentYearUpcomingConcerts}
      label={currentAcademicYear}
     />
    ) : (
     <Paragraph diminish>No upcoming concerts are currently scheduled.</Paragraph>
    )}

    {hasAnyPastConcerts ? (
    <Heading level={2} marginTop="8" marginBottom="2">
      Past Concerts
     </Heading>
    ) : null}

    {currentYearPastConcerts.length ? (
     <ConcertInteractive
      concerts={currentYearPastConcerts}
      label={currentAcademicYear}
      listOnly
     />
    ) : null}

    {previousAcademicYears.map((yearLabel) => {
     return (
      <ConcertInteractive
       key={yearLabel}
       concerts={concertsByAcademicYear[yearLabel]}
       label={yearLabel}
       listOnly
      />
     );
    })}
   </Section>
  </Layout>
 );
}
