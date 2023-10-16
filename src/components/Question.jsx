import {decode} from 'html-entities'

export default function Question(props) {

  function handleOptionChange(event) {
    props.handleSelect(event.target.value);
  }


  const displayAnswers = props.allAnswers.map((answer, index) => {
    const answerId = `answer-${index}`;
    let className = "deco-lines";
    if (decode(answer) === props.correctAnswer) {
      className += " right-answer";
    } else if (decode(answer) === props.selected) {
      className += " wrong-answer";
    }
    return (
      <li key={index} className='deco-lines'>
        <label htmlFor={answerId}>
          <input
            type='radio'
            id={answerId}  // Set unique id for each input element
            value={decode(answer)}
            onChange={handleOptionChange}
            checked={decode(answer) === props.selected}
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
