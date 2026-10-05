import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import { buildMasterClassRegistrationWhere, getMasterClassRegistrationOrder, parseMasterClassAdminFilters } from "../../../../../lib/master-class-admin.mjs";
import { masterClassRegistrationsToCsv } from "../../../../../lib/master-class-export.mjs";
import { getDatabase } from "../../../../../lib/neon";

export async function GET(request: Request) {
 if (!(await isAdminAuthenticated())) return new NextResponse("Unauthorized", { status: 401 });

 const filters = parseMasterClassAdminFilters(new URL(request.url).searchParams);
 const where = buildMasterClassRegistrationWhere(filters);
 const orderBy = getMasterClassRegistrationOrder(filters);
 const sql = getDatabase();
 const rows = await sql.query(`select * from master_class_registrations ${where.clause} order by ${orderBy}`, where.values);
 const csv = masterClassRegistrationsToCsv(rows);

 return new NextResponse(csv, {
  headers: {
   "Content-Type": "text/csv; charset=utf-8",
   "Content-Disposition": `attachment; filename="master-class-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
   "Cache-Control": "no-store",
  },
 });
}
