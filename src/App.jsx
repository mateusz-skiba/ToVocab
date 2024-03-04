import React, { useState } from 'react';

import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Worksheet from './components/Worksheet/Worksheet.jsx';
import Footer from './components/Footer/Footer.jsx';

import { WordsContext, ExercisesContext, StyleExercises } from './AppContext.js';

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
            <main>
              <Hero />
              <Worksheet />
            </main>
            <Footer />
          </div>
        </StyleExercises.Provider>
      </ExercisesContext.Provider>
    </WordsContext.Provider>
  )
}

export default App