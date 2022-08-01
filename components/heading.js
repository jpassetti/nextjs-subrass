import classNames from 'classnames/bind'
import styles from './heading.module.scss';

let cx = classNames.bind(styles);

const Heading = ({
	borderTop,
	children, 
	className,
	color="blue", 
	fontFamily = "primary",
	fontStyle = "normal",
	fontWeight = "bold",
	level, 
	lineHeight = "normal",
	marginTop, 
	marginBottom, 
	marginLeft, 
	marginRight, 
	textAlign = "left", 
	textTransform,
}) => {
	const Tag = level > 6 ? 'h6' : `h${level}`

	let headingClasses = cx({
		heading: true,
		[`${Tag}`]: level,
		[`text-align-${textAlign}`] : textAlign,
		[`margin-top-${marginTop}`] : marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`border-top-${borderTop}`] : borderTop,
		[`text-transform-${textTransform}`] : textTransform,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`font-color-${color}`] : color,
		[`font-style-${fontStyle}`] : fontStyle,
		[`line-height-${lineHeight}`] : lineHeight,
		[`font-family-${fontFamily}`] : fontFamily
	});

	return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>
}
export default Heading
