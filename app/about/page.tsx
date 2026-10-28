import Image from "next/image";

import Breadcrumbs from "../../components/breadcrumbs";
import Col from "../../components/col";
import HeroIntro from "../../components/hero-intro";
import Layout from "../../components/layout";
import MainContent from "../../components/maincontent";
import Paragraph from "../../components/paragraph";
import Row from "../../components/row";
import Section from "../../components/section";
import { getPageBySlug } from "../../lib/api";
import styles from "./about.module.scss";
import { ensembleImage16x9 } from "../../lib/site-images";

export const metadata = {
 title: "About the Syracuse University Brass Ensemble - History & Musical Excellence",
 description:
  "Led by Music & Artistic Director James T. Spencer, this ensemble performs music from all major musical periods and often features new compositions commissioned by nationally known composers.",
 alternates: {
  canonical: "https://subrass.syr.edu/about",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu/about",
  title: "About the Syracuse University Brass Ensemble",
  description:
   "Learn about the Syracuse University Brass Ensemble, its musical leadership, history, repertoire, and commitment to live brass performance.",
  images: [{ url: ensembleImage16x9, width: 1920, height: 1080, alt: "Members of the Syracuse University Brass Ensemble" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "About the Syracuse University Brass Ensemble",
  description: "Learn about the ensemble’s leadership, history, repertoire, and commitment to live brass performance.",
  images: [ensembleImage16x9],
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
      <Breadcrumbs
       theme="dark"
       overlay
       items={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
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
      <HeroIntro title={title}>
       Led by Music &amp; Artistic Director James T. Spencer, the Syracuse University Brass Ensemble performs music from every major musical period and champions new works by nationally recognized composers.
      </HeroIntro>
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
