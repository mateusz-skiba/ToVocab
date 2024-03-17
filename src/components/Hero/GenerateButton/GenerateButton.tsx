import { useContext } from 'react'

import { WordsContext, ExercisesContext, StyleExercises } from '../../../AppContext.tsx';

import styles from './GenerateButton.module.scss';

type GenerateButtonProps = {
  setStyleLoader: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setStyleHero: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

function GenerateButton({ setStyleLoader, setStyleHero }: GenerateButtonProps) {
    const { words, setWords } = useContext(WordsContext);
    const { setExercises } = useContext(ExercisesContext);
    const { setStyleExercises } = useContext(StyleExercises);

    const generate = (event: React.MouseEvent<HTMLButtonElement>) => {
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

      const fetchData = (wordsArray: [], timeout = 30000) => {
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
        <button type="submit" onClick={generate} id="generate" className={`${styles.generate} ${words.length > 0 ? styles.active : ''}`}>Generate</button>
    )
}

export default GenerateButton;