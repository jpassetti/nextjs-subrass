import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './col.module.scss';

let cx = classNames.bind(styles);

const Col = ({ children, sm, md, lg, xl, position }) => {
	
	let colClasses = cx({
		col: true,
		[`col__sm__${sm}`]: sm,
		[`col__md__${md}`] : md,
		[`col__lg__${lg}`]: lg,
		[`col__xl__${xl}`]: xl,
		sticky : position === 'sticky'
	});

	return <div className={colClasses}>{children}</div>
}
export default Col;
