import { useState, useContext } from 'react'

import { StyleExercises } from '../../AppContext.tsx';
import Vocabulary from './Vocabulary/Vocabulary.tsx';
import Exercises from './Exercises/Exercises.tsx';
import CheckButton from './CheckButton/CheckButton.tsx';
import styles from './Worksheet.module.scss';

function Worksheet() {
  const { styleExercises } = useContext(StyleExercises);
  const [ allAnswersChecked, setAllAnswersChecked ] = useState<boolean>(false);

    return (
      <section className={styles.exercise} style={styleExercises}>
        <div className={styles.container} aria-label="Your vocabulary exercise">
          <Vocabulary />
          <Exercises setAllAnswersChecked={setAllAnswersChecked} />
          <CheckButton allAnswersChecked={allAnswersChecked} setAllAnswersChecked={setAllAnswersChecked} />
        </div>
      </section>
    )
}

export default Worksheet;