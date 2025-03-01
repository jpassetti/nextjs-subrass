import styles from "./showcase.module.scss";
import Image from "next/image";

const Showcase = ({ children }) => {
 return (
  <div className={styles.showcase}>
   <Image
    src="/syracuse-university-brass-ensemble-2023.jpg"
    alt="Syracuse University Brass Ensemble performing live"
    layout="fill"
    objectFit="cover"
    priority
   />
   <div className={styles.overlay}></div>
   <div className={styles.content}>
    <div className={styles.line}></div>
    <p>
     The Syracuse University Brass Ensemble (SUBE) is a group of 35
     professional-level brass and percussion musicians; members include Syracuse
     University faculty, staff, and students, the State University of New York
     Upstate Medical University faculty and staff, and accomplished musicians
     from Upstate New York communities.
    </p>
   </div>
  </div>
 );
};

export default Showcase;
