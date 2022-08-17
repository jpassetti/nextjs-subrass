import classNames from 'classnames/bind';
import * as styles from './paragraph.module.scss';

let cx = classNames.bind(styles);

const Paragraph = ({
	type, 
	children, 
	className,
	diminish,
	marginBottom, 
	marginTop,
}) => {

	let paragraphClasses = cx({
		paragraph: true,
		intro: type === 'intro',
		[`margin-bottom-${marginBottom}`] : marginBottom,
		[`margin-top-${marginTop}`]: marginTop,
		diminish : diminish
	});
	return <p className={`${paragraphClasses} ${className}`}>{children}</p>
}
export default Paragraph;
