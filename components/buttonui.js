import Image from 'next/image'

import classNames from 'classnames/bind'
import styles from './buttonui.module.scss'

let cx = classNames.bind(styles);

const ButtonUI = ({
	backgroundColor="white",
	children, 
	clickHandler,
	icon, 
	isActive=true
}) => {
	let buttonuiClasses = cx({
		buttonui: true,
		[`close`]: icon === "close",
		['active'] : isActive,
		[`background-color-blue`] : backgroundColor === "blue",

	})
	return <button className={buttonuiClasses} onClick={clickHandler}>
		{icon && <Image 
			src={`/icons/${icon}.svg`}
			alt={`${icon} icon`}
			width={32}
			height={32}
		/>}
		{children}
	</button>
}
export default ButtonUI
