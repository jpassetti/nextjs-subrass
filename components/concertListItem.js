import moment from 'moment';

import Col from "./col";
import Heading from "./heading";
import Paragraph from "./paragraph";
import Row from "./row";

import { getAPStyleFormattedMonth, getFormattedAMPM } from '../lib/utilities';
import Link from 'next/link';

const ConcertListItem = ({data, teaser}) => {
    const { title: concertTitle, slug, uri, concertInformation } = data;
	const { date, venue } = concertInformation;
	const { title: venueTitle, venueInformation } = venue;
	const { street, city, state, zipCode, coordinates } = venueInformation;

	const month = parseInt(moment(date).format("M"));
	const monthDate = moment(date).format("D");
	const year = moment(date).format("YYYY");
	const dayOfTheWeek = moment(date).format("dddd");
	const formattedTime = moment(date).format("h:mm");
	const formattedTimeAMPM = getFormattedAMPM(moment(date).format("a"));
	

	const formattedDate = `${dayOfTheWeek}, ${getAPStyleFormattedMonth(month)} ${monthDate}, ${year}`;
    return <Row borderBottom={1}>
        <Col md={4}>
            <Paragraph marginBottom={0}>
                {formattedDate}<br />
                {formattedTime} {formattedTimeAMPM}
            </Paragraph>
        </Col>
        <Col md={6}>
            <Heading level={4}>{concertTitle}</Heading>
            <Paragraph diminish marginBottom={0}>{city}, {state.toUpperCase()}</Paragraph>
        </Col>
        <Col md={2}>
            <Paragraph marginBottom={0}>
            <Link href={uri}>
				<a>
					View more
				</a>
			</Link>

            </Paragraph>
        </Col>
    </Row>
}
export default ConcertListItem;