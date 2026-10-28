import Image from "next/image";

import Col from "../../components/col";
import Layout from "../../components/layout";
import MainContent from "../../components/maincontent";
import Paragraph from "../../components/paragraph";
import Row from "../../components/row";
import Section from "../../components/section";
import { getPageBySlug } from "../../lib/api";
import styles from "./about.module.scss";

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

 const { title, content } = pageData || {
  title: "About",
  content: "",
 };

 return (
  <Layout>
   <Section>
    <div className={styles.hero}>
     <div className={styles.heroVisual}>
      <Image
       src="/syracuse-university-brass-ensemble-2025.webp"
       alt="Members of the Syracuse University Brass Ensemble"
       fill
       sizes="(min-width: 1200px) 72rem, 100vw"
       className={styles.heroImage}
       priority
      />
      <div className={styles.heroShade} aria-hidden="true"></div>
     </div>
     <div className={styles.heroContent}>
      <h1>{title}</h1>
      <p>Led by Music &amp; Artistic Director James T. Spencer, the Syracuse University Brass Ensemble performs music from every major musical period and champions new works by nationally recognized composers.</p>
     </div>
    </div>
    <Row justifyContent="center">
     <Col xs="12" sm="8" paddingTop="0">
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
