const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HIGH_SCHOOL_GRADES = new Set(["9", "10", "11", "12"]);

function text(value, maxLength) {
 return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function normalizeMasterClassRegistration(body = {}) {
 const selectedInstrument = text(body.instrument, 80);
 const instrument = selectedInstrument === "Other" ? text(body.otherInstrument, 80) : selectedInstrument;

 return {
  firstName: text(body.firstName, 80),
  lastName: text(body.lastName, 80),
  school: text(body.school, 160),
  teacherName: text(body.teacherName, 160),
  teacherEmail: text(body.teacherEmail, 254).toLowerCase(),
  teacherPhone: text(body.teacherPhone, 40),
  email: text(body.email, 254).toLowerCase(),
  phone: text(body.phone, 40),
  parentName: text(body.parentName, 160),
  parentEmail: text(body.parentEmail, 254).toLowerCase(),
  parentPhone: text(body.parentPhone, 40),
  instrument,
  gradeLevel: text(body.gradeLevel, 40),
  notes: text(body.notes, 2000),
  registrationSource: text(body.registrationSource, 20) === "educator" ? "educator" : "individual",
  consentToContact: body.consentToContact === "yes",
  website: text(body.website, 200),
 };
}

export function isValidMasterClassRegistration(registration) {
 if (registration.registrationSource === "educator") {
  return Boolean(
   registration.firstName &&
   registration.lastName &&
   registration.school &&
   registration.teacherName &&
   EMAIL_PATTERN.test(registration.teacherEmail) &&
   registration.instrument &&
   HIGH_SCHOOL_GRADES.has(registration.gradeLevel) &&
   registration.consentToContact &&
   (!registration.email || EMAIL_PATTERN.test(registration.email))
  );
 }

 return Boolean(
  registration.firstName &&
  registration.lastName &&
  registration.school &&
  registration.parentName &&
  EMAIL_PATTERN.test(registration.parentEmail) &&
  registration.parentPhone &&
  registration.teacherName &&
  EMAIL_PATTERN.test(registration.teacherEmail) &&
  registration.instrument &&
  HIGH_SCHOOL_GRADES.has(registration.gradeLevel) &&
  registration.consentToContact &&
  EMAIL_PATTERN.test(registration.email)
 );
}

export function normalizeEducatorMasterClassRegistration(body = {}) {
 const students = Array.isArray(body.students) ? body.students.slice(0, 50) : [];

 return {
  educatorName: text(body.educatorName, 160),
  educatorEmail: text(body.educatorEmail, 254).toLowerCase(),
  educatorPhone: text(body.educatorPhone, 40),
  school: text(body.school, 160),
  notes: text(body.notes, 2000),
  consentToContact: body.consentToContact === "yes" || body.consentToContact === true,
  website: text(body.website, 200),
  students: students.map((student) => {
   const selectedInstrument = text(student?.instrument, 80);
   return {
    firstName: text(student?.firstName, 80),
    lastName: text(student?.lastName, 80),
    email: text(student?.email, 254).toLowerCase(),
    instrument: selectedInstrument === "Other" ? text(student?.otherInstrument, 80) : selectedInstrument,
    gradeLevel: text(student?.gradeLevel, 40),
   };
  }),
 };
}

export function isValidEducatorMasterClassRegistration(registration) {
 return Boolean(
  registration.educatorName &&
  EMAIL_PATTERN.test(registration.educatorEmail) &&
  registration.school &&
  registration.consentToContact &&
  registration.students.length > 0 &&
  registration.students.length <= 50 &&
  registration.students.every((student) =>
   student.firstName &&
   student.lastName &&
   student.instrument &&
   HIGH_SCHOOL_GRADES.has(student.gradeLevel) &&
   (!student.email || EMAIL_PATTERN.test(student.email))
  )
 );
}
