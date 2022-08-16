import classNames from 'classnames/bind';
import * as styles from './paragraph.module.scss';

let cx = classNames.bind(styles);

const Paragraph = ({
	type, 
	children, 
	className,
	marginBottom, 
}) => {

	let paragraphClasses = cx({
		paragraph: true,
		intro: type === 'intro',
		[`margin-bottom-${marginBottom}`] : marginBottom
	});
	return <p className={`${paragraphClasses} ${className}`}>{children}</p>
}
export default Paragraph;
