import moment from "moment-timezone";
import EventActions from "./event-actions";
import resources from "../lib/event-resources.json";
import styles from "./event-tools.module.scss";

type Props = { title: string; start: string; end?: string; location: string; url: string; admission?: string; parkingUrl?: string; parkingText?: string; contact?: string; rsvpUrl?: string };
type Resource = { label: string; url: string };
export default function EventTools({ admission = "Free and open to the public.", contact = "subrass@syr.edu", rsvpUrl, ...event }: Props) {
 if (!moment.tz(event.start, "America/New_York").isValid()) return null;
 const archiveAfter = event.end ? moment.tz(event.end, "America/New_York") : moment.tz(event.start, "America/New_York").endOf("day");
 const past = archiveAfter.isBefore(moment());
 const archive = (resources as Record<string, Resource[]>)[new URL(event.url).pathname] || [];
 return <section className={styles.tools} aria-label={past ? "Concert archive" : "Plan your visit"}>
  <h2>{past ? "Concert archive" : "Plan your visit"}</h2>
  <p>{past ? "This event has taken place. " : ""}{admission}</p>
  {!past && rsvpUrl && <p><a href={rsvpUrl}>RSVP for the master class</a></p>}
  {!past && <p>Times are Eastern Time.{!event.end && " Only the start time is confirmed; no end time is specified in the calendar download."}</p>}
  {event.parkingText && <p>{event.parkingText}</p>}
  <EventActions {...event} description={`${admission}${rsvpUrl ? ` RSVP: ${rsvpUrl}` : ""}${event.parkingText ? ` ${event.parkingText}` : ""}`} past={past} />
  <p>Accessibility accommodations and attendance questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
  {past && archive.length > 0 && <><h3>Programs, photos &amp; recordings</h3><ul>{archive.filter(item => /^https:\/\//.test(item.url) || /^\/(?!\/)/.test(item.url)).map(item => <li key={item.url}><a href={item.url}>{item.label}</a></li>)}</ul></>}
 </section>;
}
