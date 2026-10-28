// @ts-nocheck
import styles from './main.module.scss'
import Footer from './footer'

const Main = ({children}) => {
	return <main className={styles.main}>
		<div className={styles.content}>{children}</div>
		<Footer />
	</main>
}
export default Main;
