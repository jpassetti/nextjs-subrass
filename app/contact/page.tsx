import Heading from "../../components/heading";
import Breadcrumbs from "../../components/breadcrumbs";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { ensembleImage16x9 } from "../../lib/site-images";

export const metadata = {
 title: "Contact Us - Syracuse University Brass Ensemble",
 description: "Call us today at (315)443-3436 or email us at subrass@syr.edu.",
 alternates: {
  canonical: "https://subrass.syr.edu/contact",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu/contact",
  title: "Contact the Syracuse University Brass Ensemble",
  description: "Contact the Syracuse University Brass Ensemble by email, phone, or mail.",
  images: [{ url: ensembleImage16x9, width: 1920, height: 1080, alt: "Syracuse University Brass Ensemble" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "Contact the Syracuse University Brass Ensemble",
  description: "Contact the Syracuse University Brass Ensemble by email, phone, or mail.",
  images: [ensembleImage16x9],
 },
};

export default function ContactPage() {
 return (
  <Layout>
   <Section>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
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
