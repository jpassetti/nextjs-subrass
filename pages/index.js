import Link from 'next/link'
import Image from 'next/image'

import { getAllConcerts } from '../lib/api'

import ConcertSlider from '../components/concertSlider'
import Layout from '../components/layout'
import Heading from '../components/heading'
import Showcase from '../components/showcase'


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

const Home = ({concertsData}) => {
	const filterOldConcerts = concertsData.filter((concert) => {
		return new Date(concert.node.concertInformation.date) >= new Date();
		
	});
  return (
    <Layout>
		<Showcase />
		  <Heading level="2" marginTop="4" marginBottom="2">
			  Upcoming concerts
		  </Heading>
		<ConcertSlider concerts={filterOldConcerts} />
    </Layout>
  )
}
export default Home
