import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head'

import Nav from './nav'

import styles from './header.module.scss'
import Overlay from './overlay'
import ButtonUI from './buttonui'

const Header = ({position}) => {
	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
	
	return (
		<>
		<Head>
			<title>Syracuse University Brass Ensemble</title>
		</Head>
		<header className={styles.mobileHeader}>
				<AnimatePresence>
				{isMobileMenuVisible && 
					<Overlay closeHandler={setMobileMenuVisible} />
				}
				</AnimatePresence>
				<ButtonUI icon="menu" clickHandler={() => {
					setMobileMenuVisible(true)
				}} />
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
