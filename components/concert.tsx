// @ts-nocheck
import { Fragment } from "react";
import moment from "moment-timezone";

import Card from "./card";
import DetailLabel from "./detail-label";
import EventTools from "./event-tools";
import Heading from "./heading";
import Image from "next/image";
import Link from "next/link";
import List from "./list";
import Paragraph from "./paragraph";
import ListItem from "./listitem";
import {
 getAPStyleFormattedDate,
 getAPStyleFormattedTime,
 getConcertDate,
 getConcertPagePath,
 getVenuePagePath,
} from "../lib/utilities";

import styles from "./concert.module.scss";

const Concert = ({ data, teaser = false, previousConcert = null, nextConcert = null }) => {
 const {
  title: concertTitle,
  slug,
  excerpt,
  uri,
  content,
  concertInformation,
  featuredImage,
 } = data;
 const { date, venue } = concertInformation;
 const {
  title: venueTitle,
  venueInformation,
  featuredImage: venueImage,
 } = venue;
 const { street, city, state, zipCode, coordinates } = venueInformation;

 const displayDate = getConcertDate(data);
 const formattedDate = getAPStyleFormattedDate(displayDate, moment);
 const formattedTime = getAPStyleFormattedTime(displayDate, moment);
 const concertPath = getConcertPagePath(data);
 const venuePath = getVenuePagePath(venueTitle);
 const venueUrl = `https://subrass.syr.edu${venuePath}`;
 const heroImage = featuredImage?.node || venueImage?.node;

 function addProductJsonLd() {
  return {
   __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: concertTitle,
    description:
     excerpt ||
     `See the Syracuse University Brass Ensemble live at ${venueTitle} in ${city}, ${state.toUpperCase()} on ${formattedDate}.`,
    startDate: moment(displayDate)
     .tz("America/New_York")
     .format("YYYY-MM-DDTHH:mm:ssZ"),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
     "@type": "Place",
      "@id": venueUrl,
      url: venueUrl,
     name: venueTitle,
      geo:
      coordinates?.latitude && coordinates?.longitude
       ? {
         "@type": "GeoCoordinates",
         latitude: coordinates.latitude,
         longitude: coordinates.longitude,
        }
       : undefined,
     address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      addressRegion: state.toUpperCase(),
      postalCode: zipCode,
      addressCountry: "US",
     },
    },
    image:
     featuredImage?.node.sourceUrl ||
     venueImage?.node.sourceUrl ||
     "https://subrass.syr.edu/images/social/default-concert.jpg",
    url: `https://subrass.syr.edu${concertPath}`,
    isAccessibleForFree: true,
    offers: {
     "@type": "Offer",
     url: `https://subrass.syr.edu${concertPath}`,
     price: "0",
     priceCurrency: "USD",
     availability: "https://schema.org/InStock",
    },
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
  };
 }

 if (teaser)
  return (
   <Fragment>
    <Card.CoverImage image={featuredImage || venueImage || null} />
    <Card.Body>
     <Heading level="3" marginBottom="1">
        <Link href={concertPath}>{concertTitle}</Link>
     </Heading>
     <Paragraph marginBottom="4" diminish>
      {city}, {state.toUpperCase()}
     </Paragraph>
     <List>
      <ListItem type="date">{formattedDate}</ListItem>
      <ListItem type="time">{formattedTime}</ListItem>
      <ListItem type="location">
       <Paragraph>
        <Link href={venuePath}>{venueTitle}</Link>
        <br />
        {street}
        <br />
        {city}, {state.toUpperCase()} {zipCode}
       </Paragraph>
      </ListItem>
     </List>
    </Card.Body>
   </Fragment>
  );
 return (
  <Fragment>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={addProductJsonLd()}
    />
   <div className={styles.concertPage}>
   <div className={styles.hero}>
    {heroImage ? (
     <div className={styles.heroVisual}>
      <Image
       src={heroImage.sourceUrl}
       alt={heroImage.altText || `${concertTitle} at ${venueTitle}`}
       fill
       sizes="(min-width: 1200px) 72rem, 100vw"
       className={styles.heroImage}
       priority
      />
      <div className={styles.heroShade} aria-hidden="true"></div>
     </div>
    ) : null}
    <div className={styles.heroContent}>
     <Link className={styles.backLink} href="/concerts">&larr; Concerts</Link>
     <h1>{concertTitle}</h1>
    </div>
    <dl className={`${styles.heroDetails} ${!content ? styles.heroDetailsFlush : ""}`}>
     <div>
      <DetailLabel>Date</DetailLabel>
      <dd>{formattedDate}</dd>
     </div>
     <div>
      <DetailLabel>Time</DetailLabel>
      <dd>{formattedTime}</dd>
     </div>
     <div>
      <DetailLabel>Location</DetailLabel>
      <dd>
       <Link href={venuePath}>{venueTitle}</Link><br />
       {street}<br />
       {city}, {state.toUpperCase()} {zipCode}
      </dd>
     </div>
    </dl>
   </div>
   <div className={`${styles.concertBody} ${!content ? styles.noContent : ""}`}>
    {content && (
     <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
     />
    )}
    <EventTools title={concertTitle} start={displayDate}
     location={`${venueTitle}, ${street}, ${city}, ${state.toUpperCase()} ${zipCode}`}
     url={`https://subrass.syr.edu${concertPath}`} theme="dark" />
    {(previousConcert || nextConcert) && (
     <nav className={styles.concertNavigation} aria-label="Adjacent concerts">
      {previousConcert && (
       <Link className={styles.concertNavigationCard} href={getConcertPagePath(previousConcert)}>
        {(previousConcert.concertInformation?.venue?.featuredImage?.node || previousConcert.featuredImage?.node) && (
         <Image src={(previousConcert.concertInformation?.venue?.featuredImage?.node || previousConcert.featuredImage.node).sourceUrl} alt="" fill sizes="(min-width: 700px) 36rem, 100vw" className={styles.concertNavigationImage} />
        )}
        <span className={styles.concertNavigationShade} aria-hidden="true"></span>
        <span className={styles.concertNavigationContent}>
         <span className={styles.concertNavigationDirection}>&larr; Previous concert</span>
         <strong>{previousConcert.title}</strong>
         <span className={styles.concertNavigationMeta}>{getAPStyleFormattedDate(getConcertDate(previousConcert), moment)} · {previousConcert.concertInformation?.venue?.title}</span>
        </span>
       </Link>
      )}
      {nextConcert && (
       <Link className={`${styles.concertNavigationCard} ${styles.nextConcert}`} href={getConcertPagePath(nextConcert)}>
        {(nextConcert.concertInformation?.venue?.featuredImage?.node || nextConcert.featuredImage?.node) && (
         <Image src={(nextConcert.concertInformation?.venue?.featuredImage?.node || nextConcert.featuredImage.node).sourceUrl} alt="" fill sizes="(min-width: 700px) 36rem, 100vw" className={styles.concertNavigationImage} />
        )}
        <span className={styles.concertNavigationShade} aria-hidden="true"></span>
        <span className={styles.concertNavigationContent}>
         <span className={styles.concertNavigationDirection}>Next concert &rarr;</span>
         <strong>{nextConcert.title}</strong>
         <span className={styles.concertNavigationMeta}>{getAPStyleFormattedDate(getConcertDate(nextConcert), moment)} · {nextConcert.concertInformation?.venue?.title}</span>
        </span>
       </Link>
      )}
     </nav>
    )}
   </div>
   </div>
  </Fragment>
 );
};
export default Concert;
