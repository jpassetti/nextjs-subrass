import Layout from '../components/layout'
import Heading from '../components/heading'
import Label from '../components/label';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import SEO from '../components/SEO';

const Contact = () => {
	return <Layout>
		<SEO 
			title="Contact"
			url="https://subrass.syr.edu/contact"
			description="Call us today at (315)443-3436 or email us at subrass@syr.edu."			
			/>
		<Section>
			<Heading level="1" marginTop="8" marginBottom="4">Contact</Heading>
			<Paragraph type="intro" marginBottom="4">Email us today at <a href="mailto:subrass@syr.edu" target="_blank">subrass@syr.edu</a> or call us at (315)443-3436.</Paragraph>
			<Paragraph>
				<Label htmlForm="mailing_address">Mailing address</Label>
				<div id="mailing_address">Room 1-014, Center for Science and Technology<br />
				Syracuse University<br />
				Syracuse, NY 13244-4100</div>
			</Paragraph>
		</Section>
	</Layout>
}
export default Contact;
