// @ts-nocheck
import moment from 'moment';

import Col from "./col";
import Heading from "./heading";
import Paragraph from "./paragraph";
import Row from "./row";

import { getAPStyleFormattedDate, getAPStyleFormattedTime, getConcertDate, getConcertPagePath } from '../lib/utilities';
import Link from 'next/link';

const ConcertListItem = ({data, teaser}) => {
    const { title: concertTitle, slug, uri, concertInformation } = data;
	const { date, venue } = concertInformation;
	const { title: venueTitle, venueInformation } = venue;
	const { street, city, state, zipCode, coordinates } = venueInformation;

    const displayDate = getConcertDate(data);
    const formattedDate = getAPStyleFormattedDate(displayDate, moment);
    const formattedTime = getAPStyleFormattedTime(displayDate, moment);
    const concertPath = getConcertPagePath(data);
    return <Row borderBottom={1}>
        <Col md={4}>
            <Paragraph marginBottom={0}>
                {formattedDate}<br />
                {formattedTime}
            </Paragraph>
        </Col>
        <Col md={6}>
            <Heading level={4}>{concertTitle}</Heading>
            <Paragraph diminish marginBottom={0}>{city}, {state.toUpperCase()}</Paragraph>
        </Col>
        <Col md={2}>
            <Paragraph marginBottom={0}>
            <Link href={concertPath}>View more</Link>

            </Paragraph>
        </Col>
    </Row>
}
export default ConcertListItem;
