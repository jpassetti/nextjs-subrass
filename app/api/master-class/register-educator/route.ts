import { NextResponse } from "next/server";

import { getDatabase } from "../../../../lib/neon";
import { sendMasterClassNotification } from "../../../../lib/master-class-notification.mjs";
import {
 isValidEducatorMasterClassRegistration,
 normalizeEducatorMasterClassRegistration,
} from "../../../../lib/master-class-registration.mjs";

export async function POST(request: Request) {
 try {
  const body = await request.json();
  const registration = normalizeEducatorMasterClassRegistration(body);
  if (registration.website) return NextResponse.json({ success: true });

  if (!isValidEducatorMasterClassRegistration(registration)) {
   return NextResponse.json({ message: "Please complete the educator information and all required student fields." }, { status: 400 });
  }

  const sql = getDatabase();
  const groupId = crypto.randomUUID();
  const results = await sql.transaction((transaction) => registration.students.map((student) => transaction`
   insert into master_class_registrations
    (first_name, last_name, school, parent_name, parent_email, parent_phone, teacher_name, teacher_email, teacher_phone, email, phone, instrument, grade_level, notes, consent_to_contact, registration_source, registration_group_id)
   values
    (${student.firstName}, ${student.lastName}, ${registration.school}, ${null}, ${null}, ${null}, ${registration.educatorName}, ${registration.educatorEmail}, ${registration.educatorPhone || null},
     ${student.email || null}, ${null}, ${student.instrument}, ${student.gradeLevel}, ${registration.notes || null}, ${registration.consentToContact}, ${"educator"}, ${groupId})
   returning id
  `));

  try {
   await sendMasterClassNotification({ registrationId: `group-${groupId}` });
  } catch (notificationError) {
   console.error("Master class educator notification failed", notificationError);
  }

  return NextResponse.json({ success: true, count: results.length }, { status: 201 });
 } catch (error) {
  console.error("Master class educator registration failed", error);
  return NextResponse.json({ message: "Registration is temporarily unavailable. Please try again later." }, { status: 500 });
 }
}
