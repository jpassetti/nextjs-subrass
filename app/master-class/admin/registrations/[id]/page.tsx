import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Heading from "../../../../../components/heading";
import Layout from "../../../../../components/layout";
import Section from "../../../../../components/section";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import { getDatabase } from "../../../../../lib/neon";
import RegistrationEditor from "../../registration-editor";
import styles from "../../../master-class.module.scss";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Master Class Registration", robots: { index: false, follow: false } };

export default async function EditRegistrationPage({ params, searchParams }) {
 if (!(await isAdminAuthenticated())) redirect("/master-class/admin/login");
 const { id } = await params;
 if (!/^\d+$/.test(id)) notFound();
 const rows = await getDatabase().query("select * from master_class_registrations where id = $1 limit 1", [id]);
 const record = rows[0];
 if (!record) notFound();
 const query = await searchParams;
 return <Layout><Section><div className={styles.adminEditorPage}>
  <Link className={styles.backLink} href="/master-class/admin">&larr; Registration admin</Link>
  <div className={styles.editorHeading}><div><Heading level={1} marginTop="3" marginBottom="1">Edit Registration</Heading><p className={styles.adminSubhead}>Record #{id} · Submitted {new Date(String(record.created_at)).toLocaleString("en-US", { timeZone: "America/New_York" })}</p></div>{record.deleted_at ? <span className={styles.archivedStatus}>Archived</span> : <span className={styles.activeStatus}>Active</span>}</div>
  {query?.saved ? <div className={styles.notice} role="status">Registration updated successfully.</div> : null}
  {query?.error ? <div className={styles.error} role="alert">Please complete all required fields with valid email addresses.</div> : null}
  <RegistrationEditor action={`/api/master-class/admin/registrations/${id}`} record={record} submitLabel="Save changes" />
  <section className={styles.archivePanel}>
   <div><h2>{record.deleted_at ? "Restore registration" : "Archive registration"}</h2><p>{record.deleted_at ? "Return this registration to the active admin list." : "Remove this registration from the active list without permanently deleting its data."}</p></div>
   <form action={`/api/master-class/admin/registrations/${id}`} method="post"><input type="hidden" name="_action" value={record.deleted_at ? "restore" : "archive"} /><button className={record.deleted_at ? styles.button : styles.archiveButton} type="submit">{record.deleted_at ? "Restore registration" : "Archive registration"}</button></form>
  </section>
 </div></Section></Layout>;
}
