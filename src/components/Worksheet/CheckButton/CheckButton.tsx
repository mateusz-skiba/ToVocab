import styles from './CheckButton.module.scss';

type CheckButtonState = {
  allAnswersChecked: boolean;
  setAllAnswersChecked: boolean;
}

function CheckButton({ allAnswersChecked, setAllAnswersChecked }: CheckButtonState) {
    let newClass = "";

    const checkAllAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const exerciseElements = document.querySelectorAll("[data-name='exerciseElement']");

      exerciseElements.forEach(element => {
        const properAnswer = element.getAttribute("data-answer");
        const userAnswer = element.querySelector("[data-name='userAnswer']").value;
        
        console.log(element)
        if (properAnswer == userAnswer) {
          newClass = styles.correct;

          element.className += ` ${newClass}`;
          element.classList.add(styles.done);
        } else {
          newClass = styles.wrong;

          element.className += ` ${newClass}`;
          element.classList.add(styles.done);
        }

      });

      setAllAnswersChecked(true);
  };

  return (
      <button type="submit" onClick={checkAllAnswer} id="checkAll" data-name="checkAll" className={`${styles.checkAll} ${allAnswersChecked ? styles.done : ''}`}>Check Answers</button>
  )
}

export default CheckButton;