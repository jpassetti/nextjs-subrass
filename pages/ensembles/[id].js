import Grid from '../../components/grid'
import Heading from '../../components/heading'
import Layout from '../../components/layout'
import Musician from '../../components/musician'
import Section from '../../components/section'

import { getEnsembleBySlug, getAllEnsembleSlugs } from '../../lib/api'



export async function getStaticPaths() {
	// Return a list of possible value for id
	const slugs = await getAllEnsembleSlugs()
	//console.log({ slugs });
	const paths = slugs.map(edge => {
		const { slug } = edge.node
		return {
			params: {
				id: slug,
			}
		}
	})
	
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	//console.log({params});
	const ensembleData = await getEnsembleBySlug(params.id)
	return {
		props: {
			ensembleData
		}
	}
}
export default function Ensemble({ ensembleData }) {
	const { title, ensembleInformation } = ensembleData;
	return <Layout>
		<Section>
			<Heading level="1" marginTop="8" marginBottom="4">{title} Ensemble</Heading>
		</Section>
		<Section>
		{ensembleInformation.conductor.map((part, index) => {
			return <section key={index}>
				<Heading level="2" marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">Conductor</Heading>
				<Grid>
					<Grid.Item key={index}><Musician data={part} teaser /></Grid.Item>
				</Grid>
			</section>
		})}
		{ensembleInformation.instruments.map((part, index) => {
			const {instrument, musicians} = part;
			return <section key={index}>
				<Heading level="2" marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">{instrument.name}{instrument.name !== "Percussion" ? `s` : ''}</Heading>
				<Grid>
					{
						musicians.map((musician, index) => {
							return <Grid.Item key={index}><Musician data={musician} teaser /></Grid.Item>
						})
					}
				</Grid>
			</section>
		})}
		</Section>
	</Layout>
}
