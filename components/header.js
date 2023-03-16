import { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head'
import { useRouter } from "next/router";

import Nav from './nav'

import styles from './header.module.scss'
import Overlay from './overlay'
import ButtonUI from './buttonui'

// context
import { ModalContext } from '../lib/context';
import Link from 'next/link';

const Header = ({position}) => {
	const { events } = useRouter();
	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
	const [isModalOpen, setModalOpen] = useContext(ModalContext);

	const close = () => {
		//call modal close here or place inline in the events
		setMobileMenuVisible(false);
		setModalOpen(false);
	}

	useEffect(() => {
		// subscribe to next/router event
		events.on('routeChangeStart', close);
		return () => {
			// unsubscribe to event on unmount to prevent memory leak
			events.off('routeChangeStart', close);
		};
	}, [close, events]);

	return (
		<>
		<Head>
			<title>Syracuse University Brass Ensemble</title>
		</Head>
		<header className={styles.mobileHeader}>
				<AnimatePresence>
				{isMobileMenuVisible && 
					<Overlay closeHandler={() => {
						setMobileMenuVisible(false);
						setModalOpen(false);
					}} />
				}
				</AnimatePresence>
				<ButtonUI icon="menu" clickHandler={() => {
					setMobileMenuVisible(true);
					setModalOpen(true);
				}} /><h1>
					<Link href="/">
					<a>Syracuse University<br />
					<span>Brass Ensemble</span>
					</a>
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
