import React from "react"
import {nanoid} from "nanoid"
import Question from './components/Question.jsx'
import './App.scss'

export default function App() {

  const api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple"

  const [allQuestions, setAllQuestions] = React.useState([])

  const [question, setQuestion] = React.useState({
    id: "",
    question: "...",
    correctAnswer: "...",
    incorrectAnswers: ["...","...","..."],
    options: [],
    selected: "",
    wasAsk:  false
  })

  // Combine Answers randomly
  function insertAtRandomIndex(arr, item) {
    const copiedArr = [...arr]
    const randomIndex = Math.floor(Math.random() * (copiedArr.length + 1));
    copiedArr.splice(randomIndex, 0, item);
    return copiedArr
}

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
            incorrectAnswers: result.incorrect_answers,
            options: allAnswersArray,
            selected: "",
            id:nanoid(),
            wasAsk: false
          }
        }))
      }
      getQuestions()
    }, [])

  function getQuestion() {
    const questionsElements = allQuestions
    // Get Random Question Element
    const randomNumber = Math.floor(Math.random() * questionsElements.length)
    const currentQuestion = questionsElements[randomNumber]

    setQuestion(({
        id: currentQuestion.id,
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correct_answer,
        incorrectAnswers: currentQuestion.incorrect_answers,
        options: currentQuestion.options,
        selected: false,
        wasAsk: !currentQuestion.wasAsk
    }))
  }

  function selectAnswer(event) {
    console.log(event.currentTarget)
    // const {name, value,} = event.target
    //  console.log(name,value)
    //     setAllQuestions(prevData => prevData.map(elem => {
    //       return elem.id===id ? {...elem,  selected:value} : elem
    //    }))
  }


  return (
    <>
      <main>
        {/* Logo Container */}
        <header>
          <h1>Quizzical</h1>
          <img src="./src/assets/react.svg" alt="" className="logo"/>
        </header>
        {/* Quiz Container */}
        <div className="quiz-container">
          {/* Game Details */}
          <div className="game-details-container">
              <h1>Score : <span id="player-score"></span> / 10</h1>
              <h1> Question : <span id="question-number"></span> / 10</h1>
          </div>
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
            correctAnswer={question.correctAnswer}
            incorrectAnswers={question.incorrectAnswers}
            options={question.options}
            selected={question.selected}
            wasAsk={question.wasAsk}
            handleClick={() => selectAnswer(question.options)}
          />
          <div className="next-btn-container">
              <a href="#" onClick={getQuestion}>Next Question</a>
          </div>
        </div>
      </main>
    </>
  )
}
