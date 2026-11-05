import { NextResponse } from "next/server";

import { getDatabase } from "../../../../lib/neon";
import { sendMasterClassNotification } from "../../../../lib/master-class-notification.mjs";
import {
 isValidCommunityMasterClassRegistration,
 normalizeCommunityMasterClassRegistration,
} from "../../../../lib/master-class-registration.mjs";

export async function POST(request: Request) {
 try {
  const body = await request.json();
  const registration = normalizeCommunityMasterClassRegistration(body);
  if (registration.website) return NextResponse.json({ success: true });

  if (!isValidCommunityMasterClassRegistration(registration)) {
   return NextResponse.json({ message: "Please complete all required fields with a valid email address." }, { status: 400 });
  }

  const sql = getDatabase();
  const insertedRows = await sql`
   insert into master_class_registrations
    (first_name, last_name, school, email, phone, instrument, notes, consent_to_contact, registration_source)
   values
    (${registration.firstName}, ${registration.lastName}, ${registration.affiliation || "Independent musician"}, ${registration.email},
     ${registration.phone || null}, ${registration.instrument}, ${registration.notes || null}, ${registration.consentToContact}, ${"community"})
   returning id
  `;

  try {
   await sendMasterClassNotification({ registrationId: String(insertedRows[0]?.id || "unknown") });
  } catch (notificationError) {
   console.error("Master class community-musician notification failed", notificationError);
  }

  return NextResponse.json({ success: true }, { status: 201 });
 } catch (error) {
  console.error("Master class community-musician registration failed", error);
  return NextResponse.json({ message: "Registration is temporarily unavailable. Please try again later." }, { status: 500 });
 }
}
