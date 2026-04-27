// @ts-nocheck
"use client";

import { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion';

import Nav from './nav'

import styles from './header.module.scss'
import Overlay from './overlay'
import ButtonUI from './buttonui'

// context
import { ModalContext } from '../lib/context';
import Link from 'next/link';

const Header = ({position}) => {
	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
	const [isModalOpen, setModalOpen] = useContext(ModalContext);

	return (
		<>
		<AnimatePresence>
				{isMobileMenuVisible && 
					<Overlay closeHandler={() => {
						setMobileMenuVisible(false);
						setModalOpen(false);
					}} />
				}
				</AnimatePresence>
		<header className={styles.mobileHeader}>
				<ButtonUI icon="menu" clickHandler={() => {
					setMobileMenuVisible(true);
					setModalOpen(true);
				}} /><h1>
					<Link href="/">Syracuse University<br />
					<span>Brass Ensemble</span>
				</Link></h1>
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
