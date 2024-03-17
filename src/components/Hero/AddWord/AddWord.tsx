import { useState, useContext } from 'react'

import { WordsContext } from '../../../AppContext.tsx';

import styles from './AddWord.module.scss';

type InputValueState = string;

function AddWord() {
    const { words, setWords } = useContext(WordsContext);
    const [inputValue, setInputValue] = useState<InputValueState>('');

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!event.key.match(/[a-zA-ZáàâäãåčćęéèêëíìîïłńñóòôöõøśşšțţùúûüýÿžźżÁÀÂÄÃÅČĆĘÉÈÊËÍÌÎÏŁŃÑÓÒÔÖÕØŚŞŠȚŢÙÚÛÜÝŸŽŹŻÆæØøÅåÄäÖöΑ-Ωα-ω]/)) {
          event.preventDefault();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let splitWords = inputValue.replace(/\./g, "").split(' ').filter(word => word.trim() !== '');

        let newWords = [...words, ...splitWords];
        if ((newWords.length) > 10) {
            console.log("Max words is 10");
            alert("You have reached the maximum word count of 10");
            return false;
        }

        if (newWords.toString().length > 150) {
            console.log("Max letters in multiple words is 150");
            alert("You have reached the maximum letters count of 150");
            return false;
        }

        setWords(newWords);
        setInputValue('');
    };

    return (
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
    )
}

export default AddWord;