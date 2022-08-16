import Link from 'next/link'
import Image from 'next/image'

import { getAllConcerts } from '../lib/api'

import Layout from '../components/layout'
import Concert from '../components/concert'
import Heading from '../components/heading'
import Paragraph from '../components/paragraph'
import Section from '../components/section'
import Showcase from '../components/showcase'

export async function getStaticProps() {
	// Fetch necessary data for the blog post using params.id
	const concertsData = await getAllConcerts()
	return {
		props: {
			concertsData
		}
	}
}

const Home = ({concertsData}) => {

  return (
    <Layout>
		<Showcase />
       <Section>

			 <Heading level="2" className="mb-2">
				 Upcoming concert
			 </Heading>
			  <Concert data={concertsData[concertsData.length-1].node} teaser />
			{/*<Paragraph><Link href="/concerts"><a>View full schedule</a></Link></Paragraph>*/}
			
		</Section>
    </Layout>
  )
}
export default Home
