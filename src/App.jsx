import { useState, useEffect } from 'react'

function App() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [exercises, setExercises] = useState({});

  useEffect(() => {
    document.querySelector('section.hero').style.opacity = "0";

    setTimeout(() => {
      document.querySelector('section.hero').style.transform = "translateY(0px)";
    }, 150);

    setTimeout(() => {
      document.querySelector('section.hero').style.opacity = "1";
      document.querySelector('section.hero').style.transition = "0s";
    }, 300);
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

    document.querySelector('section.hero').style.transition = "0.25s";
    document.querySelector('section.hero').style.opacity = "0";
    document.querySelector('#loader').style.display = "block";

    setTimeout(() => {
      document.querySelector('#loader').style.opacity = "1";
    }, 150);

    setTimeout(() => {
      document.querySelector('section.hero').style.display = "none";
    }, 250);

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

        document.querySelector('section.exercise').style.display = "flex";
        document.querySelector('#loader').style.opacity = "0";
        document.querySelector('#loader').style.display = "none";
        document.querySelector('#app').style.transition = "1.1s";
        document.querySelector('body').classList.add("lightMode");
        document.querySelector('#app').classList.add("lightMode");

        setTimeout(() => {
          document.querySelector('section.exercise').style.opacity = "1";
          document.querySelector('section.exercise').style.transform = "translateY(0px)";
        }, 600);

        clearInterval(changeTitle);
        document.title = "ToVocab"
      })
      .catch(error => {
        clearInterval(changeTitle);
        document.title = "ToVocab"

        if (error.name === 'AbortError') {
          console.error('Fetch aborted due to timeout');
        }

        console.error('Error fetching data:', error);

        document.querySelector('#loader .loadIcon').style.animation = 'none';
        setWords([]);

        setTimeout(() => {
          alert(error.message);
          document.querySelector('section.hero').style.display = "block";
          document.querySelector('section.hero').style.opacity = "1";
          document.querySelector('#loader').style.opacity = "0";
          document.querySelector('#loader').style.display = "none";
          document.querySelector('#loader .loadIcon').style.animation = 'spin 1.4s linear infinite';
        }, 250);
      });
  };

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

    // after check answer focus to another field
    // const allFocusable = Array.from(document.querySelectorAll('.exerciseElement .userAnswer, .exerciseElement button'));
    // const currentIndex = allFocusable.findIndex(element => element === document.activeElement);
    // const nextFocusable = allFocusable[currentIndex + 1];
    // if (nextFocusable) {
    //   nextFocusable.focus();
    // }

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
    <div id="app">
      <header>
        <div className="container">
          <span className="logo">ToVocab</span>
        </div>
      </header>
      <main>
        <div id="loader" role='alert' aria-label='Generating exercises'>
          <div className="loadIcon" aria-hidden></div>
        </div>
        <section className="hero">
          <div className="container">
            <h1>
              Generate Exercises <br />
              <span className='small'>from Your</span> <span className='highlight'>Vocabulary</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="inputWord">Type word</label>
              <input 
                type="text" 
                value={inputValue}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
                id='inputWord'
                className='inputWord'
                placeholder='Type word'
              />
              <button type="submit" className='submitWord' aria-label="Add word">

                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
              </button>
            </form>
            <div className="vocabContent">
              {words.map((word, index) => <div key={index} className="word">{word}<button className="remove" aria-label="Remove word" onClick={() => removeVocab(index)} >x</button></div>)}
            </div>
            <button type="submit" onClick={generate} id="generate" className={words.length > 0 ? 'active' : ''}>Generate</button>
          </div>
        </section>
        <section className="exercise">
          <div className="container" aria-label="Your vocabulary exercise">
            <h2>Your vocabulary</h2>
            <div className="vocabContent">
              {words.map((word, index) => <div key={index} className="word">{word}</div>)}
            </div>
            <h3>1. Fill in the blanks</h3>
            <ol>
              {Array.isArray(exercises.fillInTheBlanks) && shuffleArray(exercises.fillInTheBlanks).map((item, index) => (
                  <li key={index}>
                    <div className='exerciseElement' data-answer={item.answer}>
                      <p>
                        {item.sentence.split("____")[0]}
                          <input type="text" name="typeAnswer" className='typeAnswer userAnswer' placeholder='word' />
                          <span className="correctAnswer" aria-live="polite">{item.answer}</span>
                        {item.sentence.split("____")[1]}
                      </p>
                      <button className='showAnswer' onClick={checkAnswer}>A<span>nswer</span></button>
                    </div>
                  </li>
                ))
              }
            </ol>
            <h3>2. Match with definitions</h3>
            <ol>
              {Array.isArray(exercises.matchWithDefinitions) && shuffleArray(exercises.matchWithDefinitions).map((item, index) => (
                  <li key={index}>
                    <div className='exerciseElement' data-answer={item.answer}>
                      <p>
                        {item.definition}<span></span>
                          <select name="selectAnswer" className='chooseAnswer userAnswer'>
                            <option value="0">choose</option>
                            {exercises && exercises.fillInTheBlanks && Array.isArray(exercises.matchWithDefinitions) && exercises.matchWithDefinitions.map((item, index) => (
                              <option key={index} value={item.answer}>{item.answer}</option>
                            ))}
                          </select>
                          <span className="correctAnswer" aria-live="polite">{item.answer}</span>
                      </p>
                      <button className='showAnswer' onClick={checkAnswer}>A<span>nswer</span></button>
                    </div>
                  </li>
                ))
              }
            </ol>
            <button type="submit" onClick={checkAllAnswer} id="checkAll">Check Answers</button>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <span className="rights">2024 ToVocab</span>
          <a href="mailto:mateusz.skiba14@gmail.com" className="contact">
            <svg xmlns="http://www.w3.org/2000/svg" width="12.763" height="9.572" viewBox="0 0 12.763 9.572">
              <path id="envelope-solid" d="M1.2,64a1.2,1.2,0,0,0-.717,2.154L5.9,70.222a.8.8,0,0,0,.957,0l5.424-4.068A1.2,1.2,0,0,0,11.565,64ZM0,66.792v5.185a1.6,1.6,0,0,0,1.6,1.6h9.572a1.6,1.6,0,0,0,1.6-1.6V66.792L7.338,70.86a1.593,1.593,0,0,1-1.913,0Z" transform="translate(0.001 -64)" fill="#fff" opacity="0.6"/>
            </svg>
            Contact
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App