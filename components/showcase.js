import styles from './showcase.module.scss'
import Image from 'next/image'

const Showcase = ({children}) => {
	return <div 
		className={styles.showcase}
		style={{
			backgroundImage: `url('/syracuse-university-brass-ensemble.jpeg')`
		}}
	>	
		<div className={styles.mobileShowcaseImage}>
			<Image 
				src="/syracuse-university-brass-ensemble.jpeg"
				alt="Syracuse University Brass Ensemble"
				width={1827}
				height={1306}
				layout="responsive"
			/>
		</div>
		<div className={styles.content}>
			<div className={styles.line}></div>
			The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians; members include Syracuse University faculty, staff and students, the State University of New York Upstate Medical University faculty and staff, and accomplished musicians from Upstate New York communities.
			
		</div>

	</div>
}
export default Showcase;
