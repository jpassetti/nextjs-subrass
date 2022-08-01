import Nav from './nav';
import styles from './overlay.module.scss';

const Overlay = ({closeHandler}) => {
	return <div className={styles.overlay}>
		<span className={styles.closeBtn} onClick={() => {
			closeHandler(false)
		}}>Close</span>
		<Nav.Mobile />
	</div>
}
export default Overlay;
