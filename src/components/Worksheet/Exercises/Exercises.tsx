import { useContext } from 'react'
import { ExercisesContext } from '../../../AppContext.tsx';
import styles from './Exercises.module.scss';

type ExercisesState = {
    setAllAnswersChecked: (checked: boolean) => void;
};

function Exercises({ setAllAnswersChecked }: ExercisesState) {
    const { exercises } = useContext(ExercisesContext);

    const shuffleArray = (array: []) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        
        return shuffledArray;
      };
    
      const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const exerciseElement = event.currentTarget.closest("[data-name='exerciseElement']");
        if (!exerciseElement) return; // Always good to have a null check
    
        const correctAnswer = exerciseElement.getAttribute('data-answer');
        const userInputElement = exerciseElement.querySelector("[data-name='userAnswer']");
        
        if (!userInputElement) return; // Null check
        const userInput = (userInputElement as HTMLInputElement).value;
        
        let newClass = "";
        if (userInput.trim().toLowerCase() === correctAnswer?.toLowerCase()) {
          newClass = styles.correct;
        } else {
          newClass = styles.wrong;
        }
        
        exerciseElement.className += ` ${newClass}`;
        exerciseElement.classList.add(styles.done);
        (userInputElement as HTMLInputElement).tabIndex = -1; // Type assertion here        
    
        const allExercises = document.querySelectorAll("[data-name='exerciseElement']");
        const doneExercises = document.querySelectorAll(`.${styles.correct}`);
        const wrongExercises = document.querySelectorAll(`.${styles.wrong}`);    

        if (allExercises.length === doneExercises.length + wrongExercises.length) {
            setAllAnswersChecked(true);
        }
      };



    return (
        <>
            <h3>1. Fill in the blanks</h3>
            <ol>
                {Array.isArray(exercises.fillInTheBlanks) && shuffleArray(exercises.fillInTheBlanks).map((item: any, index: number) => (
                    <li key={index}>
                    <div className={styles.exerciseElement} data-answer={item.answer} data-name='exerciseElement'>
                        <p>
                        {item.sentence.split("____")[0]}
                            <input type="text" name="typeAnswer" className={`${styles.typeAnswer} ${styles.userAnswer}`} data-name='userAnswer' placeholder='word' />
                            <span className={styles.correctAnswer} aria-live="polite">{item.answer}</span>
                        {item.sentence.split("____")[1]}
                        </p>
                        <button className={styles.showAnswer} onClick={checkAnswer}>A<span>nswer</span></button>
                    </div>
                    </li>
                ))
                }
            </ol>
            <h3>2. Match with definitions</h3>
            <ol>
                {Array.isArray(exercises.matchWithDefinitions) && shuffleArray(exercises.matchWithDefinitions).map((item: any, index: number) => (
                    <li key={index}>
                    <div className={styles.exerciseElement} data-answer={item.answer} data-name='exerciseElement'>
                        <p>
                        {item.definition}<span></span>
                            <select name="selectAnswer" className={`${styles.chooseAnswer} ${styles.userAnswer}`} data-name='userAnswer'>
                            <option value="0">choose</option>
                            {exercises && exercises.fillInTheBlanks && Array.isArray(exercises.matchWithDefinitions) && exercises.matchWithDefinitions.map((item: any, index: number) => (
                                <option key={index} value={item.answer}>{item.answer}</option>
                            ))}
                            </select>
                            <span className={styles.correctAnswer} aria-live="polite">{item.answer}</span>
                        </p>
                        <button className={styles.showAnswer} onClick={checkAnswer}>A<span>nswer</span></button>
                    </div>
                    </li>
                ))
                }
            </ol>
        </>
    )
}

export default Exercises;