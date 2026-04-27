// @ts-nocheck
import styles from './label.module.scss'

const Label = ({htmlFor, children}) => {
	return <label htmlFor={htmlFor} className={styles.label}>{children}</label>
}
export default Label;
