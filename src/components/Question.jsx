import React from 'react'
import {decode} from 'html-entities'


export default function Question(props) {

  // Answer State
  const[answerSelected, setAnswerSelected] = React.useState(false)
  // Style State
  const[style, setStyle] = React.useState({})
  // Disabled State
  const[isDisabled, setIsDisabled] = React.useState(false)

  // Handle selection of an answer
  function handleOptionChange(event) {
    props.handleSelect(event.target.value);
    setAnswerSelected(true)
  }

  // Re-run after an answer-item was selected
  React.useEffect(function() {
    let styles = {
      background: `linear-gradient(rgba(19,219,2,1) 0%, rgba(10,144,17,1) 13%, rgba(5,87,5,1) 38%, rgba(9,79,4,1) 51%, rgba(13,84,5,1) 58%, rgba(10,128,16,1) 81%, rgba(19,219,2,1) 100%)`,
      transition: `background 2s ease-out`
    }
    if(answerSelected) {
      setStyle(styles)
      setIsDisabled(true)
    }
  }, [answerSelected])

  const displayAnswers = props.allAnswers.map((answer, index) => {

    // Initiate unique Id for each answer-element
    const answerId = `answer-${index}`;
    let className = "box-decoration";

    if (props.isCorrect && decode(answer) === props.correctAnswer) {
      className += " right-answer";
    } else if (!props.isCorrect && decode(answer) === props.selected) {
      className += " wrong-answer";
      // Restart Game

    }

    return (
      <li key={index} className='deco-lines'>
        <label
          htmlFor={answerId}
          className={className}
          style={answer === props.correctAnswer ? style : null} // Set style when answer-item is the correct one
          >
          <input
            type='radio'
            id={answerId}  // Set unique id for each input element
            name={answer}
            value={decode(answer)}
            onChange={handleOptionChange}
            checked={answer === props.selected}
            disabled={isDisabled}
          />
          {decode(answer)}
        </label>
      </li>
    );
  });


  return (
    <>
      {/* Questions Container */}
      <div className="deco-lines question-container">
        <p id="display-question" className='box-decoration'>{decode(props.question)}</p>
      </div>
      {/* Answers Container */}
      <ul className='answers-container'>{displayAnswers}</ul>
    </>
  );
}
