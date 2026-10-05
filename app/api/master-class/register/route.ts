import { NextResponse } from "next/server";
import { getDatabase } from "../../../../lib/neon";
import { isValidMasterClassRegistration, normalizeMasterClassRegistration } from "../../../../lib/master-class-registration.mjs";

export async function POST(request: Request) {
 try {
  const body = await request.json();
  const registration = normalizeMasterClassRegistration(body);
  if (registration.website) return NextResponse.json({ success: true });

  if (!isValidMasterClassRegistration(registration)) {
   return NextResponse.json({ message: "Please complete all required fields with a valid email address." }, { status: 400 });
  }

  const sql = getDatabase();
  await sql`
   insert into master_class_registrations
    (first_name, last_name, school, teacher_name, teacher_email, teacher_phone, email, phone, instrument, grade_level, notes, consent_to_contact)
   values
    (${registration.firstName}, ${registration.lastName}, ${registration.school}, ${registration.teacherName},
     ${registration.teacherEmail}, ${registration.teacherPhone || null}, ${registration.email}, ${registration.phone || null}, ${registration.instrument}, ${registration.gradeLevel || null},
     ${registration.notes || null}, ${registration.consentToContact})
  `;

  return NextResponse.json({ success: true }, { status: 201 });
 } catch (error) {
  console.error("Master class registration failed", error);
  return NextResponse.json({ message: "Registration is temporarily unavailable. Please try again later." }, { status: 500 });
 }
}
