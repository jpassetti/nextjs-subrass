import { useState } from 'react'

import Head from 'next/head'

import Nav from './nav'

import styles from './header.module.scss'
import Overlay from './overlay'

const Header = ({position}) => {
	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)
	return (
		<>
		<Head>
			<title>Syracuse University Brass Ensemble</title>
		</Head>
		<header className={styles.mobileHeader}>
				{isMobileMenuVisible && 
					<Overlay closeHandler={setMobileMenuVisible} />
				}
				<span onClick={() => {
					setMobileMenuVisible(true)
				}}>Menu icon</span>
		</header>
		<header className={styles.header}>
			
			<h1>Syracuse University<br />
			<span>Brass Ensemble</span></h1>
			<Nav />
			<Nav.SocialNav />
			<Nav.Members />
		</header>
		</>
	)
}
export default Header;
