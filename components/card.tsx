// @ts-nocheck
import Image from 'next/image';
import styles from './card.module.scss'

const Card = ({children}) => {
	return <article className={styles.card}>{children}</article>
}
const Body = ({children}) => {
	return <div className={styles.card__body}>{children}</div>
}
Card.Body = Body;
const CoverImage = ({image}) => {
	return image ? <div className={styles.card__image}>
		<Image 
			src={image?.node?.sourceUrl || image?.sourceUrl || null}
			alt={image?.node?.altText || image?.altText || ""}
			width={image?.node?.mediaDetails?.width || image?.mediaDetails?.width || 1200}
			height={image?.node?.mediaDetails?.height || image?.mediaDetails?.height || 630}
			className="responsive-img"
		/>
	</div> : '';
}
Card.CoverImage = CoverImage;
export default Card;

