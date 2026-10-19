import test from "node:test";
import assert from "node:assert/strict";
import { calendarInstant, calendarFile, googleCalendarUrl } from "../lib/event-calendar.mjs";
const event = { title: "America 250, Brass; Music", start: "2026-11-13T18:30:00-05:00", end: "2026-11-13T20:00:00-05:00", location: "Hendricks Chapel, Syracuse", description: "Free concert\nNo registration", url: "https://subrass.syr.edu/concerts/america250" };
test("calendar times respect Eastern daylight saving and explicit offsets", () => {
 assert.equal(calendarInstant("2026-11-13T18:30:00"), "20261113T233000Z");
 assert.equal(calendarInstant("2026-07-13T18:30:00"), "20260713T223000Z");
 assert.equal(calendarInstant(event.start), "20261113T233000Z");
});
test("calendar preserves the confirmed concert and masterclass durations", () => {
 const concert = calendarFile(event).replaceAll("\r\n ", "");
 assert.ok(concert.includes("DTSTART:20261113T233000Z"));
 assert.ok(concert.includes("DTEND:20261114T010000Z"));
 const masterclass = calendarFile({ ...event, start: "2026-11-13T16:00:00-05:00", end: "2026-11-13T17:00:00-05:00" });
 assert.ok(masterclass.includes("DTSTART:20261113T210000Z"));
 assert.ok(masterclass.includes("DTEND:20261113T220000Z"));
});
test("unknown end time is omitted instead of inventing a duration", () => {
 const data = { ...event, end: undefined };
 assert.ok(!calendarFile(data).includes("DTEND:"));
 const url = new URL(googleCalendarUrl(data));
 assert.equal(url.searchParams.get("dates"), "20261113T233000Z/20261113T233000Z");
});
test("calendar escapes text and folds long Unicode lines within 75 bytes", () => {
 const result = calendarFile({ ...event, title: event.title + "é".repeat(100) });
 assert.ok(result.includes("America 250\\, Brass\\; Music"));
 assert.ok(result.includes("Free concert\\nNo registration"));
 for (const line of result.split("\r\n")) assert.ok(Buffer.byteLength(line) <= 75);
 assert.ok(result.endsWith("END:VCALENDAR\r\n"));
});
test("Google calendar contains venue, source URL and attendance details", () => {
 const params = new URL(googleCalendarUrl(event)).searchParams;
 assert.equal(params.get("ctz"), "America/New_York");
 assert.equal(params.get("location"), event.location);
 assert.ok(params.get("details").includes(event.url));
 assert.ok(params.get("details").includes("No registration"));
});
