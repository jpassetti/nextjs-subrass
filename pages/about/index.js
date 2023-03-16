import Image from 'next/image'

import Col from '../../components/col';
import Layout from '../../components/layout'
import Heading from '../../components/heading'
import Section from '../../components/section';
import Paragraph from '../../components/paragraph';
import Row from '../../components/row';
import SEO from '../../components/SEO';


const About = () => {
	return <Layout>
		<SEO 
		title="About"
		url="https://subrass.syr.edu/about"
		description="Led by Music &amp; Artistic Director James T. Spencer, this ensemble performs music from all major musical periods and often features new compositions commissioned by nationally known composers."
		/>
		<Section>
			<Row justifyContent="center">
				<Col xs="12" sm="8" paddingTop="0">
					<Heading level="1" marginTop="8" marginBottom="4">About</Heading>
					<Image 
						src="/images/group-photo-2019-crop-m_orig.jpg"
						alt="Syracuse University Brass Ensemble"
						width={1100}
						height={553}
					/>
					<Paragraph marginBottom="2" marginTop="2">The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians; members include Syracuse University faculty, staff and students, the State University of New York Upstate Medical University faculty and staff, and accomplished musicians from Upstate New York communities. The group is directed by James T. Spencer.</Paragraph>

					<Paragraph marginBottom="2">The SU Brass is a permanent ensemble-in-residence through The College of Arts and Sciences and Hendricks Chapel. SUBE performs about 12 concerts each year throughout the Central New York region. The ensemble has performed at the Gettysburg Brass Band Festival (Gettysburg, PA) and the Great American Brass Band Festival (Danville, KY), and has twice placed 1st nationally in the North American Brass Band Association (NABBA) Championship Festival.</Paragraph>

					<Paragraph marginBottom="2">The repertoire of the SU Brass includes music from all major musical periods and often features new compositions commissioned by nationally known composers. The ensemble has released CD and DVD recordings and has premiered several dozen new compositions and arrangements, including "In Praise of Science," written for SUBE by Pulitzer Prize winning composer Robert Ward.</Paragraph>
				</Col>
			</Row>	
			
		</Section>
	</Layout>
}
export default About;
