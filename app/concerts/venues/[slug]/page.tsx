import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Heading from "../../../../components/heading";
import Layout from "../../../../components/layout";
import Paragraph from "../../../../components/paragraph";
import Section from "../../../../components/section";
import { getAllConcerts } from "../../../../lib/api";
import { getVenuePagePath, slugifyVenueName } from "../../../../lib/utilities";

export const revalidate = 86400;

function getVenueFromConcert(concert) {
 return concert?.node?.concertInformation?.venue || null;
}

function sortByDate(concertA, concertB) {
 const aTime = new Date(concertA?.node?.concertInformation?.date || 0).getTime();
 const bTime = new Date(concertB?.node?.concertInformation?.date || 0).getTime();
 return aTime - bTime;
}

async function getVenueDataBySlug(venueSlug) {
 const concerts = await getAllConcerts();
 const byVenueSlug = concerts.filter((concert) => {
  const venue = getVenueFromConcert(concert);
  return slugifyVenueName(venue?.title) === venueSlug;
 });

 if (!byVenueSlug.length) {
  return null;
 }

 const sortedConcerts = [...byVenueSlug].sort(sortByDate);
 const venue = getVenueFromConcert(sortedConcerts[0]);

 return {
  venue,
  concerts: sortedConcerts,
 };
}

export async function generateStaticParams() {
 const concerts = await getAllConcerts();
 const slugSet = new Set<string>();

 concerts.forEach((concert) => {
  const venue = getVenueFromConcert(concert);
  const slug = slugifyVenueName(venue?.title);
  if (slug) {
   slugSet.add(slug);
  }
 });

 return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
 const resolvedParams = await params;
 const venueSlug = resolvedParams?.slug;

 if (!venueSlug) {
  return {
   title: "Concert Venues - Syracuse University Brass Ensemble",
   alternates: {
    canonical: "/concerts",
   },
  };
 }

 const venueData = await getVenueDataBySlug(venueSlug);

 if (!venueData?.venue) {
  return {
   title: "Venue Not Found",
   robots: {
    index: false,
    follow: false,
   },
  };
 }

 const venueTitle = venueData.venue.title || "Concert Venue";
 const canonicalPath = getVenuePagePath(venueTitle);
 const canonicalUrl = `https://subrass.syr.edu${canonicalPath}`;
 const description = `Concert history and upcoming performances at ${venueTitle} by the Syracuse University Brass Ensemble.`;
 const socialImage =
  venueData.venue?.featuredImage?.node?.sourceUrl ||
  "https://subrass.syr.edu/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg";

 return {
  title: `${venueTitle} Concerts - Syracuse University Brass Ensemble`,
  description,
  alternates: {
   canonical: canonicalUrl,
  },
  openGraph: {
   type: "website",
   url: canonicalUrl,
   title: `${venueTitle} Concerts - Syracuse University Brass Ensemble`,
   description,
   images: [
    {
     url: socialImage,
     alt: venueTitle,
    },
   ],
  },
  twitter: {
   card: "summary_large_image",
   title: `${venueTitle} Concerts - Syracuse University Brass Ensemble`,
   description,
   images: [socialImage],
  },
 };
}

export default async function VenuePage({ params }) {
 const resolvedParams = await params;
 const venueSlug = resolvedParams?.slug;

 if (!venueSlug) {
  notFound();
 }

 const venueData = await getVenueDataBySlug(venueSlug);

 if (!venueData?.venue) {
  notFound();
 }

 const now = new Date();
 const venue = venueData.venue;
 const venueTitle = venue.title || "Concert Venue";
 const venueInfo = venue.venueInformation || {};
 const canonicalPath = getVenuePagePath(venueTitle);
 const canonicalUrl = `https://subrass.syr.edu${canonicalPath}`;

 const upcoming = venueData.concerts.filter((concert) => {
  return new Date(concert?.node?.concertInformation?.date || 0) >= now;
 });
 const past = venueData.concerts.filter((concert) => {
  return new Date(concert?.node?.concertInformation?.date || 0) < now;
 });

 const schema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": canonicalUrl,
  url: canonicalUrl,
  name: venueTitle,
  address: {
   "@type": "PostalAddress",
   streetAddress: venueInfo.street,
   addressLocality: venueInfo.city,
   addressRegion: venueInfo.state?.toUpperCase?.() || venueInfo.state,
   postalCode: venueInfo.zipCode,
   addressCountry: "US",
  },
  geo:
   venueInfo.coordinates?.latitude && venueInfo.coordinates?.longitude
    ? {
       "@type": "GeoCoordinates",
       latitude: venueInfo.coordinates.latitude,
       longitude: venueInfo.coordinates.longitude,
      }
    : undefined,
  event: venueData.concerts.slice(0, 20).map((concert) => ({
   "@type": "MusicEvent",
   name: concert?.node?.title,
   startDate: concert?.node?.concertInformation?.date,
   url: concert?.node?.uri ? `https://subrass.syr.edu${concert.node.uri}` : undefined,
   performer: {
    "@type": "MusicGroup",
    name: "Syracuse University Brass Ensemble",
    url: "https://subrass.syr.edu",
   },
  })),
 };

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
    name: "Concerts",
    item: "https://subrass.syr.edu/concerts",
   },
   {
    "@type": "ListItem",
    position: 3,
    name: venueTitle,
    item: canonicalUrl,
   },
  ],
 };

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
   />
   <Section>
    <Heading level={1} marginTop="8" marginBottom="2">
     {venueTitle}
    </Heading>
    <Paragraph diminish>
     {venueInfo.street}
     <br />
     {venueInfo.city}, {venueInfo.state?.toUpperCase?.() || venueInfo.state} {venueInfo.zipCode}
    </Paragraph>

    <Heading level={2} marginTop="6" marginBottom="2">
     Upcoming Concerts
    </Heading>
    {upcoming.length ? (
     upcoming.map((concert) => (
       <Paragraph key={concert.node.uri || concert.node.title} marginBottom="2">
        <Link href={concert.node.uri}>{concert.node.title}</Link>
      </Paragraph>
     ))
    ) : (
     <Paragraph diminish>No upcoming concerts are currently scheduled at this venue.</Paragraph>
    )}

    <Heading level={2} marginTop="6" marginBottom="2">
     Past Concerts
    </Heading>
    {past.length ? (
     past
      .slice()
      .reverse()
      .map((concert) => (
        <Paragraph key={concert.node.uri || concert.node.title} marginBottom="2">
         <Link href={concert.node.uri}>{concert.node.title}</Link>
       </Paragraph>
      ))
    ) : (
     <Paragraph diminish>No past concerts found for this venue.</Paragraph>
    )}
   </Section>
  </Layout>
 );
}
