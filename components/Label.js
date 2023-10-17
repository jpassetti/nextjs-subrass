import styles from './label.module.scss'

const Label = ({htmlFor, children}) => {
	return <label htmlForm={htmlFor} className={styles.label}>{children}</label>
}
export default Label
