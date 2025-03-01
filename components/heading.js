import classNames from "classnames/bind";
import styles from "./heading.module.scss";

let cx = classNames.bind(styles);

const Heading = ({
 borderTop,
 children,
 className = "",
 color = "blue",
 fontFamily = "primary",
 fontStyle = "normal",
 fontWeight = "bold",
 level = 2, // ✅ Default level for robustness
 lineHeight = "normal",
 marginTop,
 marginBottom,
 marginLeft,
 marginRight,
 textAlign = "left",
 textTransform,
}) => {
 // ✅ Ensure the tag is within h1-h6 range
 const Tag = level >= 1 && level <= 6 ? `h${level}` : "h6";

 let headingClasses = cx({
  heading: true,
  [`${Tag}`]: true,
  [`text-align-${textAlign}`]: textAlign,
  [`margin-top-${marginTop}`]: marginTop,
  [`margin-right-${marginRight}`]: marginRight,
  [`margin-bottom-${marginBottom}`]: marginBottom,
  [`margin-left-${marginLeft}`]: marginLeft,
  [`border-top-${borderTop}`]: borderTop,
  [`text-transform-${textTransform}`]: textTransform,
  [`font-weight-${fontWeight}`]: fontWeight,
  [`font-color-${color}`]: color,
  [`font-style-${fontStyle}`]: fontStyle,
  [`line-height-${lineHeight}`]: lineHeight,
  [`font-family-${fontFamily}`]: fontFamily,
 });

 return (
  <Tag className={`${headingClasses} ${className}`.trim()}>{children}</Tag>
 );
};

export default Heading;
