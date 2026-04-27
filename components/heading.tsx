import { createElement } from "react";
import type { JSX, ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./heading.module.scss";

let cx = classNames.bind(styles);

type SpacingValue = string | number;

interface HeadingProps {
 borderTop?: string | number;
 children?: ReactNode;
 className?: string;
 color?: string;
 fontFamily?: string;
 fontStyle?: string;
 fontWeight?: string | number;
 level?: number;
 lineHeight?: string;
 marginTop?: SpacingValue;
 marginBottom?: SpacingValue;
 marginLeft?: SpacingValue;
 marginRight?: SpacingValue;
 textAlign?: string;
 textTransform?: string;
}

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
}: HeadingProps) => {
 // Ensure the heading level always maps to a valid intrinsic heading tag.
 const safeLevel = Number(level) >= 1 && Number(level) <= 6 ? Number(level) : 6;
 const tagName = `h${safeLevel}` as keyof JSX.IntrinsicElements;

 let headingClasses = cx({
  heading: true,
    [`${tagName}`]: true,
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

 return createElement(
  tagName,
  { className: `${headingClasses} ${className}`.trim() },
  children
 );
};

export default Heading;
