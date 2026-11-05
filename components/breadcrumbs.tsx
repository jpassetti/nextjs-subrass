import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./breadcrumbs.module.scss";

type BreadcrumbItem = {
 label: string;
 href?: string;
};

export default function Breadcrumbs({
 items,
 theme = "light",
 overlay = false,
 gutter = "none",
}: {
 items: BreadcrumbItem[];
 theme?: "light" | "dark";
 overlay?: boolean;
 gutter?: "none" | "page";
}) {
 return (
  <nav
   className={`${styles.breadcrumbs} ${theme === "dark" ? styles.dark : ""} ${overlay ? styles.overlay : ""} ${gutter === "page" ? styles.pageGutter : ""}`}
   aria-label="Breadcrumb"
  >
   <ol>
    {items.map((item, index) => {
     const isCurrent = index === items.length - 1;
     return (
      <li key={`${item.label}-${index}`}>
       {item.href && !isCurrent ? (
        item.href === "/" ? (
         <Link className={styles.breadcrumbHome} href={item.href} aria-label={item.label}>
          <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
         </Link>
        ) : (
         <Link href={item.href}>{item.label}</Link>
        )
       ) : (
        <span aria-current={isCurrent ? "page" : undefined}>{item.label}</span>
       )}
      </li>
     );
    })}
   </ol>
  </nav>
 );
}
