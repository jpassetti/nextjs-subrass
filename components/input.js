import styles from './input.module.scss';

const Input = ({ id, type, value, onChange }) => {
    return (
        <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        />
    );
}
export default Input