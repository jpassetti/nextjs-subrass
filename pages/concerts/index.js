import Link from 'next/link'

import Layout from '../../components/layout'
import Heading from '../../components/heading'
import Paragraph from '../../components/paragraph'
import Section from '../../components/section'
import { getConcertsDataByYear } from '../../lib/concerts'

import Concert from '../../components/concert'

const Concerts = () => {
	const concerts2022 = getConcertsDataByYear("2022-23");
	return <Layout>
		<Section>
		<Heading level="1" className="mb-4">Concerts</Heading>
		<Paragraph type="intro">We're proud to bring you a new season packed with a wide range of repertoire.</Paragraph>
		<Heading level="2" className="mb-2 mt-6">2022-23</Heading>
		{concerts2022.map((concert, index) => {
			return <Concert key={index} data={concert} teaser />
		})}
		</Section>
	</Layout>
}
export default Concerts;
