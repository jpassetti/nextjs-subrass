import Layout from '../../../components/layout'
import Musician from '../../../components/musician'
import Section from '../../../components/section'
import { getAllMusicians, getMusicianBySlug } from '../../../lib/api'

export async function getStaticPaths() {
	// Return a list of possible value for id
	const musicians = await getAllMusicians()
	const paths = musicians.map(edge => {
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
	const musicianData = await getMusicianBySlug(params.id)
	return {
		props: {
			musicianData
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 86400, // In seconds
	}
}

export default function SingleMusician({ musicianData }) {
	return <Layout>
		<Section>
			<Musician data={musicianData} />
		</Section>
	</Layout>
}
