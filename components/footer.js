import styles from "./footer.module.scss";
import Section from "./section";

const Footer = () => {
 const currentYear = new Date().getFullYear();
 return (
  <footer className={styles.footer}>
   <Section>Copyright {currentYear}, Syracuse University.</Section>
  </footer>
 );
};
export default Footer;
