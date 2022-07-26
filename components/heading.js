import classNames from 'classnames/bind'
import styles from './heading.module.scss';

let cx = classNames.bind(styles);

const Heading = ({
	level, 
	children, 
	className, 
	textAlign="left", 
	marginTop, 
	marginBottom, 
	marginLeft, 
	marginRight, 
	borderTop,
	textTransform
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
		[`text-transform-${textTransform}`] : textTransform
	});

	return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>
}
export default Heading
