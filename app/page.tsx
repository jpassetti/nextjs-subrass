import ConcertInteractive from "../components/concertInteractive";
import type { Metadata } from "next";
import Layout from "../components/layout";
import Showcase from "../components/showcase";
import { getAllConcerts } from "../lib/api";
import { ensembleImage16x9 } from "../lib/site-images";

export const metadata: Metadata = {
 title: "Syracuse University Brass Ensemble - Live Brass Music & Performances",
 description:
  "Experience the Syracuse University Brass Ensemble live! See upcoming concerts and enjoy powerful brass music by professional musicians from SU, SUNY Upstate, and beyond.",
 alternates: {
  canonical: "/",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu",
  title: "Syracuse University Brass Ensemble - Live Brass Music & Performances",
  description:
   "Experience the Syracuse University Brass Ensemble live! See upcoming concerts and enjoy powerful brass music by professional musicians from SU, SUNY Upstate, and beyond.",
  images: [
   {
    url: ensembleImage16x9,
    width: 1920,
    height: 1080,
    alt: "Syracuse University Brass Ensemble",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Syracuse University Brass Ensemble - Live Brass Music & Performances",
  description:
   "Experience the Syracuse University Brass Ensemble live! See upcoming concerts and enjoy powerful brass music by professional musicians from SU, SUNY Upstate, and beyond.",
  images: [ensembleImage16x9],
 },
};

export default async function HomePage() {
 const concertsData = await getAllConcerts();
 const today = new Date();
 const upcomingConcerts =
  concertsData?.filter(({ node }) => {
   const concertDate = new Date(node.concertInformation.date);
   return concertDate >= today;
  }) || [];
 const upcomingAcademicYear = upcomingConcerts[0]?.node?.academicYears?.edges?.[0]?.node?.name || "Upcoming";

 return (
  <Layout>
   <Showcase />
   <ConcertInteractive concerts={upcomingConcerts} sectionTitle="Upcoming Concerts" label={upcomingAcademicYear} />
  </Layout>
 );
}
