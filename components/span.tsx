import type { ReactNode } from 'react';
import classNames from 'classnames/bind'
import styles from './span.module.scss';

let cx = classNames.bind(styles);

type SpacingValue = string | number;

interface SpanProps {
	children?: ReactNode;
	display?: string;
	fontColor?: string;
	fontFamily?: string;
	fontSize?: string;
	fontStyle?: string;
	fontWeight?: string | number;
	letterSpacing?: string;
	textTransform?: string;
	marginBottom?: SpacingValue;
}

const Span = ({
	children, 
	display="inline-block", 
	fontColor,
	fontFamily="primary",
	fontSize,
	fontStyle="normal",
	fontWeight,
	letterSpacing = "normal",
	textTransform, 
	marginBottom
	}: SpanProps) => {
	let spanClasses = cx({
		span: true,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`text-transform-${textTransform}`]: textTransform,
		[`font-size-${fontSize}`] : fontSize,
		[`display-${display}`] : display,
		[`font-style-${fontStyle}`] : fontStyle,
		[`font-color-${fontColor}`] : fontColor,
		[`letter-spacing-${letterSpacing}`] : letterSpacing,
		[`margin-bottom-${marginBottom}`] : marginBottom,
		[`font-family-${fontFamily}`]: fontFamily
	});
	return <span className={spanClasses}>{children}</span>
}
export default Span
