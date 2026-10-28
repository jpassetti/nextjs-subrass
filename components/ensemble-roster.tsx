// @ts-nocheck
import Heading from "./heading";
import Musician from "./musician";
import Section from "./section";
import EnsembleMusicianGrid from "./ensemble-musician-grid";
import EnsembleRosterMotion from "./ensemble-roster-motion";

export default function EnsembleRoster({ ensembleData }) {
 const ensembleInformation = ensembleData?.ensembleInformation || {};
 const conductors = Array.isArray(ensembleInformation.conductor) ? ensembleInformation.conductor : [];
 const instruments = Array.isArray(ensembleInformation.instruments) ? ensembleInformation.instruments : [];

 return <EnsembleRosterMotion transitionKey={ensembleData?.slug || ensembleData?.title || "ensemble"}>
  {conductors.filter((conductor) => conductor?.personInformation).length > 0 ? (
   <Section>
    <Heading level={2} marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">Conductors</Heading>
    <EnsembleMusicianGrid>
     {conductors.filter((conductor) => conductor?.personInformation).map((conductor, index) => (
      <Musician data={conductor} teaser key={conductor.slug || `conductor-${index}`} />
     ))}
    </EnsembleMusicianGrid>
   </Section>
  ) : null}

  {instruments.map((part, index) => {
   const instrumentName = part?.instrument?.name || "";
   const musicians = (Array.isArray(part?.musicians) ? part.musicians : []).filter((musician) => musician?.personInformation);

   return (
    <Section key={part?.instrument?.id || `instrument-${index}`}>
     {instrumentName ? (
      <Heading level={2} marginTop="6" marginBottom="2" borderTop="1" textTransform="uppercase">
       {instrumentName}{instrumentName !== "Percussion" ? "s" : ""}
      </Heading>
     ) : null}
     <EnsembleMusicianGrid>
      {musicians.map((musician, musicianIndex) => (
       <Musician data={musician} teaser key={musician.slug || `musician-${musicianIndex}`} />
      ))}
     </EnsembleMusicianGrid>
    </Section>
   );
  })}
 </EnsembleRosterMotion>;
}
