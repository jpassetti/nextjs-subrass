import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

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
	function addProductJsonLd() {
			
		const schema = {
			"@context": "https://schema.org",
			"@type": "MusicGroup",
			"name": "Syracuse University Brass Ensemble",
			"description": "A group of 35 professional-level brass and percussion musicians.",
			"logo": "photos/1x1/photo.jpg",
			"url": "https://subrass.syr.edu",
			"telephone": "+1-315-443-3436",
			"address": {
			  "@type": "PostalAddress",
			  "streetAddress": "Room 1-014, Center for Science and Technology, Syracuse University",
			  "addressLocality": "Syracuse",
			  "addressRegion": "NY",
			  "postalCode": "13244",
			  "addressCountry": "USA"
			},
			"sameAs": [
				"http://facebook.com/subrass",
				"http://soundcloud.com/thesubrass",
				"http://youtube.com/thesubrass",
			]
		  };
	
		return {
			__html: JSON.stringify(schema)
		};
	}
  return (
    <Layout>
		<SEO 
			title="Syracuse University Brass Ensemble - Premier Brass Musicians of NY" 
			description="Syracuse University's Brass Ensemble showcases the vibrancy and richness of brass music. Comprised of artists from SU, SUNY Upstate, and renowned NY musicians, our concerts are a celebration of sonic brilliance. Experience the power and warmth of live brass."	
		/>
		<Head>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={addProductJsonLd()}
				key="product-jsonld"
			/>
		</Head>
		<Showcase />
		<ConcertInteractive concerts={filterOldConcerts} label="Upcoming Concerts"/>
    </Layout>
  )
}
export default Home
