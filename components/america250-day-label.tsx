"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = "2026-11-13";
const EVENT_TIME_ZONE = "America/New_York";

function easternDateKey(date: Date) {
 const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: EVENT_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
 }).formatToParts(date);
 const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
 return `${values.year}-${values.month}-${values.day}`;
}

export function getAmerica250DayLabel(date: Date) {
 const today = easternDateKey(date);
 const [todayYear, todayMonth, todayDay] = today.split("-").map(Number);
 const [eventYear, eventMonth, eventDay] = EVENT_DATE.split("-").map(Number);
 const difference = Math.round(
  (Date.UTC(eventYear, eventMonth - 1, eventDay) - Date.UTC(todayYear, todayMonth - 1, todayDay)) / 86_400_000,
 );

 if (difference === 0) return "Today";
 if (difference === 1) return "Tomorrow";
 return "Friday, Nov. 13";
}

export default function America250DayLabel({ fallback = "Friday, Nov. 13" }: { fallback?: string }) {
 const [label, setLabel] = useState(fallback);

 useEffect(() => {
  const updateLabel = () => setLabel(getAmerica250DayLabel(new Date()));
  updateLabel();
  const interval = window.setInterval(updateLabel, 60_000);
  return () => window.clearInterval(interval);
 }, []);

 return <>{label}</>;
}
