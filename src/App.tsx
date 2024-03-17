import { useState } from 'react'

import Header from './components/Header/Header.tsx';
import Main from './components/Main/Main.tsx';
import Footer from './components/Footer/Footer.tsx';

import { WordsContext, ExercisesContext, StyleExercises } from './AppContext.tsx';

function App() {
  const [words, setWords] = useState([]);
  const [exercises, setExercises] = useState({});
  const [styleExercises, setStyleExercises] = useState({});

  return (
    <WordsContext.Provider value={{ words, setWords }}>
      <ExercisesContext.Provider value={{ exercises, setExercises }}>
        <StyleExercises.Provider value={{ styleExercises, setStyleExercises }}>
          <div id="app">
            <Header />
            <Main />
            <Footer />
          </div>
        </StyleExercises.Provider>
      </ExercisesContext.Provider>
    </WordsContext.Provider>
  )
}

export default App