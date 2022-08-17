import Image from 'next/image'

import classNames from 'classnames/bind';
import * as styles from './listitem.module.scss';

let cx = classNames.bind(styles);

const ListItem = ({ children, className, type }) => {
	let listItemClasses = cx({
		listitem: true,
	});
	const getIconName = () => {
		if (type === "date") {
			return "calendar"
		} else if (type === "time") {
			return "clock"
		} else if (type === "location") {
			return "marker"
		}
	}
	return <li className={`${listItemClasses} ${className}`}>
				<div className={styles.listicon}>
					<Image
						src={`/icons/${getIconName()}.svg`} // Route of the image file
						height={32} // Desired size with correct aspect ratio
						width={32} // Desired size with correct aspect ratio
						alt="Date icon"
						/>
				</div>
				<div className={styles.listcontent}>
				{children}
				</div>
			</li>
}
export default ListItem;
