import React, { useState, useEffect, useContext } from 'react';

import { WordsContext, ExercisesContext, StyleExercises } from '../../AppContext.js';

import styles from './Hero.module.scss';

function Hero() {
    const { words, setWords } = useContext(WordsContext);
    const { exercises, setExercises } = useContext(ExercisesContext);
    const { styleExercises, setStyleExercises } = useContext(StyleExercises);

    const [inputValue, setInputValue] = useState('');

    const [styleHero, setStyleHero] = useState({
      opacity: 0,
      transform: 'translateY(200px)',
      transition: '0.9s',
      display: 'block',
    });
  
    const [styleLoader, setStyleLoader] = useState({
      display: 'none',
      opacity: 0,
    });
  
    useEffect(() => {
      setTimeout(() => setStyleHero(prev => ({ ...prev, opacity: 0 })), 150);
      setTimeout(() => setStyleHero(prev => ({ ...prev, transform: 'translateY(0px)', opacity: 1 })), 300);
    }, []);
  
    const handleInputKeyDown = (event) => {
      if (!event.key.match(/[a-zA-ZáàâäãåčćęéèêëíìîïłńñóòôöõøśşšțţùúûüýÿžźżÁÀÂÄÃÅČĆĘÉÈÊËÍÌÎÏŁŃÑÓÒÔÖÕØŚŞŠȚŢÙÚÛÜÝŸŽŹŻÆæØøÅåÄäÖöΑ-Ωα-ω]/)) {
        event.preventDefault();
      }
    };
  
    const handleInputChange = (event) => {
      let inputValue = event.target.value;
  
      const splitedWords = inputValue.split(' ');
      const eachWordCorrect = splitedWords.every(word => word.length <= 15);
  
      if (!inputValue.includes(" ") && inputValue.length >= 15) {
        console.log("Max letters in one word is 15")
        return false;
      } else if (inputValue.includes(" ") && inputValue.length > 150) {
        console.log("Max letters in multiple words is 150");
        alert("Max letters in multiple words is 150");
        return false;
      } else if (inputValue.includes(" ") && inputValue.length <= 150 &&!eachWordCorrect) {
        console.log("Max letters in each word is 150");
        alert("Max letters in each word is 150");
        return false;
      }
  
      setInputValue(inputValue);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      let splitWords = inputValue.replace(".", "");
      splitWords = splitWords.split(' ');
      splitWords = splitWords.filter(word => word.trim() !== '');
      let newWords = [...words, ...splitWords];
  
      if ((newWords.length) > 10) {
        console.log("Max words is 10");
        alert("You have reached the maximum word count of 10");
        return false;
      }
  
      if (newWords.toString() > 150) {
        console.log("Max letters in multiple words is 150");
        alert("You have reached the maximum letters count of 150");
        return false;
      }
  
      setWords(newWords);
      setInputValue('');
    };
  
    const generate = (event) => {
      event.preventDefault();
  
      if (!words.length) {
        return;
      }
  
      setStyleLoader(prev => ({ ...prev, display: 'block' }))
      setStyleHero(prev => ({ ...prev, transition: '0.25s', opacity: 0 }))

      setTimeout(() => setStyleLoader(prev => ({ ...prev, opacity: 1 })), 150);
      setTimeout(() => setStyleHero(prev => ({ ...prev, display: 'none' })), 250);

      fetchData(words);
    };
  
    const removeVocab = (index) => {
      const newWords = [...words];
      newWords.splice(index, 1);
      setWords(newWords);
    };
  
    const fetchData = (wordsArray, timeout = 30000) => {
      const vocab = wordsArray.join(',');
  
      let waitTitle = true;
      document.title = "Generating";
      const changeTitle = setInterval(() => {
        if (document.title == "Generating...") {
          if (waitTitle) {
            waitTitle = false;
            document.title = "Generating";
          }
        } else {
          waitTitle = true;
          document.title = document.title + ".";
        }
      }, 400);
  
      console.log(vocab)
  
      // AbortController, which will allow us to cancel the fetch request
      const controller = new AbortController();
      const signal = controller.signal;
  
      // Set a timeout to abort the request if it exceeds our specified limit
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      fetch(`https://tovocabapi.vercel.app/generate?vocab=${vocab}`, { signal })
      .then(response => {
          clearTimeout(timeoutId); // Clear the timeout if the fetch completes in time

          if (response.ok) {
            return response.json();
          } else if (response.status === 400) {
            throw new Error('Your request is too long or contains forbidden characters.');
          } else if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          } else {
            throw new Error('A server error occurred.');
          }
        })
        .then(data => {
          console.log(data);
          setExercises(JSON.parse(data));
  
          setStyleExercises(prev => ({ ...prev, display: 'flex' }))

          setStyleHero(prev => ({ ...prev, display: 'none', opacity: 0 }))

          document.querySelector('#app').style.transition = "1.1s";
          document.querySelector('#app').classList.add("lightMode");
          document.querySelector('body').classList.add("lightMode");
  
          setTimeout(() => setStyleExercises(prev => ({ ...prev, opacity: 1, transform: 'translateY(0px)' })), 600);
  
          clearInterval(changeTitle);
          document.title = "ToVocab"
          setStyleLoader(prev => ({ ...prev, display: 'none' }))
        })
        .catch(error => {
          clearInterval(changeTitle);
          document.title = "ToVocab"
          setStyleLoader(prev => ({ ...prev, display: 'none' }))

          if (error.name === 'AbortError') {
            console.error('Fetch aborted due to timeout');
          }
  
          console.error('Error fetching data:', error);
  
          setWords([]);
  
          setTimeout(() => {
            alert(error.message);

            setTimeout(() => setStyleHero(prev => ({ ...prev, display: 'block', opacity: 1 })), 250);
            setTimeout(() => setStyleHero(prev => ({ ...prev, display: 'none', opacity: 0 })), 150);
          }, 250);
        });
    };

    
    return (
      <>
        <div id="loader" className={styles.loader} style={styleLoader} role='alert' aria-label='Generating exercises'>
          <div className={styles.loadIcon} aria-hidden></div>
        </div>
        <section className={styles.hero} style={styleHero}>
          <div className={styles.container}>
            <h1>
              Generate Exercises <br />
              <span className={styles.small}>from Your</span> <span className={styles.highlight}>Vocabulary</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="inputWord">Type word</label>
              <input 
                type="text" 
                value={inputValue}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
                id='inputWord'
                className={styles.inputWord}
                placeholder='Type word'
              />
              <button type="submit" className={styles.submitWord} aria-label="Add word">

                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
              </button>
            </form>
            <div className={styles.vocabContent}>
              {words.map((word, index) => <div key={index} className={styles.word}>{word}<button className={styles.remove} aria-label="Remove word" onClick={() => removeVocab(index)} >x</button></div>)}
            </div>
            <button type="submit" onClick={generate} id="generate" className={`${styles.generate} ${words.length > 0 ? styles.active : ''}`}>Generate</button>
          </div>
        </section>
      </>
    )
}

export default Hero;