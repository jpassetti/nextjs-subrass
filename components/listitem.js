import Image from "next/image";
import classNames from "classnames/bind";
import * as styles from "./listitem.module.scss";

let cx = classNames.bind(styles);

const ListItem = ({ children, className = "", type, showBullet = false }) => {
 let listItemClasses = cx({
  listitem: true,
  bullet: showBullet && !type, // ✅ Show bullets only when no icon is present
 });

 // ✅ Icon lookup for specific types
 const icons = {
  date: "calendar",
  time: "clock",
  location: "marker",
 };

 const iconName = icons[type]; // Get icon name if type matches

 return (
  <li className={`${listItemClasses} ${className}`.trim()}>
   {iconName && (
    <div className={styles.listicon}>
     <Image
      src={`/icons/${iconName}.svg`}
      height={32}
      width={32}
      alt={`${type} icon`}
     />
    </div>
   )}
   <div className={styles.listcontent}>{children}</div>
  </li>
 );
};

export default ListItem;
