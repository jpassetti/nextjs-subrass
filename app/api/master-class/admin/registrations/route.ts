import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import { getDatabase } from "../../../../../lib/neon";
import { isValidMasterClassRegistration, normalizeMasterClassRegistration } from "../../../../../lib/master-class-registration.mjs";

function sameOrigin(request: Request) {
 return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
 if (!(await isAdminAuthenticated())) return new NextResponse("Unauthorized", { status: 401 });
 if (!sameOrigin(request)) return new NextResponse("Forbidden", { status: 403 });
 const registration = normalizeMasterClassRegistration(Object.fromEntries(await request.formData()));
 if (!isValidMasterClassRegistration(registration)) return NextResponse.redirect(new URL("/master-class/admin/registrations/new?error=1", request.url), 303);
 const rows = await getDatabase().query(`insert into master_class_registrations (first_name, last_name, school, parent_name, parent_email, parent_phone, teacher_name, teacher_email, teacher_phone, email, phone, instrument, grade_level, notes, consent_to_contact) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning id`, [registration.firstName, registration.lastName, registration.school, registration.parentName, registration.parentEmail, registration.parentPhone, registration.teacherName, registration.teacherEmail, registration.teacherPhone || null, registration.email, registration.phone || null, registration.instrument, registration.gradeLevel, registration.notes || null, registration.consentToContact]);
 return NextResponse.redirect(new URL(`/master-class/admin/registrations/${rows[0].id}?saved=1`, request.url), 303);
}
