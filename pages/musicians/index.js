import Link from 'next/link'

import Layout from '../../components/layout'
import Heading from '../../components/heading'
import Grid from '../../components/grid'
import Section from '../../components/section'
import { getMusiciansData, getSections } from '../../lib/musicians'

import Musician from '../../components/musician'

const musicians = getMusiciansData();

const getMusiciansBySection = (section) => {
	filteredMusicians.map((musician, index) => {
		return <Musician data={musician} />
	});
}

const Musicians = () => {
	
	const sections = getSections();
	return <Layout>
		<Section>
		<Heading level="1" className="mb-6">Musicians</Heading>
		{/* <Musician key={index} data={musician} teaser />*/}
		{sections.map((section, index) => {
			const filteredMusicians = musicians.filter(musician => musician.instrument === section);
			return (
				<section style={{borderBottom: "1px solid #ccc"}}>
				<Heading level="2" className="mt-4 mb-2">{section}</Heading>
				<Grid>
				{
					filteredMusicians.map((musician, index) => {
						return <Grid.Item><Musician data={musician} teaser /></Grid.Item>
					})
				}
				</Grid>
				</section>
			)
		})}
		</Section>
	</Layout>
}
export default Musicians;
