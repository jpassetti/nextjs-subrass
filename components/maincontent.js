import classNames from 'classnames/bind'

import ContentParser from '../lib/parser'

import Div from './div'

import styles from './maincontent.module.scss'

let cx = classNames.bind(styles)

const MainContent = ({ content, children }) => {
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
