import React from 'react';

const WordsContext = React.createContext<string | any>(undefined);
const ExercisesContext = React.createContext<string | any>(undefined);
const StyleExercises = React.createContext<string | any>(undefined);

export { WordsContext, ExercisesContext, StyleExercises };