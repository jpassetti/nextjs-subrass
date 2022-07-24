import styles from './section.module.scss'

const Section = ({children}) => {
	return <section>
		<div className={styles.section_padding}>
			{children}
		</div>
	</section>
}

export default Section
