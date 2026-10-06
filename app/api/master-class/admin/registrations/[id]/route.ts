import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../../lib/admin-auth";
import { getDatabase } from "../../../../../../lib/neon";
import { isValidMasterClassRegistration, normalizeMasterClassRegistration } from "../../../../../../lib/master-class-registration.mjs";

function authorizedOrigin(request: Request) {
 return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request, { params }) {
 if (!(await isAdminAuthenticated())) return new NextResponse("Unauthorized", { status: 401 });
 if (!authorizedOrigin(request)) return new NextResponse("Forbidden", { status: 403 });
 const { id } = await params;
 if (!/^\d+$/.test(id)) return new NextResponse("Invalid registration", { status: 400 });
 const data = Object.fromEntries(await request.formData());
 const action = data._action;
 const sql = getDatabase();
 if (action === "archive") {
  await sql.query("update master_class_registrations set deleted_at = now(), updated_at = now() where id = $1", [id]);
  return NextResponse.redirect(new URL(`/master-class/admin/registrations/${id}?saved=1`, request.url), 303);
 }
 if (action === "restore") {
  await sql.query("update master_class_registrations set deleted_at = null, updated_at = now() where id = $1", [id]);
  return NextResponse.redirect(new URL(`/master-class/admin/registrations/${id}?saved=1`, request.url), 303);
 }
 const registration = normalizeMasterClassRegistration(data);
 if (!isValidMasterClassRegistration(registration)) return NextResponse.redirect(new URL(`/master-class/admin/registrations/${id}?error=1`, request.url), 303);
 await sql.query(`update master_class_registrations set first_name=$1,last_name=$2,school=$3,parent_name=$4,parent_email=$5,parent_phone=$6,teacher_name=$7,teacher_email=$8,teacher_phone=$9,email=$10,phone=$11,instrument=$12,grade_level=$13,notes=$14,consent_to_contact=$15,updated_at=now() where id=$16`, [registration.firstName, registration.lastName, registration.school, registration.parentName, registration.parentEmail, registration.parentPhone, registration.teacherName, registration.teacherEmail, registration.teacherPhone || null, registration.email, registration.phone || null, registration.instrument, registration.gradeLevel, registration.notes || null, registration.consentToContact, id]);
 return NextResponse.redirect(new URL(`/master-class/admin/registrations/${id}?saved=1`, request.url), 303);
}
