import Heading from "../../../../components/heading";
import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import styles from "../../master-class.module.scss";

export const metadata = { title: "Master Class Administration", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }) {
 const params = await searchParams;
 return (
  <Layout><Section><div className={styles.content}>
   <Heading level={1} marginTop="8" marginBottom="4">Master Class Administration</Heading>
   {params?.error && <div className={styles.error} role="alert">The password was incorrect.</div>}
   <form className={styles.login} action="/api/master-class/admin/login" method="post">
    <div className={styles.field}>
     <label htmlFor="password">Administrator password</label>
     <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
    </div>
    <button className={styles.button}>Sign in</button>
   </form>
  </div></Section></Layout>
 );
}
