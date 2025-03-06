import { Fragment } from "react";
import moment from "moment";

import Card from "./card";
import Head from "next/head";
import Heading from "./heading";
import Image from "next/image";
import Link from "next/link";
import List from "./list";
import Paragraph from "./paragraph";
import ListItem from "./listitem";
import SEO from "./SEO";

import styles from "./concert.module.scss";

const Concert = ({ data, teaser = false }) => {
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
 const { street, city, state, zipCode } = venueInformation;

 const formattedDate = moment(date).format("dddd, MMMM D, YYYY");
 const formattedTime = moment(date).format("h:mm A");

 function addProductJsonLd() {
  return {
   __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: concertTitle,
    description:
     excerpt ||
     `See the Syracuse University Brass Ensemble live at ${venueTitle} in ${city}, ${state.toUpperCase()} on ${formattedDate}.`,
    startDate: moment(date)
     .tz("America/New_York")
     .format("YYYY-MM-DDTHH:mm:ssZ"),
    endDate: moment(date)
     .tz("America/New_York")
     .add(2, "h")
     .format("YYYY-MM-DDTHH:mm:ssZ"),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
     "@type": "Place",
     name: venueTitle,
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
    isAccessibleForFree: true,
    performer: {
     "@type": "PerformingGroup",
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
      <Link href={uri}>
       <a>{concertTitle}</a>
      </Link>
     </Heading>
     <Paragraph marginBottom="4" diminish>
      {city}, {state.toUpperCase()}
     </Paragraph>
     <List>
      <ListItem type="date">{formattedDate}</ListItem>
      <ListItem type="time">{formattedTime}</ListItem>
      <ListItem type="location">
       <Paragraph>
        {venueTitle}
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
   <SEO
    title={`${concertTitle} - Live Concert by Syracuse University Brass Ensemble`}
    url={`https://subrass.syr.edu/concerts/${slug}`}
    description={
     excerpt ||
     `Join the Syracuse University Brass Ensemble live at ${venueTitle} in ${city}, ${state.toUpperCase()} on ${formattedDate}. Enjoy an evening of inspiring brass music!`
    }
   />
   <Head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={addProductJsonLd()}
     key="product-jsonld"
    />
   </Head>
   <Heading level="4" marginBottom="4">
    <Link href="/concerts">
     <a>&laquo; Concerts</a>
    </Link>
   </Heading>
   {featuredImage ? (
    <Image
     src={featuredImage.node.sourceUrl}
     alt={featuredImage.node.altText || `${concertTitle} at ${venueTitle}`}
     width={featuredImage.node.mediaDetails.width || 1200}
     height={featuredImage.node.mediaDetails.height || 630}
     layout="responsive"
     priority
    />
   ) : venueImage ? (
    <Image
     src={venueImage.node.sourceUrl}
     alt={venueImage.node.altText || `Venue: ${venueTitle}`}
     width={venueImage.node.mediaDetails.width || 1200}
     height={venueImage.node.mediaDetails.height || 630}
     layout="responsive"
     priority
    />
   ) : null}
   <Heading level="1" marginBottom="2" marginTop={1}>
    {concertTitle}
   </Heading>
   <Paragraph marginBottom="4" diminish>
    {city}, {state.toUpperCase()}
   </Paragraph>
   <List>
    <ListItem type="date" className="mb-0">
     {formattedDate}
    </ListItem>
    <ListItem type="time" className="mb-2">
     {formattedTime}
    </ListItem>
    <ListItem type="location">
     <Paragraph>
      {venueTitle}
      <br />
      {street}
      <br />
      {city}, {state.toUpperCase()} {zipCode}
     </Paragraph>
    </ListItem>
   </List>

   {content && (
    <div
     className={styles.content}
     dangerouslySetInnerHTML={{ __html: content }}
    />
   )}
  </Fragment>
 );
};
export default Concert;
