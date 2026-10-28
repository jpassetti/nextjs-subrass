import moment from "moment-timezone";
import DetailLabel from "./detail-label";
import EventActions from "./event-actions";
import Heading from "./heading";
import Paragraph from "./paragraph";
import resources from "../lib/event-resources.json";
import styles from "./event-tools.module.scss";

type Props = { title: string; start: string; end?: string; location: string; url: string; admission?: string; parkingUrl?: string; parkingText?: string; contact?: string; rsvpUrl?: string; theme?: "light" | "dark" };
type Resource = { label: string; url: string };
export default function EventTools({ admission = "Free and open to the public.", contact = "subrass@syr.edu", rsvpUrl, theme = "light", ...event }: Props) {
 if (!moment.tz(event.start, "America/New_York").isValid()) return null;
 const archiveAfter = event.end ? moment.tz(event.end, "America/New_York") : moment.tz(event.start, "America/New_York").endOf("day");
 const past = archiveAfter.isBefore(moment());
 const archive = (resources as Record<string, Resource[]>)[new URL(event.url).pathname] || [];
 return <section className={`${styles.tools} ${theme === "dark" ? styles.dark : ""}`} aria-label={past ? "Concert archive" : "Plan your visit"}>
  {theme === "dark" ? (
   <DetailLabel as="h2">{past ? "Concert archive" : "Plan your visit"}</DetailLabel>
  ) : (
   <Heading level={2} marginBottom={1}>{past ? "Concert archive" : "Plan your visit"}</Heading>
  )}
  <Paragraph>{past ? "This event has taken place. " : ""}{admission}</Paragraph>
  {!past && rsvpUrl && <Paragraph><a href={rsvpUrl}>RSVP for the master class</a></Paragraph>}
  {event.parkingText && <Paragraph>{event.parkingText}</Paragraph>}
  <EventActions {...event} description={`${admission}${rsvpUrl ? ` RSVP: ${rsvpUrl}` : ""}${event.parkingText ? ` ${event.parkingText}` : ""}`} past={past} />
  <Paragraph>Accessibility accommodations and attendance questions: <a href={`mailto:${contact}`}>{contact}</a>.</Paragraph>
  {past && archive.length > 0 && <><h3>Programs, photos &amp; recordings</h3><ul>{archive.filter(item => /^https:\/\//.test(item.url) || /^\/(?!\/)/.test(item.url)).map(item => <li key={item.url}><a href={item.url}>{item.label}</a></li>)}</ul></>}
 </section>;
}
