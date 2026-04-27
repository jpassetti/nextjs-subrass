import Image from "next/image";

import Col from "../../components/col";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import MainContent from "../../components/maincontent";
import Paragraph from "../../components/paragraph";
import Row from "../../components/row";
import Section from "../../components/section";
import { getPageBySlug } from "../../lib/api";

export const metadata = {
 title: "About the Syracuse University Brass Ensemble - History & Musical Excellence",
 description:
  "Led by Music & Artistic Director James T. Spencer, this ensemble performs music from all major musical periods and often features new compositions commissioned by nationally known composers.",
 alternates: {
  canonical: "https://subrass.syr.edu/about",
 },
};

export const revalidate = 86400;

export default async function AboutPage() {
 const pageData = await getPageBySlug("about");

 const { title, content, featuredImage } = pageData || {
  title: "About",
  content: "",
  featuredImage: null,
 };
 const featuredNode = featuredImage?.node;

 return (
  <Layout>
   <Section>
    <Row justifyContent="center">
     <Col xs="12" sm="8" paddingTop="0">
    <Heading level={1} marginTop="8" marginBottom="4">
       {title}
      </Heading>
      {featuredNode ? (
       <div style={{ marginBottom: "1rem" }}>
        <Image
         src={featuredNode.sourceUrl}
         alt={featuredNode.altText || title || "Syracuse University Brass Ensemble"}
         width={featuredNode.mediaDetails?.width || 1200}
         height={featuredNode.mediaDetails?.height || 800}
         className="responsive-img"
         loading="eager"
        />
       </div>
      ) : null}
      {content ? (
       <MainContent content={content} />
      ) : (
       <Paragraph type="intro">
        About page content is temporarily unavailable. Please check back soon.
       </Paragraph>
      )}
     </Col>
    </Row>
   </Section>
  </Layout>
 );
}