import Link from "next/link";

import ConcertSlider from "../../components/concertSlider";
import Layout from "../../components/layout";
import Heading from "../../components/heading";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllConcerts } from "../../lib/api";

import Concert from "../../components/concert";
import SEO from "../../components/SEO";
import ConcertInteractive from "../../components/concertInteractive";

export async function getStaticProps() {
 // Fetch necessary data for the blog post using params.id
 const concertsData = await getAllConcerts();
 return {
  props: {
   concertsData,
  },
  revalidate: 86400, // In seconds
 };
}

const Concerts = ({ concertsData }) => {
 const filterOldConcerts = concertsData.filter((concert) => {
  return new Date(concert.node.concertInformation.date) >= new Date();
 });
 return (
  <Layout>
   <SEO
    title="Upcoming Concerts & Performances - Syracuse University Brass Ensemble"
    url="https://subrass.syr.edu/concerts"
    description="We're proud to bring you a new season packed with a wide range of repertoire. We hope you'll join us for a concert soon!"
   />
   <Section>
    <Heading level="1" marginTop="8" marginBottom="4">
     Concerts
    </Heading>
    <Paragraph type="intro">
     We're proud to bring you a new season packed with a wide range of
     repertoire. We hope you'll join us for a concert soon!
    </Paragraph>
    <ConcertInteractive concerts={filterOldConcerts} label="2024-25" />
   </Section>
  </Layout>
 );
};
export default Concerts;
