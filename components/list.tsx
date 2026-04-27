// @ts-nocheck
import classNames from "classnames/bind";
import styles from "./list.module.scss";

let cx = classNames.bind(styles);

const List = ({ children, includeBullets = false, className = "" }) => {
 const listClasses = cx({
  list: true,
  bullets: includeBullets, // ✅ Conditionally add "bullets" class
 });

 return <ul className={`${listClasses} ${className}`.trim()}>{children}</ul>;
};

export default List;
