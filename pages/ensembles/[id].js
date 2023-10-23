import Grid from '../../components/grid'
import Head from 'next/head'
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
	function addProductJsonLd() {
		const members = [];
	
		ensembleInformation.conductor.forEach((part) => {
			const { prefix, firstName, middleInitial, lastName, suffix } = part.personInformation;
		
			let nameParts = [];
			if (prefix) nameParts.push(prefix);
			nameParts.push(firstName);
			if (middleInitial) nameParts.push(`${middleInitial}.`);
			nameParts.push(lastName);
			if (suffix) nameParts.push(`, ${suffix}`);
		
			const fullName = nameParts.join(' ');
		
			members.push({
				"@type": "Person",
				"name": fullName
			});
		});
		
		ensembleInformation.instruments.forEach((part) => {
			part.musicians.forEach((musician) => {
				const { prefix, firstName, middleInitial, lastName, suffix } = musician.personInformation;
		
				let nameParts = [];
				if (prefix) nameParts.push(prefix);
				nameParts.push(firstName);
				if (middleInitial) nameParts.push(`${middleInitial}.`);
				nameParts.push(lastName);
				if (suffix) nameParts.push(`, ${suffix}`);
		
				const fullName = nameParts.join(' ');
		
				members.push({
					"@type": "Person",
					"name": fullName
				});
			});
		});
	
		const schema = {
			"@context": "https://schema.org",
			"@type": "MusicGroup",
			"name": `${title} Ensemble`,
			"description": "The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians.",
			"image": "images/group-photo-2019-crop-m_orig.jpg",
			"member": members,
			"genre": "Brass"
		};
	
		return {
			__html: JSON.stringify(schema)
		};
	}
	return <Layout>
		<SEO 
			title={`${title} Members & Instruments - Syracuse University Brass Ensemble`}
			url={`https://subrass.syr.edu/ensembles/${slug}`}
		/>
		<Head>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={addProductJsonLd()}
				key="product-jsonld"
			/>
		</Head>
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
