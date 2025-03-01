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

import { getAPStyleFormattedMonth, getFormattedAMPM } from "../lib/utilities";

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
 const { street, city, state, zipCode, coordinates } = venueInformation;

 const month = parseInt(moment(date).format("M"));
 const monthDate = moment(date).format("D");
 const year = moment(date).format("YYYY");
 const dayOfTheWeek = moment(date).format("dddd");
 const formattedTime = moment(date).format("h:mm");
 const formattedTimeAMPM = getFormattedAMPM(moment(date).format("a"));

 const formattedDate = `${dayOfTheWeek}, ${getAPStyleFormattedMonth(
  month
 )} ${monthDate}, ${year}`;

 function addProductJsonLd() {
  return {
   __html: `{
	"@context": "https://schema.org",
	"@type": "Event",
	"name": "${concertTitle}",
	"description": "${
  excerpt ||
  `Come see the Syracuse University Brass Ensemble play at the ${venueTitle} in ${city}, ${state.toUpperCase()}.`
 }",
	"startDate": "${moment(date).format()}",
	"endDate": "${moment(date).add(2, "h").format()}",
	"eventStatus": "https://schema.org/EventScheduled",
	"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
	"location": {
		"name": "${venueTitle}",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "${street}",
			"addressLocality": "${city}",
			"addressRegion": "NY",
			"postalCode": "${zipCode}",
			"addressCountry": "US"
		},
		"@type": "Place"
	},
	"image": [
		"https://subrass.syr.edu/photos/1x1/photo.jpg",
		"https://subrass.syr.edu/photos/4x3/photo.jpg",
		"https://subrass.syr.edu/photos/16x9/photo.jpg"
	],
	"offers": {
        "@type": "Offer",
        "url": "${`https://subrass.syr.edu/concerts/${slug}`}",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "${moment(date).subtract(2, "months").format()}"
    },
	"isAccessibleForFree": true,
	"performer": {
		"@type": "PerformingGroup",
		"name": "Syracuse University Brass Ensemble"
	},
	"organizer": {
		"@type": "Organization",
		"name": "Syracuse University Brass Ensemble",
		"url": "https://subrass.syr.edu"
	}
}`,
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

     <ListItem type="date" className="mb-0">
      {formattedDate}
     </ListItem>
     <ListItem type="time" className="mb-2">
      {formattedTime} {formattedTimeAMPM}
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
    </Card.Body>
   </Fragment>
  );
 return (
  <Fragment>
   <SEO
    title={`${concertTitle} - Live Concert by Syracuse University Brass Ensemble`}
    url={`https://subrass.syr.edu/${uri}`}
    description={
     excerpt ||
     `Come see the Syracuse University Brass Ensemble play at the ${venueTitle} in ${city}, ${state.toUpperCase()}, on ${moment(
      date
     ).format("dddd, MMMM D, YYYY, h:mm a")}.`
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
    <div style={{ marginBottom: "1rem" }}>
     <Image
      src={featuredImage.node.sourceUrl}
      alt={featuredImage.node.altText}
      width={featuredImage.node.mediaDetails.width}
      height={featuredImage.node.mediaDetails.height}
      layout="responsive"
     />
    </div>
   ) : venueImage ? (
    <div style={{ marginBottom: "1rem" }}>
     <Image
      src={venueImage.node.sourceUrl}
      alt={venueImage.node.altText}
      width={venueImage.node.mediaDetails.width}
      height={venueImage.node.mediaDetails.height}
      layout="responsive"
     />
    </div>
   ) : null}

   <Heading level="1" marginBottom="2">
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
     {formattedTime} {formattedTimeAMPM}
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
