import assert from "node:assert/strict";
import test from "node:test";

import {
 MASTER_CLASS_EXPORT_HEADINGS,
 csvCell,
 masterClassRegistrationsToCsv,
} from "../lib/master-class-export.mjs";

test("exports all student and instructor columns in a stable order", () => {
 assert.deepEqual(MASTER_CLASS_EXPORT_HEADINGS, [
  "Submitted", "First name", "Last name", "School name", "Student email", "Student phone", "Parent or guardian name", "Parent or guardian email", "Parent or guardian phone",
  "Music instructor", "Instructor email", "Instructor phone", "Instrument", "Grade level", "Notes",
 ]);
});

test("escapes quotes and spreadsheet formulas in CSV cells", () => {
 assert.equal(csvCell('Director "Doc" Smith'), '"Director ""Doc"" Smith"');
 assert.equal(csvCell("=HYPERLINK(\"bad\")"), '"\'=HYPERLINK(""bad"")"');
 assert.equal(csvCell(null), '""');
});

test("creates a complete CSV with instructor contact information", () => {
 const csv = masterClassRegistrationsToCsv([{
  created_at: "2026-10-05T12:00:00Z",
  first_name: "Jordan",
  last_name: "Student",
  school: "Central High School",
  email: "student@example.edu",
  phone: "315-555-0100",
  parent_name: "Taylor Student",
  parent_email: "parent@example.edu",
  parent_phone: "315-555-0110",
  teacher_name: "Morgan Director",
  teacher_email: "director@example.edu",
  teacher_phone: "315-555-0200",
  instrument: "Trumpet",
  grade_level: "10",
  notes: "Ready",
 }]);

 assert.match(csv, /"Music instructor","Instructor email","Instructor phone"/);
 assert.match(csv, /"Taylor Student","parent@example\.edu","315-555-0110"/);
 assert.match(csv, /"Morgan Director","director@example\.edu","315-555-0200"/);
 assert.equal(csv.split("\r\n").length, 2);
});
