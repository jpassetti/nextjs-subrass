import Grid from '../../components/grid'
import Heading from '../../components/heading'
import Layout from '../../components/layout'
import Musician from '../../components/musician'
import Section from '../../components/section'
import SEO from '../../components/SEO'

import { getEnsembleBySlug, getAllEnsembleSlugs } from '../../lib/api'



export async function getStaticPaths() {
	console.log("get static paths");
	// Return a list of possible value for id
	const slugs = await getAllEnsembleSlugs()
	//console.log({ slugs });
	const paths = slugs.map(edge => {
		const { slug } = edge.node;
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
	const { title, ensembleInformation, slug } = ensembleData;
	return <Layout>
		<SEO 
			title={`${title} Ensemble`}
			url={`https://subrass.syr.edu/ensembles/${slug}`}
		/>
			<Heading level="1" marginTop="8" marginBottom="4">{title} Ensemble</Heading>
		
		
		{ensembleInformation.conductor.map((part, index) => {
			return <Section key={index}>
				<Heading level="2" marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">Conductor</Heading>
				<Grid>
					<Grid.Item key={index}><Musician data={part} teaser /></Grid.Item>
				</Grid>
			</Section>
		})}
		{ensembleInformation.instruments.map((part, index) => {
			const {instrument, musicians} = part;
			return <Section key={index}>
				<Heading level="2" marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">{instrument.name}{instrument.name !== "Percussion" ? `s` : ''}</Heading>
				<Grid>
					{
						musicians.map((musician, index) => {
							return <Grid.Item key={index}><Musician data={musician} teaser /></Grid.Item>
						})
					}
				</Grid>
			</Section>
		})}
		
	</Layout>
}
