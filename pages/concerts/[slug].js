import Layout from '../../components/layout'
import Concert from '../../components/concert'
import Section from '../../components/section'
import { getAllConcertSlugs, getConcertData } from '../../lib/concerts'

export default function Post({ concertData }) {
	return <Layout>
		<Section>
		<Concert data={concertData} />
		</Section>
	</Layout>
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const paths = getAllConcertSlugs()
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	const concertData = getConcertData(params.slug)
	return {
		props: {
			concertData
		}
	}
}
