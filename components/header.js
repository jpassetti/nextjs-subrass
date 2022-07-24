import Head from 'next/head'

import Nav from './nav'

import styles from './header.module.scss'

const Header = ({position}) => {

	return (
		<>
		<Head>
			<title>Syracuse University Brass Ensemble</title>
		</Head>
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
