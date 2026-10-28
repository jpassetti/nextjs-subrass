"use client";
import Button from "./button";
import { calendarFile, googleCalendarUrl } from "../lib/event-calendar.mjs";
import { event as track } from "../lib/gtag";
import styles from "./event-tools.module.scss";

type Props = { title: string; start: string; end?: string; location: string; url: string; description: string; past: boolean; parkingUrl?: string };
export default function EventActions(props: Props) {
 const record = (action: string) => track({ action, category: "Event", label: props.url, value: undefined });
 function download() {
  const url = URL.createObjectURL(new Blob([calendarFile(props)], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = "syracuse-brass-event.ics";
  document.body.appendChild(a); a.click(); a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  record("calendar_download");
 }
 return <div className={styles.actions} aria-label="Event planning">
  {!props.past && <>
   <Button href={googleCalendarUrl(props)} target="_blank" rel="noopener noreferrer" onClick={() => record("calendar_google")}>Google Calendar</Button>
   <Button type="button" onClick={download}>Apple / Outlook calendar (.ics)</Button>
  </>}
  <Button href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.location)}`} target="_blank" rel="noopener noreferrer" onClick={() => record("event_directions")}>Directions to venue</Button>
  {props.parkingUrl && <Button href={props.parkingUrl} target="_blank" rel="noopener noreferrer" onClick={() => record("event_parking")}>Parking directions</Button>}
 </div>;
}
