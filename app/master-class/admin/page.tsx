import { redirect } from "next/navigation";
import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import Section from "../../../components/section";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import { getDatabase } from "../../../lib/neon";
import styles from "../master-class.module.scss";

export const dynamic = "force-dynamic";
export const metadata = { title: "Master Class Registrations", robots: { index: false, follow: false } };

export default async function MasterClassAdminPage() {
 if (!(await isAdminAuthenticated())) redirect("/master-class/admin/login");
 const sql = getDatabase();
 const rows = await sql`select * from master_class_registrations order by created_at desc limit 500`;

 return (
  <Layout><Section><div className={styles.content}>
   <div className={styles.adminHeader}>
    <Heading level={1} marginTop="8" marginBottom="4">Master Class Registrations</Heading>
    <div className={styles.adminActions}>
     <a className={styles.linkButton} href="/api/master-class/admin/export">Download CSV</a>
     <form action="/api/master-class/admin/logout" method="post"><button className={styles.button}>Sign out</button></form>
    </div>
   </div>
   <p className={styles.small}>{rows.length} registration{rows.length === 1 ? "" : "s"} shown.</p>
   <div className={styles.tableWrap}>
    <table className={styles.table}>
     <thead><tr><th>Submitted</th><th>Student</th><th>Student contact</th><th>School</th><th>Music instructor</th><th>Instrument</th><th>Grade</th><th>Notes</th></tr></thead>
     <tbody>{rows.map((row) => (
      <tr key={String(row.id)}>
       <td>{new Date(String(row.created_at)).toLocaleString("en-US", { timeZone: "America/New_York" })}</td>
       <td>{String(row.first_name)} {String(row.last_name)}</td>
       <td><a href={`mailto:${row.email}`}>{String(row.email)}</a>{row.phone && <><br /><a href={`tel:${row.phone}`}>{String(row.phone)}</a></>}</td>
       <td>{String(row.school)}</td>
       <td>{row.teacher_name ? String(row.teacher_name) : "—"}{row.teacher_email && <><br /><a href={`mailto:${row.teacher_email}`}>{String(row.teacher_email)}</a></>}{row.teacher_phone && <><br /><a href={`tel:${row.teacher_phone}`}>{String(row.teacher_phone)}</a></>}</td>
       <td>{String(row.instrument)}</td><td>{row.grade_level ? String(row.grade_level) : "—"}</td>
       <td>{row.notes ? String(row.notes) : "—"}</td>
      </tr>
     ))}</tbody>
    </table>
   </div>
  </div></Section></Layout>
 );
}
