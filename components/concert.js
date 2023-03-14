import Link from 'next/link'
import Head from 'next/head'
import classNames from 'classnames/bind';
import moment from 'moment';

import Heading from './heading'
import Paragraph from './paragraph'
import Row from './row'
import Col from './col'
import ListItem from './listitem'
import SEO from './SEO';
import * as styles from './concert.module.scss';

import { formatMonth, formatHour, formatDayOfTheWeek } from '../lib/utilities'
import { Fragment } from 'react';

let cx = classNames.bind(styles);

const Concert = ({ data, teaser = false }) => {
	let concertClasses = cx({
		concert: true,
	});
	const { title: concertTitle, slug, concertInformation } = data;
	const { date, venue } = concertInformation;
	const { title: venueTitle, venueInformation } = venue;
	const { street, city, state, zipCode, coordinates } = venueInformation;

	const month = moment(date).format("MMM");
	const monthDate = moment(date).format("D");
	const year = moment(date).format("YYYY");
	const dayOfTheWeek = moment(date).format("dddd");
	const formattedTime = moment(date).format("h:mm a");

	const formattedDate = `${dayOfTheWeek}, ${month}. ${monthDate}, ${year}`;

	function addProductJsonLd() {
		return {
__html: `{
	"@context": "https://schema.org/",
	"@type": "Event",
	"name": "${concertTitle}",
	"description": "Come see the Syracuse University Brass Ensemble play at the ${venueTitle} in ${city}, ${state.toUpperCase()}.",
	"startDate": "${date}",
	"endDate": "${moment(date).add(2, 'h')}"
	"eventStatus":"https://schema.org/EventScheduled","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode",
	"location":{
		"name": "${venueTitle}",
		"address":{
			"@type":"PostalAddress",
			"streetAddress": "${street}",
			"addressLocality":"New York",
			"addressRegion":"NY",
			"postalCode": "${zipCode}",
			"addressCountry":"US"
		},
		"@type":"Place"
	},
	"image": [
		"https://subrass.syr.edu/photos/1x1/photo.jpg",
		"https://subrass.syr.edu/photos/4x3/photo.jpg",
		"https://subrass.syr.edu/photos/16x9/photo.jpg"
	],
	"offers": {
        "@type": "Offer",
        "url": "",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "",
        "validFrom": ""
      },
	"isAccessibleForFree": true,
	"performer":{
		"@type":"PerformingGroup",
		"name":"Syracuse University Brass Ensemble"
	},
	"organizer":{
		"@type":"Organization",
		"name":"Syracuse University Brass Ensemble",
		"url":"https://subrass.syr.edu"
	}
}
`,
		};
	}

	if (teaser) return <Fragment>
		<Heading level="3" marginBottom="1">
			<Link href={`concerts/${slug}`}>
				<a>
					{concertTitle}
				</a>
			</Link>
		</Heading>
		<Paragraph marginBottom="4" diminish>{city}, {state.toUpperCase()}</Paragraph>
		<ListItem type="date" className="mb-0">
			{formattedDate}
		</ListItem>
		<ListItem type="time" className="mb-2">
			{formattedTime}
		</ListItem>
		<ListItem type="location">
			<Paragraph>{venueTitle}<br />
				{street}<br />
				{city}, {state.toUpperCase()} {zipCode}</Paragraph>
		</ListItem>
	</Fragment>;
	return (
		<Fragment>
			<SEO 
			title={concertTitle}
			url={`https://subrass.syr.edu/concerts/${slug}`}
			/>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={addProductJsonLd()}
					key="product-jsonld"
				/>
			</Head>
			<Heading level="4" marginBottom="4"><Link href="/concerts">
				<a>
					&laquo; Concerts
				</a></Link></Heading>
			<Heading level="1" marginBottom="2">{concertTitle}</Heading>
			<Paragraph marginBottom="4" diminish>{city}, {state.toUpperCase()}</Paragraph>
			<ListItem type="date" className="mb-0">
				{formattedDate}
			</ListItem>
			<ListItem type="time" className="mb-2">
				{formattedTime}
			</ListItem>
			<ListItem type="location">
				<Paragraph>{venueTitle}<br />
					{street}<br />
					{city}, {state.toUpperCase()} {zipCode}</Paragraph>
			</ListItem>
		</Fragment>
	)
}
export default Concert;
