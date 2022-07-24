import styles from './showcase.module.scss'

const Showcase = ({children}) => {
	return <div 
		className={styles.showcase}
		style={{
			backgroundImage: `url('/syracuse-university-brass-ensemble.jpeg')`
		}}
	>	
		<div className={styles.content}>
			<div className={styles.line}></div>
			The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians; members include Syracuse University faculty, staff and students, the State University of New York Upstate Medical University faculty and staff, and accomplished musicians from Upstate New York communities.
			
		</div>

	</div>
}
export default Showcase;
