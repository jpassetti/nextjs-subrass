import Link from 'next/link'
import Image from 'next/image'

import { getConcertsData } from '../lib/concerts'

import Layout from '../components/layout'
import Concert from '../components/concert'
import Heading from '../components/heading'
import Paragraph from '../components/paragraph'
import Section from '../components/section'
import Showcase from '../components/showcase'

const Home = ({children}) => {

	const concerts = getConcertsData();

  return (
    <Layout>
		<Showcase />
       <Section>

			 <Heading level="2" className="mb-2">
				 Upcoming concert
			 </Heading>
			<Concert data={concerts[0]} teaser />
				<Paragraph><Link href="/concerts"><a>View full schedule</a></Link></Paragraph>
			
		</Section>
    </Layout>
  )
}
export default Home
