// @ts-nocheck
"use client";

import styles from "./footer.module.scss";
import Nav from "./nav";

const Footer = () => {
 return (
  <footer className={styles.footer}>
   <Nav.Legal />
  </footer>
 );
};
export default Footer;
