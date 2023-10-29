import React from "react"
import {nanoid} from "nanoid"
import Question from './components/Question.jsx'
import './App.scss'

export default function App() {

  const [allQuestions, setAllQuestions] = React.useState([])
  const [question, setQuestion] = React.useState()

  // State of asked Questions && rounds
  const [answeredQuestions, setAnsweredQuestions] = React.useState([])
  const [isCorrect, setIsCorrect] = React.useState(null)
  const [start, setStart] = React.useState(true)
  const [restart, setRestart] = React.useState(false)

  const score = [
    {value: 0, milestone: true},
    {value: 100, milestone: true},
    {value: 200, milestone: false},
    {value: 300, milestone: false},
    {value: 500, milestone: false},
    {value: 1000, milestone: true},
    {value: 2000, milestone: false},
    {value: 4000, milestone: false},
    {value: 8000, milestone: false},
    {value: 16000, milestone: false},
    {value: 32000, milestone: true},
    {value: 64000, milestone: false},
    {value: 125000, milestone: false},
    {value: 250000, milestone: false},
    {value: 500000, milestone: false},
    {value: 1000000, milestone: true}
  ]

  // Combine Answers randomly
  function insertAtRandomIndex(arr, item) {
    const copiedArr = [...arr]
    const randomIndex = Math.floor(Math.random() * (copiedArr.length + 1));
    copiedArr.splice(randomIndex, 0, item);
    return copiedArr
  }

  // Api
  const api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple"
  // Fetch Api
  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch(api)
        const data = await res.json()
        const results = data.results

        setAllQuestions(results.map(result => {
          // Array of all answers
          const incorrectAnswersArray = [...result.incorrect_answers];
          const correctAnswer = result.correct_answer;
          const allAnswersArray = insertAtRandomIndex(incorrectAnswersArray, correctAnswer);
          // Return allQuestionsArray with updated key:values
          return {
            question: result.question,
            correctAnswer: result.correct_answer,
            allAnswers: allAnswersArray,
            selected: "",
            id:nanoid()
          }
        }))
      }
      getQuestions()
    }, [restart])

    // Get question from allQuestions Arr
    function getQuestion() {
      setStart(false)

      const unansweredQuestions = allQuestions.filter((q) => !answeredQuestions.includes(q.id))

      if (unansweredQuestions.length > 0) {
        const randomNumber = Math.floor(Math.random() * unansweredQuestions.length)
        const randomQuestion = unansweredQuestions[randomNumber]

        setQuestion({
          id: randomQuestion.id,
          question: randomQuestion.question,
          correctAnswer: randomQuestion.correctAnswer,
          allAnswers: randomQuestion.allAnswers,
          selected: "",
          givenAnswer: null
        })

        setAnsweredQuestions([...answeredQuestions, {...randomQuestion}])
        setIsCorrect(null);

      } else {
        // Start new game
        console.log("finished")
      }
    }

    function handleOptionSelect(selectedOption) {
      const isCorrectAnswer = selectedOption === question.correctAnswer;
      setIsCorrect(isCorrectAnswer)
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        selected: selectedOption,
        givenAnswer: isCorrectAnswer
      }))
    }

    //Handle givenAnswer on askedQuestion after answer was selected (=== question.selected changes)
    React.useEffect(() => {
    setAnsweredQuestions(prevAnsweredQ => {
        return prevAnsweredQ.map(a => {
            return a.id === question.id ? {...a, givenAnswer: question.givenAnswer}: a
            })
    })
    }, [question])



    {/*
    function restartGame() {
      setAllQuestions([])
      setAnsweredQuestions([0])
      setRestart(prevState => !prevState)
    }
    */}


  return (
    <>
      <main>
        <header>
          <h1>Quizzical</h1>
          <img src="./src/assets/react.svg" alt="" className="logo"/>
        </header>
        {
          start
          ?
          // Code for the start screen
          <div className="start-screen-container">
            <p>you want to be a quizzionaire?</p><p>Put your knowledge to the test!</p>
            <div className="btn">
                <a href="#" onClick={getQuestion}>Start</a>
            </div>
          </div>
          :
          // Code for the active game screen
          <div className="quiz-container">
            <div className="game-details-container">
                <h1><span id="player-score" style={score[0].milestone ? {color: `#FEC355`} : null }>  ${score[0].value}</span></h1>
                <h1><span id="question-number">{answeredQuestions.length} / {allQuestions.length}</span></h1>
            </div>
            <Question
              key={question.id}
              id={question.id}
              question={question.question}
              correctAnswer={question.correctAnswer}
              allAnswers={question.allAnswers}
              handleSelect={handleOptionSelect}
              isCorrect={isCorrect}
              selected={question.selected}
            />
            {/* Conditional rendering of buttons */}
            {question.selected === "" ? null : answeredQuestions.length < allQuestions.length ? (
              <div className="btn">
                <a className="start-button" onClick={getQuestion}>Next Question</a>
              </div>
            ) : (
              <div className="btn">
                <a className="restart-button">Restart</a>
              </div>
            )}
          </div>
        }
      </main>
    </>
  )
}
