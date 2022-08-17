import Link from 'next/link'

import Layout from '../../components/layout'
import Heading from '../../components/heading'
import Paragraph from '../../components/paragraph'
import Section from '../../components/section'
import { getAllConcerts } from '../../lib/api'

import Concert from '../../components/concert'

export async function getStaticProps() {
	// Fetch necessary data for the blog post using params.id
	const concertsData = await getAllConcerts()
	return {
		props: {
			concertsData
		},
		revalidate: 86400, // In seconds
	}
}

const Concerts = ({concertsData}) => {
	
	const orderedConcerts = concertsData.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(a.node.concertInformation.date) - new Date(b.node.concertInformation.date);
	});

	return <Layout>
		<Section>
		<Heading level="1" marginTop="8" marginBottom="4">Concerts</Heading>
		<Paragraph type="intro">We're proud to bring you a new season packed with a wide range of repertoire.</Paragraph>
		<Heading level="2" marginTop="3" marginBottom="3">2022-23</Heading>
		{orderedConcerts.map((concert, index) => {
			return <Concert key={index} data={concert.node} teaser />
		})}
		</Section>
	</Layout>
}
export default Concerts;
