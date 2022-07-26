import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './col.module.scss';

let cx = classNames.bind(styles);

const Col = ({ 
	children, 
	xs, 
	sm, 
	md, 
	lg, 
	xl, 
	position, 
	marginTop,
	marginRight,
	marginBottom="2",
	marginLeft,
	paddingTop,
	paddingRight="1",
	paddingBottom,
	paddingLeft="1"
}) => {
	
	let colClasses = cx({
		col: true,
		[`col__xs__${xs}`]: xs,
		[`col__sm__${sm}`]: sm,
		[`col__md__${md}`] : md,
		[`col__lg__${lg}`]: lg,
		[`col__xl__${xl}`]: xl,
		sticky : position === 'sticky',
		[`margin-top-${marginTop}`] : marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`padding-top-${paddingTop}`] : paddingTop,
		[`padding-right-${paddingRight}`]: paddingRight,
		[`padding-bottom-${paddingBottom}`]: paddingBottom,
		[`padding-left-${paddingLeft}`]: paddingLeft,
	});

	return <div className={colClasses}>{children}</div>
}
export default Col;
