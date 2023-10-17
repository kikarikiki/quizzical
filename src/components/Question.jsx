import {decode} from 'html-entities'

export default function Question(props) {

  function handleOptionChange(event) {
    props.handleSelect(event.target.value);
  }

  const displayAnswers = props.allAnswers.map((answer, index) => {
    // Initiate unique Id for each input element
    const answerId = `answer-${index}`
    // Determine if the current answer is correct
    const isCorrectAnswer = decode(answer) === props.correctAnswer;
    // Determine if the current answer is the selected answer
    const isSelectedAnswer = answer === props.selected;
    // Determine the CSS class based on correctness and selection
    let className = "box-decoration"
    if (props.isCorrect && isCorrectAnswer) {
      className += " right-answer"
    } else if (isSelectedAnswer && !isCorrectAnswer) {
      className += " wrong-answer"
    }

      return (
        <li key={index} className='deco-lines'>
          <label htmlFor={answerId} className={className}>
            <input
              type='radio'
              id={answerId}
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
