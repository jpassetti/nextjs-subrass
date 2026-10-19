import moment from "moment-timezone";

export function calendarInstant(value) {
 const date = moment.tz(value, "America/New_York");
 if (!date.isValid()) throw new Error("Invalid event date");
 return date.utc().format("YYYYMMDDTHHmmss[Z]");
}
export function googleCalendarUrl(event) {
 const start = calendarInstant(event.start);
 const end = event.end ? calendarInstant(event.end) : start;
 return `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: "TEMPLATE", text: event.title, dates: `${start}/${end}`, ctz: "America/New_York", location: event.location, details: `${event.description}\n\n${event.url}` })}`;
}
export function calendarFile(event, stamp = new Date()) {
 const escape = (s) => String(s).replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
 const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Syracuse University Brass Ensemble//Events//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:${escape(event.url)}@subrass.syr.edu`, `DTSTAMP:${calendarInstant(stamp.toISOString())}`, `DTSTART:${calendarInstant(event.start)}`, ...(event.end ? [`DTEND:${calendarInstant(event.end)}`] : []), `SUMMARY:${escape(event.title)}`, `LOCATION:${escape(event.location)}`, `DESCRIPTION:${escape(`${event.description}\n\n${event.url}`)}`, `URL:${event.url}`, "END:VEVENT", "END:VCALENDAR"];
 return lines.map(line => {
  const chunks = []; let chunk = "";
  for (const char of line) {
   if (new TextEncoder().encode(chunk + char).length > 75) { chunks.push(chunk); chunk = " "; }
   chunk += char;
  }
  return [...chunks, chunk].join("\r\n");
 }).join("\r\n") + "\r\n";
}
