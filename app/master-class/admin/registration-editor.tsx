"use client";

import { useState } from "react";
import styles from "../master-class.module.scss";

const instruments = ["Flute", "Oboe", "Clarinet", "Bass clarinet", "Bassoon", "Saxophone", "Trumpet", "French horn", "Trombone", "Baritone or euphonium", "Tuba", "Percussion"];

type RegistrationRecord = Record<string, unknown>;

interface RegistrationEditorProps {
 action: string;
 record?: RegistrationRecord | null;
 submitLabel: string;
}

function field(record: RegistrationRecord | null, key: string) {
 return record?.[key] == null ? "" : String(record[key]);
}

export default function RegistrationEditor({ action, record = null, submitLabel }: RegistrationEditorProps) {
 const savedInstrument = field(record, "instrument");
 const savedInstrumentIsStandard = instruments.includes(savedInstrument);
 const [instrument, setInstrument] = useState(savedInstrumentIsStandard ? savedInstrument : savedInstrument ? "Other" : "");
 const [otherInstrument, setOtherInstrument] = useState(savedInstrumentIsStandard ? "" : savedInstrument === "Other" ? "" : savedInstrument);

 return (
  <form className={styles.adminEditor} action={action} method="post">
   <input type="hidden" name="phone" value={field(record, "phone")} />
   <fieldset className={styles.formGroup}>
    <legend>Student information</legend>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="firstName">First name *</label><input id="firstName" name="firstName" defaultValue={field(record, "first_name")} required maxLength={80} /></div>
     <div className={styles.field}><label htmlFor="lastName">Last name *</label><input id="lastName" name="lastName" defaultValue={field(record, "last_name")} required maxLength={80} /></div>
    </div>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="school">School name *</label><input id="school" name="school" defaultValue={field(record, "school")} required maxLength={160} /></div>
     <div className={styles.field}><label htmlFor="gradeLevel">Grade *</label><select id="gradeLevel" name="gradeLevel" defaultValue={field(record, "grade_level")} required><option value="" disabled>Select a grade</option>{[9, 10, 11, 12].map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}</select></div>
    </div>
    <div className={styles.field}><label htmlFor="email">Student email *</label><input id="email" name="email" type="email" defaultValue={field(record, "email")} required maxLength={254} /></div>
    <div className={styles.field}><label htmlFor="instrument">Instrument *</label><select id="instrument" name="instrument" value={instrument} onChange={(event) => setInstrument(event.target.value)} required><option value="" disabled>Select an instrument</option>{instruments.map((instrumentName) => <option key={instrumentName}>{instrumentName}</option>)}<option>Other</option></select></div>
    {instrument === "Other" ? <div className={styles.field}><label htmlFor="otherInstrument">Enter the instrument *</label><input id="otherInstrument" name="otherInstrument" value={otherInstrument} onChange={(event) => setOtherInstrument(event.target.value)} required maxLength={80} /></div> : null}
   </fieldset>

   <fieldset className={styles.formGroup}>
    <legend>Parent or guardian information</legend>
    <div className={styles.field}><label htmlFor="parentName">Parent or guardian name *</label><input id="parentName" name="parentName" defaultValue={field(record, "parent_name")} required maxLength={160} /></div>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="parentEmail">Parent or guardian email *</label><input id="parentEmail" name="parentEmail" type="email" defaultValue={field(record, "parent_email")} required maxLength={254} /></div>
     <div className={styles.field}><label htmlFor="parentPhone">Parent or guardian phone *</label><input id="parentPhone" name="parentPhone" type="tel" defaultValue={field(record, "parent_phone")} required maxLength={40} /></div>
    </div>
   </fieldset>

   <fieldset className={styles.formGroup}>
    <legend>Music instructor</legend>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="teacherName">Instructor name *</label><input id="teacherName" name="teacherName" defaultValue={field(record, "teacher_name")} required maxLength={160} /></div>
     <div className={styles.field}><label htmlFor="teacherEmail">Instructor email *</label><input id="teacherEmail" name="teacherEmail" type="email" defaultValue={field(record, "teacher_email")} required maxLength={254} /></div>
    </div>
    <div className={styles.field}><label htmlFor="teacherPhone">Instructor phone</label><input id="teacherPhone" name="teacherPhone" type="tel" defaultValue={field(record, "teacher_phone")} maxLength={40} /></div>
   </fieldset>

   <div className={styles.field}><label htmlFor="notes">Questions, accessibility needs, or notes</label><textarea id="notes" name="notes" defaultValue={field(record, "notes")} maxLength={2000} /></div>
   <label className={styles.checkbox}><input type="checkbox" name="consentToContact" value="yes" defaultChecked={record ? Boolean(record.consent_to_contact) : true} required /><span>Contact consent recorded *</span></label>
   <div className={styles.recordActions}><button className={styles.button} type="submit">{submitLabel}</button><a className={styles.clearButton} href="/master-class/admin">Cancel</a></div>
  </form>
 );
}
