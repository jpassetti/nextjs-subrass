// @ts-nocheck
import moment from 'moment';

import Col from "./col";
import Heading from "./heading";
import Paragraph from "./paragraph";
import Row from "./row";

import { getAPStyleFormattedDate, getAPStyleFormattedTime } from '../lib/utilities';
import Link from 'next/link';

const ConcertListItem = ({data, teaser}) => {
    const { title: concertTitle, slug, uri, concertInformation } = data;
	const { date, venue } = concertInformation;
	const { title: venueTitle, venueInformation } = venue;
	const { street, city, state, zipCode, coordinates } = venueInformation;

    const formattedDate = getAPStyleFormattedDate(date, moment);
    const formattedTime = getAPStyleFormattedTime(date, moment);
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
            <Link href={uri}>View more</Link>

            </Paragraph>
        </Col>
    </Row>
}
export default ConcertListItem;