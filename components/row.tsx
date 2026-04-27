import type { ReactNode } from 'react';
import classNames from 'classnames/bind';
import * as styles from './row.module.scss';
let cx = classNames.bind(styles);

type SpacingValue = string | number;

interface RowProps {
	alignItems?: string;
	borderBottom?: string | number;
	children?: ReactNode;
	className?: string;
	justifyContent?: string;
	marginBottom?: SpacingValue;
	marginTop?: SpacingValue;
	tableHeader?: boolean;
}

const Row = ({ 
	alignItems, 
	borderBottom,
	children, 
	className = '', 
	justifyContent, 
	marginBottom, 
	marginTop,
	tableHeader, 
}: RowProps) => {
	let rowClasses = cx({
		row: true,
		[`justify-content-${justifyContent}`] : justifyContent,
		[`align-items-${alignItems}`] : alignItems,
		tableHeader: tableHeader,
		[`margin-bottom-${marginBottom}`] : marginBottom,
		[`margin-top-${marginTop}`] : marginTop,
		[`border-bottom-${borderBottom}`] : borderBottom,
	});
	return <div className={`${rowClasses} ${className}`}>{children}</div>
}
export default Row;
