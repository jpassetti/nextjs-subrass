import styles from './footer.module.scss'
import Section from './section';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Section>Copyright 2023-24, Syracuse University.</Section>
		</footer>
	)
}
export default Footer;
