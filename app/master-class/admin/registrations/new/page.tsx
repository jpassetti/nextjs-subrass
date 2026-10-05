import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "../../../../../components/heading";
import Layout from "../../../../../components/layout";
import Section from "../../../../../components/section";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import RegistrationEditor from "../../registration-editor";
import styles from "../../../master-class.module.scss";

export const metadata = { title: "Add Master Class Registration", robots: { index: false, follow: false } };

export default async function NewRegistrationPage({ searchParams }) {
 if (!(await isAdminAuthenticated())) redirect("/master-class/admin/login");
 const params = await searchParams;
 return <Layout><Section><div className={styles.adminEditorPage}>
  <Link className={styles.backLink} href="/master-class/admin">&larr; Registration admin</Link>
  <Heading level={1} marginTop="3" marginBottom="2">Add Registration</Heading>
  <p className={styles.adminSubhead}>Manually add a high school master class registration.</p>
  {params?.error ? <div className={styles.error} role="alert">Please complete all required fields with valid email addresses.</div> : null}
  <RegistrationEditor action="/api/master-class/admin/registrations" submitLabel="Create registration" />
 </div></Section></Layout>;
}
