import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './row.module.scss';
let cx = classNames.bind(styles);

const Row = ({ children, justifyContent, marginBottom, alignItems, tableHeader, className}) => {
	let rowClasses = cx({
		row: true,
		[`justify-content-${justifyContent}`] : justifyContent,
		[`align-items-${alignItems}`] : alignItems,
		tableHeader: tableHeader,
		[`margin-bottom-${marginBottom}`] : marginBottom
	});
	return <div className={`${rowClasses} ${className}`}>{children}</div>
}
export default Row;
