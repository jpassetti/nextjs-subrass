import { useRouter } from 'next/router';

import Layout from '../../../components/layout'
import Head from 'next/head'
import Concert from '../../../components/concert'
import Section from '../../../components/section'
import { getAllConcertSlugs, getConcertBySlug } from '../../../lib/api'

export default function SingleConcert({ concertData }) {
  const router = useRouter();
  const { year, slug } = router.query;
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
		const { slug, academicYears } = edge.node
		return {
			params: {
				slug: slug,
        		year: academicYears.edges[0].node.slug
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
	const concertData = await getConcertBySlug(params.slug)
	return {
		props: {
			concertData
		},
		revalidate: 86400, // In seconds
	}
}
