import {decode} from 'html-entities'

export default function Question(props) {

  function handleOptionChange(event) {
    props.handleSelect(event.target.value);
  }

  const displayAnswers = props.allAnswers.map((answer, index) => {
    // Initiate unique Id for each answer-element
    const answerId = `answer-${index}`;
    // Styling change
    const inlineStyle = {background: `linear-gradient(rgba(19,219,2,1) 0%, rgba(10,144,17,1) 13%, rgba(5,87,5,1) 38%, rgba(9,79,4,1) 51%, rgba(13,84,5,1) 58%, rgba(10,128,16,1) 81%, rgba(19,219,2,1) 100%)`}
    let className = "box-decoration";
    if (props.isCorrect && decode(answer) === props.correctAnswer) {
      className += " right-answer";
    } else if (!props.isCorrect && decode(answer) === props.selected) {
      className += " wrong-answer";

    }

    return (
      <li key={index} className='deco-lines'>
        <label
          htmlFor={answerId}
          className={className}
          style={answer === props.correctAnswer ? {inlineStyle} : null }
          >
          <input
            type='radio'
            id={answerId}  // Set unique id for each input element
            name={answer}
            value={decode(answer)}
            onChange={handleOptionChange}
            checked={answer === props.selected}
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
