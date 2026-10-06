export const MASTER_CLASS_EXPORT_HEADINGS = [
 "Submitted",
 "First name",
 "Last name",
 "School name",
 "Student email",
 "Student phone",
 "Parent or guardian name",
 "Parent or guardian email",
 "Parent or guardian phone",
 "Music instructor",
 "Instructor email",
 "Instructor phone",
 "Instrument",
 "Grade level",
 "Notes",
];

export function csvCell(value) {
 const raw = value == null ? "" : String(value);
 const safe = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
 return `"${safe.replaceAll('"', '""')}"`;
}

export function masterClassRegistrationToCsvRow(row) {
 return [
  row.created_at,
  row.first_name,
  row.last_name,
  row.school,
  row.email,
  row.phone,
  row.parent_name,
  row.parent_email,
  row.parent_phone,
  row.teacher_name,
  row.teacher_email,
  row.teacher_phone,
  row.instrument,
  row.grade_level,
  row.notes,
 ];
}

export function masterClassRegistrationsToCsv(rows) {
 const header = MASTER_CLASS_EXPORT_HEADINGS.map(csvCell).join(",");
 const lines = rows.map((row) => masterClassRegistrationToCsvRow(row).map(csvCell).join(","));
 return [header, ...lines].join("\r\n");
}
