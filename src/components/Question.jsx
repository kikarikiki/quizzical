import {decode} from 'html-entities'

export default function Question(props) {

  const allAnswers = props.options
  // shuffle answers

  // ...
  const displayAnswers = allAnswers.map((answer, index) => {
    return <li key={index} className='deco-lines' onClick={props.handleClick}><span className='box-decoration'>{decode(answer)}</span></li>
  })

  return (
      <>
        {/* Questions Container */}
        <div className="deco-lines question-container">
            <p id="display-question" className='box-decoration'>{decode(props.question)}</p>
        </div>
        {/* Answers Container */}
        <ul className='answers-container'>
          {displayAnswers}
        </ul>
      </>
      )
}
