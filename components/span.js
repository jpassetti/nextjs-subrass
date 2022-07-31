import classNames from 'classnames/bind'
import styles from './span.module.scss';

let cx = classNames.bind(styles);

const Span = ({children, fontWeight, textTransform, fontSize}) => {
	let spanClasses = cx({
		span: true,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`text-transform-${textTransform}`]: textTransform,
		[`font-size-${fontSize}`] : fontSize
	});
	return <span className={spanClasses}>{children}</span>
}
export default Span
