import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Heading from "../../../../components/heading";
import Layout from "../../../../components/layout";
import Paragraph from "../../../../components/paragraph";
import Section from "../../../../components/section";
import { getAllConcerts } from "../../../../lib/api";
import { getConcertDate, getConcertPagePath, getVenuePagePath, slugifyVenueName } from "../../../../lib/utilities";
import styles from "./venue.module.scss";

const HENDRICKS_CHAPEL_SLUG = "hendricks-chapel";
const HENDRICKS_CHAPEL_ADDRESS = {
 street: "121 Crouse Drive",
 city: "Syracuse",
 state: "NY",
 zipCode: "13244",
};

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
 const description =
  venueSlug === HENDRICKS_CHAPEL_SLUG
   ? "Plan your visit to Hendricks Chapel, the historic spiritual heart of Syracuse University and a landmark concert venue for the Syracuse University Brass Ensemble."
   : `Concert history and upcoming performances at ${venueTitle} by the Syracuse University Brass Ensemble.`;
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
 const isHendricksChapel = venueSlug === HENDRICKS_CHAPEL_SLUG;
 const displayAddress = isHendricksChapel ? HENDRICKS_CHAPEL_ADDRESS : venueInfo;
 const featuredImage = venue.featuredImage?.node;
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
   streetAddress: displayAddress.street,
   addressLocality: displayAddress.city,
   addressRegion: displayAddress.state?.toUpperCase?.() || displayAddress.state,
   postalCode: displayAddress.zipCode,
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
  ...(isHendricksChapel
   ? {
      description: "The historic spiritual heart of Syracuse University and a welcoming home for music, reflection, learning, and community.",
      maximumAttendeeCapacity: 1000,
      telephone: "+1-315-443-2901",
      email: "chapel@syr.edu",
      sameAs: "https://chapel.syracuse.edu/",
     }
   : {}),
  event: venueData.concerts.slice(0, 20).map((concert) => ({
   "@type": "MusicEvent",
   name: concert?.node?.title,
   startDate: concert?.node ? getConcertDate(concert.node) : undefined,
   url: concert?.node ? `https://subrass.syr.edu${getConcertPagePath(concert.node)}` : undefined,
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
     {displayAddress.street}
     <br />
     {displayAddress.city}, {displayAddress.state?.toUpperCase?.() || displayAddress.state} {displayAddress.zipCode}
    </Paragraph>

    {isHendricksChapel ? (
     <div className={styles.venueDetails}>
      {featuredImage?.sourceUrl ? (
       <figure className={styles.showcase}>
        <Image
         src={featuredImage.sourceUrl}
         alt={featuredImage.altText || "Hendricks Chapel at Syracuse University"}
         width={featuredImage.mediaDetails?.width || 1600}
         height={featuredImage.mediaDetails?.height || 900}
         sizes="(min-width: 1200px) 72rem, 100vw"
         className={styles.showcaseImage}
         priority
        />
       </figure>
      ) : null}
      <div className={styles.introduction}>
       <p className={styles.eyebrow}>The spiritual heart of Syracuse University</p>
       <p className={styles.lede}>
        Hendricks Chapel is a historic, welcoming home for music, reflection, learning, and community at the center of the Syracuse University campus.
       </p>
       <p>
        Opened in 1930, the chapel was established as a home for all faiths and a place for all people. Its landmark Main Chapel brings audiences together for concerts, ceremonies, lectures, and observances throughout the year, offering an inspiring setting for the Syracuse University Brass Ensemble and its guests.
       </p>
      </div>

      <div className={styles.facts} aria-label="Hendricks Chapel at a glance">
       <div><span>Main Chapel</span><strong>1,000-seat capacity</strong></div>
       <div><span>Visitor contact</span><strong><a href="tel:+13154432901">315-443-2901</a></strong></div>
       <div><span>Email</span><strong><a href="mailto:chapel@syr.edu">chapel@syr.edu</a></strong></div>
      </div>

      <section className={styles.visitSection}>
       <Heading level={2} marginTop="0" marginBottom="2">Plan Your Visit</Heading>
       <div className={styles.visitGrid}>
        <article>
         <h3>Getting Here and Parking</h3>
         <p>Hendricks Chapel faces the Quad at 121 Crouse Drive. Parking is free. Visitor parking may be available at Irving Garage and University Avenue Garage. Availability may vary for major events, so allow extra time before a performance.</p>
         <a href="https://parking.syr.edu/visitors-to-campus/daily-campus-visitor/" target="_blank" rel="noopener noreferrer">Review visitor parking information</a>
        </article>
        <article>
         <h3>Accessibility</h3>
         <p>The accessible entrance is beneath the main stairs on the Quad-facing side nearest the Quad parking lot. An elevator serves the ground, lower, and main levels, but not the balcony. Wheelchair and limited-mobility seating are available.</p>
         <a href="https://chapel.syracuse.edu/reservations/accessibility/" target="_blank" rel="noopener noreferrer">View complete accessibility details</a>
        </article>
       </div>
       <div className={styles.accessNote}>
        <h3>Requesting accommodations</h3>
        <p>For accessible parking arrangements, wheelchair availability, CART, ASL interpretation, or other accommodations, contact Hendricks Chapel in advance at <a href="tel:+13154432901">315-443-2901</a> or <a href="mailto:chapel@syr.edu">chapel@syr.edu</a>.</p>
       </div>
      </section>

     </div>
    ) : null}

    <Heading level={2} marginTop="6" marginBottom="2">
     Upcoming Concerts
    </Heading>
    {upcoming.length ? (
     upcoming.map((concert) => (
       <Paragraph key={concert.node.uri || concert.node.title} marginBottom="2">
        <Link href={getConcertPagePath(concert.node)}>{concert.node.title}</Link>
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
         <Link href={getConcertPagePath(concert.node)}>{concert.node.title}</Link>
       </Paragraph>
      ))
    ) : (
     <Paragraph diminish>No past concerts found for this venue.</Paragraph>
    )}
   </Section>
  </Layout>
 );
}
