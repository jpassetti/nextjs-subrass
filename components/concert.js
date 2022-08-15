import Link from 'next/link'
import classNames from 'classnames/bind';

import Heading from './heading'
import Paragraph from './paragraph'
import Row from './row'
import Col from './col'
import ListItem from './listitem'
import * as styles from './concert.module.scss';

let cx = classNames.bind(styles);

const Concert = ({ data, teaser = false }) => {
	let concertClasses = cx({
		concert: true,
	});
	const {date, time, title, location} = data;
	const {month, numeral, day, year} = date;
	const {name, street, city, state, zip} = location;

	if (teaser) return <Row className={concertClasses}>
		<Col xs="3" sm="2">
			<span className={styles.month}>{data.date.month}</span>
			<span className={styles.numeral}>{data.date.numeral}</span>
			
		</Col>
		<Col xs="9" sm="10">
			<Row>
				<Col xs="9" sm="6" md="5">
					<Heading level="3" marginBottom="1">
						<Link href={`concerts/${data.slug}`}>
						<a>
							{data.title}
						</a>
						</Link>
					</Heading>
					<Paragraph>{city}, {state}</Paragraph>
				</Col>
				<Col sm="6" md="7">
					<ListItem type="date" className="mb-0">
						{day}, {month}. {numeral}, {year}
					</ListItem>
					<ListItem type="time" className="mb-2">
						{time}
					</ListItem>
					<ListItem type="location">
						<Paragraph>{name}<br />
						{street}<br />
						{city}, {state} {zip}</Paragraph>
					</ListItem>
				</Col>
			</Row>
		</Col>
	</Row>;
	return (
		<>
			<Heading level="4" className="mb-4"><Link href="/concerts">
				<a>
					Concerts
				</a></Link></Heading>
			<Heading level="1" className="mb-2">{title}</Heading>
			<Heading level="3" className="mb-2">{day}, {month}. {numeral}, {year}<br />
				{time}
			</Heading>
			<Paragraph>
				{name && <><strong>{data.location.name}</strong><br /></>}
				{street}<br />
				{city}, {state} {zip}
			</Paragraph>
		</>
	)
}
export default Concert;
