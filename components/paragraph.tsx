import type { ReactNode } from 'react';
import classNames from 'classnames/bind';
import * as styles from './paragraph.module.scss';

let cx = classNames.bind(styles);

type SpacingValue = string | number;

interface ParagraphProps {
	type?: string;
	children?: ReactNode;
	className?: string;
	diminish?: boolean;
	marginBottom?: SpacingValue;
	marginTop?: SpacingValue;
}

const Paragraph = ({
	type, 
	children, 
	className = '',
	diminish,
	marginBottom=1, 
	marginTop,
}: ParagraphProps) => {

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
