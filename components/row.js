import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './row.module.scss';
let cx = classNames.bind(styles);

const Row = ({ children, justifyContentSpaceBetween, alignItemsCenter, tableHeader, className}) => {
	let rowClasses = cx({
		row: true,
		justifyContentSpaceBetween: justifyContentSpaceBetween,
		alignItemsCenter: alignItemsCenter,
		tableHeader: tableHeader
	});
	return <div className={`${rowClasses} ${className}`}>{children}</div>
}
export default Row;
