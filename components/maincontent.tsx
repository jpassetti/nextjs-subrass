import type { ReactNode } from 'react'
import classNames from 'classnames/bind'

import ContentParser from '../lib/parser'

import Div from './div'

import styles from './maincontent.module.scss'

let cx = classNames.bind(styles)

interface MainContentProps {
	content?: string
	children?: ReactNode
}

const MainContent = ({ content, children }: MainContentProps) => {
	let mainContentClasses = cx({
		[`main-content`]: true
	});
	return <Div name="main-content" id="mainContent" className={mainContentClasses}>
		{content ? <ContentParser content={content} />
			: children
		}
	</Div>
}

export default MainContent;
