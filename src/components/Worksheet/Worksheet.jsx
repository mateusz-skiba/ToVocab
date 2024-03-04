import React, { useContext } from 'react';

import { WordsContext, ExercisesContext, StyleExercises } from '../../AppContext.js';

import styles from './Worksheet.module.scss';

function Hero() {
  const { words, setWords } = useContext(WordsContext);
  const { exercises, setExercises } = useContext(ExercisesContext);
  const { styleExercises, setStyleExercises } = useContext(StyleExercises);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    const exerciseElement = event.target.closest('.exerciseElement');
    const correctAnswer = exerciseElement.getAttribute('data-answer');
    const userInput = exerciseElement.querySelector('.userAnswer').value;

    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      exerciseElement.classList.add("correct");
    } else {
      exerciseElement.classList.add("wrong");
    }

    exerciseElement.classList.add("done");
    exerciseElement.querySelector('.userAnswer').tabIndex = -1;

    if (document.querySelectorAll('.exerciseElement').length == document.querySelectorAll('.exerciseElement.done').length) {
      document.querySelector('#checkAll').classList.add("done");
      document.querySelector('#checkAll').tabIndex = -1;
    }
  };

  const checkAllAnswer = (event) => {
    event.preventDefault();
    const exerciseElements = document.querySelectorAll(".exerciseElement");
    document.querySelector('#checkAll').classList.add("done");
    document.querySelector('#checkAll').tabIndex = -1;

    exerciseElements.forEach(element => {
      const properAnswer = element.getAttribute("data-answer");
      const userAnswer = element.querySelector('.userAnswer').value;
      
      if (properAnswer == userAnswer) {
        element.classList.add("correct");
      } else {
        element.classList.add("wrong");
      }
    });
  };
    
    return (
      <section className={styles.exercise} style={styleExercises}>
        <div className={styles.container} aria-label="Your vocabulary exercise">
          <h2>Your vocabulary</h2>
          <div className={styles.vocabContent}>
            {words.map((word, index) => <div key={index} className={styles.word}>{word}</div>)}
          </div>
          <h3>1. Fill in the blanks</h3>
          <ol>
            {Array.isArray(exercises.fillInTheBlanks) && shuffleArray(exercises.fillInTheBlanks).map((item, index) => (
                <li key={index}>
                  <div className={styles.exerciseElement} data-answer={item.answer}>
                    <p>
                      {item.sentence.split("____")[0]}
                        <input type="text" name="typeAnswer" className={`${styles.typeAnswer} ${styles.userAnswer}`} placeholder='word' />
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
            {Array.isArray(exercises.matchWithDefinitions) && shuffleArray(exercises.matchWithDefinitions).map((item, index) => (
                <li key={index}>
                  <div className={styles.exerciseElement} data-answer={item.answer}>
                    <p>
                      {item.definition}<span></span>
                        <select name="selectAnswer" className={`${styles.chooseAnswer} ${styles.userAnswer}`}>
                          <option value="0">choose</option>
                          {exercises && exercises.fillInTheBlanks && Array.isArray(exercises.matchWithDefinitions) && exercises.matchWithDefinitions.map((item, index) => (
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
          <button type="submit" onClick={checkAllAnswer} id="checkAll" className={styles.checkAll}>Check Answers</button>
        </div>
      </section>
    )
}

export default Hero;