import { useContext } from 'react'
import { WordsContext } from '../../../AppContext.tsx';
import styles from './Vocabulary.module.scss';

function Vocabulary() {
    const { words } = useContext(WordsContext);

    return (
        <>
            <h2>Your vocabulary</h2>
            <div className={styles.vocabContent}>
                {words.map((word: string, index: number) => <div key={index} className={styles.word}>{word}</div>)}
            </div>
        </>
    )
}

export default Vocabulary;