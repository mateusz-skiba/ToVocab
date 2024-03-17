import styles from './Title.module.scss';

function Title() {
    return (
        <h1 className={styles.h1}>
            Generate Exercises <br />
            <span className={styles.small}>from Your</span> <span className={styles.highlight}>Vocabulary</span>
        </h1>
    )
}

export default Title;