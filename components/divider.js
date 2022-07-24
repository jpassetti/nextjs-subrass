import classNames from 'classnames/bind';
import * as styles from './divider.module.scss';
let cx = classNames.bind(styles)

const Divider = () => {
	let dividerClasses = cx({
		diveder: true,
	});
	return (
		<hr className={dividerClasses}/>
	)
}
export default Divider;
