// @ts-nocheck
import styles from './main.module.scss'
import Footer from './footer'
import AnnouncementBanner from './announcement-banner'

const Main = ({children}) => {
	return <main className={styles.main}>
		<AnnouncementBanner />
		<div className={styles.content}>{children}</div>
		<Footer />
	</main>
}
export default Main;
