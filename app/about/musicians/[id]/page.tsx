import { notFound } from "next/navigation";

import Layout from "../../../../components/layout";
import Musician from "../../../../components/musician";
import Section from "../../../../components/section";
import { getAllMusicians, getMusicianBySlug } from "../../../../lib/api";

export const revalidate = 86400;

export async function generateStaticParams() {
 const musicians = await getAllMusicians();

 return musicians
  .map((edge) => edge?.node?.slug)
  .filter(Boolean)
  .map((slug) => ({ id: slug }));
}

export default async function SingleMusicianPage({ params }) {
 const resolvedParams = await params;
 const musicianId = resolvedParams?.id;

 if (!musicianId) {
  notFound();
 }

 const musicianData = await getMusicianBySlug(musicianId);

 if (!musicianData) {
  notFound();
 }

 return (
  <Layout>
   <Section>
    <Musician data={musicianData} />
   </Section>
  </Layout>
 );
}