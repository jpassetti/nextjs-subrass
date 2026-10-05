import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import { masterClassRegistrationsToCsv } from "../../../../../lib/master-class-export.mjs";
import { getDatabase } from "../../../../../lib/neon";

export async function GET() {
 if (!(await isAdminAuthenticated())) return new NextResponse("Unauthorized", { status: 401 });

 const sql = getDatabase();
 const rows = await sql`select * from master_class_registrations order by created_at desc`;
 const csv = masterClassRegistrationsToCsv(rows);

 return new NextResponse(csv, {
  headers: {
   "Content-Type": "text/csv; charset=utf-8",
   "Content-Disposition": `attachment; filename="master-class-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
   "Cache-Control": "no-store",
  },
 });
}
