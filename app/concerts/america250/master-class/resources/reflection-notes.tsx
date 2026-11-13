"use client";

import { useEffect, useState } from "react";

import styles from "./resources.module.scss";

const STORAGE_KEY = "america250-masterclass-reflection-notes";

type ReflectionNotes = {
 idea: string;
 resource: string;
 nextPractice: string;
};

const emptyNotes: ReflectionNotes = { idea: "", resource: "", nextPractice: "" };

export default function ReflectionNotesForm() {
 const [notes, setNotes] = useState<ReflectionNotes>(emptyNotes);

 useEffect(() => {
  const frame = window.requestAnimationFrame(() => {
   try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setNotes({ ...emptyNotes, ...JSON.parse(saved) });
   } catch {
    // Notes remain available for the current visit when browser storage is unavailable.
   }
  });

  return () => window.cancelAnimationFrame(frame);
 }, []);

 const updateNote = (field: keyof ReflectionNotes, value: string) => {
  const next = { ...notes, [field]: value };
  setNotes(next);
  try {
   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
   // Keep the in-memory value if browser storage is unavailable.
  }
 };

 return (
  <div className={styles.reflectionForm}>
   <label>
    <span>One idea I want to remember</span>
    <textarea value={notes.idea} onChange={(event) => updateNote("idea", event.target.value)} rows={4} />
   </label>
   <label>
    <span>A resource, recording, or musician I want to explore</span>
    <textarea value={notes.resource} onChange={(event) => updateNote("resource", event.target.value)} rows={4} />
   </label>
   <label>
    <span>One thing I’ll try at my next practice session</span>
    <textarea value={notes.nextPractice} onChange={(event) => updateNote("nextPractice", event.target.value)} rows={4} />
   </label>
   <div className={styles.notesActions}>
    <button type="button" onClick={() => window.print()}>Print this page with my notes</button>
    <p>Your notes are saved only in this browser on this device.</p>
   </div>
  </div>
 );
}
