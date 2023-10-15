export default function App(props) {

  const allAnswers = [props.correctAnswer, ...props.incorrectAnswers]
  const displayAnswers = allAnswers.map((answer, index) => {
    return <li key={index} className='deco-lines'><span className='box-decoration'>{answer}</span></li>
  })

  return (
    <>
      {displayAnswers}
    </>
  )
}
