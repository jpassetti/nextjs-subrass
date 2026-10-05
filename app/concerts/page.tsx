import ConcertInteractive from "../../components/concertInteractive";
import type { Metadata } from "next";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllConcerts } from "../../lib/api";
import { getConcertDate, getConcertPagePath } from "../../lib/utilities";

export const metadata: Metadata = {
 title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
 description:
  "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
 alternates: {
  canonical: "/concerts",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu/concerts",
  title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
  description:
   "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
  images: [
   {
    url: "/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg",
    width: 1200,
    height: 630,
    alt: "Syracuse University Brass Ensemble",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
  description:
   "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
  images: ["/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg"],
 },
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

 const nextConcertDate = currentYearUpcomingConcerts[0]?.node
  ? getConcertDate(currentYearUpcomingConcerts[0].node)
  : "";

 const upcomingEventList = currentYearUpcomingConcerts.slice(0, 20).map(({ node }, index) => {
  const venue = node?.concertInformation?.venue;
  const venueAddress = venue?.venueInformation;

  return {
   "@type": "ListItem",
   position: index + 1,
   item: {
    "@type": "MusicEvent",
    name: node?.title,
   startDate: getConcertDate(node),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `https://subrass.syr.edu${getConcertPagePath(node)}`,
    location: {
     "@type": "Place",
     name: venue?.title,
     address: {
      "@type": "PostalAddress",
      streetAddress: venueAddress?.street,
      addressLocality: venueAddress?.city,
      addressRegion: venueAddress?.state?.toUpperCase?.() || venueAddress?.state,
      postalCode: venueAddress?.zipCode,
      addressCountry: "US",
     },
    },
   },
  };
 });

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
     __html: JSON.stringify({
      "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Syracuse University Brass Ensemble Upcoming Concerts",
    description:
     "Experience the Syracuse University Brass Ensemble live. Explore upcoming concert dates, venues, and details.",
    url: "https://subrass.syr.edu/concerts",
    numberOfItems: upcomingEventList.length,
    itemListElement: upcomingEventList,
    performer: {
     "@type": "MusicGroup",
     name: "Syracuse University Brass Ensemble",
     url: "https://subrass.syr.edu",
    },
    startDate: nextConcertDate || undefined,
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
