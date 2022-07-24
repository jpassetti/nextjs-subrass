import Layout from '../../components/layout'
import Musician from '../../components/musician'
import { getAllMusicianSlugs, getMusicianData } from '../../lib/musicians'

export default function Post({musicianData}) {
	return <Layout>
		<Musician data={musicianData} />
	</Layout>
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const paths = getAllMusicianSlugs()
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	const musicianData = getMusicianData(params.slug)
	return {
		props: {
			musicianData
		}
	}
}
