import Heading from "../../components/heading";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";

export const metadata = {
 title: "Contact Us - Syracuse University Brass Ensemble",
 description: "Call us today at (315)443-3436 or email us at subrass@syr.edu.",
 alternates: {
  canonical: "https://subrass.syr.edu/contact",
 },
};

export default function ContactPage() {
 return (
  <Layout>
   <Section>
    <Heading level={1} marginTop="8" marginBottom="4">
     Contact
    </Heading>
    <Paragraph type="intro" marginBottom="4">
     Email us today at{" "}
     <a href="mailto:subrass@syr.edu" target="_blank" rel="noopener noreferrer">
      subrass@syr.edu
     </a>{" "}
     or call us at +1-315-443-3436.
    </Paragraph>
    <div>
     <Label htmlFor="mailing_address">Mailing address</Label>
     <div id="mailing_address">
      Room 1-014, Center for Science and Technology
      <br />
      Syracuse University
      <br />
      Syracuse, NY 13244-4100
     </div>
    </div>
   </Section>
  </Layout>
 );
}