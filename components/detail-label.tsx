import type { ReactNode } from "react";
import Heading from "./heading";
import styles from "./detail-label.module.scss";

type DetailLabelProps = {
 as?: "dt" | "h2";
 children: ReactNode;
};

export default function DetailLabel({ as = "dt", children }: DetailLabelProps) {
 if (as === "h2") {
  return <Heading level={2} className={styles.label} marginBottom={1} textAlign="center">{children}</Heading>;
 }

 return <dt className={styles.label}>{children}</dt>;
}
