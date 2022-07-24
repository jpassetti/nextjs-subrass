import classNames from 'classnames/bind'
import * as styles from './heading.module.scss';

let cx = classNames.bind(styles);

const Heading = ({level, children, className}) => {
	const Tag = level > 6 ? 'h6' : `h${level}`

	let headingClasses = cx({
		heading: true,
		[`${Tag}`]: level,
	});

	return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>
}
export default Heading
