import Layout from '../../components/layout'
import Concert from '../../components/concert'
import Section from '../../components/section'
import { getAllConcertSlugs, getConcertBySlug } from '../../lib/api'

export default function Post({ concertData }) {
	return <Layout>
		<Section>
		<Concert data={concertData} />
		</Section>
	</Layout>
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const concerts = await getAllConcertSlugs()
	const paths = concerts.map(edge => {
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
	const concertData = await getConcertBySlug(params.id)
	return {
		props: {
			concertData
		},
		revalidate: 86400, // In seconds
	}
}
