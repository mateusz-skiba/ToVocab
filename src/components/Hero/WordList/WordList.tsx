import { useContext } from 'react'
import { WordsContext } from '../../../AppContext.tsx';
import styles from './WordList.module.scss';

function WordList() {
    const { words, setWords } = useContext(WordsContext);

    const removeVocab = (index: number) => {
        const newWords = [...words];
        newWords.splice(index, 1);
        setWords(newWords);
    };

    return (
        <div className={styles.vocabContent}>
            {words.map((word: string, index: number) => <div key={index} className={styles.word}>{word}<button className={styles.remove} aria-label="Remove word" onClick={() => removeVocab(index)} >x</button></div>)}
        </div>
    )
}

export default WordList;