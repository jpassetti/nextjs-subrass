import Link from 'next/link'
import classNames from 'classnames/bind';
import moment from 'moment';

import Heading from './heading'
import Paragraph from './paragraph'
import Row from './row'
import Col from './col'
import ListItem from './listitem'
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

	const formattedDate = `${ dayOfTheWeek }, ${ month }. ${ monthDate }, ${ year }`;

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
		<>
			<Heading level="4" marginBottom="4"><Link href="/concerts">
				<a>
					Concerts
				</a></Link></Heading>
			<Heading level="1" marginBottom="2">{concertTitle}</Heading>
			<Heading level="3" marginBottom="2">{formattedDate}<br />
				{formattedTime}
			</Heading>
			<Paragraph>
				<strong>{venueTitle}</strong><br />
				{street}<br />
				{city}, {state.toUpperCase()} {zipCode}
			</Paragraph>
		</>
	)
}
export default Concert;
