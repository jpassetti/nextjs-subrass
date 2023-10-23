// Next.js components
import Image from 'next/image';
import Link from 'next/link';

// Components
import Col from '../../components/col';
import Layout from '../../components/layout';
import Heading from '../../components/heading';
import MainContent from '../../components/maincontent';
import Section from '../../components/section';
import Row from '../../components/row';
import SEO from '../../components/SEO';

// Utilities
import { getPageBySlug } from '../../lib/api';

export async function getStaticProps() {
	const slug = 'about';
	const pageData = await getPageBySlug(slug);
	return {
		props: {
			pageData
		},
		revalidate: 86400, // In seconds
	}
}

const About = ({pageData}) => {
	const {title, content, featuredImage} = pageData;
	return <Layout>
		<SEO 
		title="About the Syracuse University Brass Ensemble - History & Musical Excellence"
		url="https://subrass.syr.edu/about"
		description="Led by Music &amp; Artistic Director James T. Spencer, this ensemble performs music from all major musical periods and often features new compositions commissioned by nationally known composers."
		/>
		<Section>
			<Row justifyContent="center">
				<Col xs="12" sm="8" paddingTop="0">
					<Heading level="1" marginTop="8" marginBottom="4">{title}</Heading>
					{featuredImage &&
							<div style={{marginBottom: "1rem"}}>
							<Image 
								src={featuredImage.node.sourceUrl}
								alt={featuredImage.node.altText}
								width={featuredImage.node.mediaDetails.width}
								height={featuredImage.node.mediaDetails.height}
							/>
							</div>
					}
					{content &&
						<MainContent content={content} />
					}
				</Col>
			</Row>	
			
		</Section>
	</Layout>
}
export default About;
