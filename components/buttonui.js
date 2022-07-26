import Image from 'next/image'

import classNames from 'classnames/bind'
import styles from './buttonui.module.scss'

let cx = classNames.bind(styles);

const ButtonUI = ({icon, clickHandler}) => {
	let buttonuiClasses = cx({
		buttonui: true,
		[`close`]: icon === "close"

	})
	return <button className={buttonuiClasses} onClick={clickHandler}>
		<Image 
			src={`/icons/${icon}.svg`}
			alt={`${icon} icon`}
			width={32}
			height={32}
		/>
	</button>
}
export default ButtonUI
