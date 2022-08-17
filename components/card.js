import styles from './card.module.scss'

const Card = ({children}) => {
	return <article className={styles.card}>{children}</article>
}
export default Card
