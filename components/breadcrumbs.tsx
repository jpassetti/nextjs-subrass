import Link from "next/link";
import styles from "./breadcrumbs.module.scss";

type BreadcrumbItem = {
 label: string;
 href?: string;
};

export default function Breadcrumbs({
 items,
 theme = "light",
 overlay = false,
}: {
 items: BreadcrumbItem[];
 theme?: "light" | "dark";
 overlay?: boolean;
}) {
 return (
  <nav
   className={`${styles.breadcrumbs} ${theme === "dark" ? styles.dark : ""} ${overlay ? styles.overlay : ""}`}
   aria-label="Breadcrumb"
  >
   <ol>
    {items.map((item, index) => {
     const isCurrent = index === items.length - 1;
     return (
      <li key={`${item.label}-${index}`}>
       {item.href && !isCurrent ? (
        <Link href={item.href}>{item.label}</Link>
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
