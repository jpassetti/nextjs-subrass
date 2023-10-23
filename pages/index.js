import Link from 'next/link'
import Image from 'next/image'

import { getAllConcerts } from '../lib/api'

import ConcertInteractive from '../components/concertInteractive'
import Layout from '../components/layout'
import Heading from '../components/heading'
import Showcase from '../components/showcase'
import SEO from '../components/SEO'


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
		<SEO 
			title="Syracuse University Brass Ensemble - Premier Brass Musicians of NY" 
			description="Syracuse University's Brass Ensemble showcases the vibrancy and richness of brass music. Comprised of artists from SU, SUNY Upstate, and renowned NY musicians, our concerts are a celebration of sonic brilliance. Experience the power and warmth of live brass."	
		/>
		<Showcase />
		<ConcertInteractive concerts={filterOldConcerts} label="Upcoming Concerts"/>
    </Layout>
  )
}
export default Home
