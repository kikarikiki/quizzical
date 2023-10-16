import React from "react";
import {nanoid} from "nanoid"
import {encode} from 'html-entities'
import AnswerItem from './components/AnswerItem.jsx'
import './App.scss'

export default function App() {

  const api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple"

  const [allQuestions, setAllQuestions] = React.useState([])

  const [oneQuestion, setOneQuestion] = React.useState({
    question: "",
    correctAnswer: "",
    incorrectAnswers: [],
    wasAsk: false
  })

  //const [ask, setAsk] = React.useState([])

  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch(api)
        const data = await res.json()
        const results = data.results
        // Update AllQuestions Array and add key:value-pair wasAsk: false
        setAllQuestions(results.map(result => {
          return { ...result, wasAsk: false }
        }))
      }
      getQuestions()
    }, [])

  // Helper Function wasAsk
  // function wasAsk(id) {
  //   setAllQuestions(prevQuestions => {
  //     const newQuestions = []
  //           for(let i = 0; i < prevQuestions.length; i++) {
  //               const currentQuestion = prevQuestions[i]
  //               if(currentQuestion.id === id) {
  //                   const updatedQuestion = {
  //                       ...currentQuestion,
  //                       wasAsk: !currentQuestion.wasAsk
  //                   }
  //                   newQuestions.push(updatedQuestion)
  //               } else {
  //                   newQuestions.push(currentQuestion)
  //               }
  //           }
  //           return newQuestions
  //   })
  // }

  // Get Question
  function getQuestion() {
    // All questions objects
    const questionsArray = allQuestions
    // Random numbersArr of 15 numbers (total questions.length)
    const randomNumber = Math.floor(Math.random() * questionsArray.length)

    const question = questionsArray[randomNumber].question
    const correct_answer = questionsArray[randomNumber].correct_answer
    const incorrect_answers = questionsArray[randomNumber].incorrect_answers
    let wasAsk = questionsArray[randomNumber].wasAsk

    // Set OneQuestion State-Object to
    setOneQuestion(prevQuestion => ({
      ...prevQuestion,
      id: nanoid(),
      question: question,
      correctAnswer: correct_answer,
      incorrectAnswers: incorrect_answers,
      wasAsk: !wasAsk
    }))
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
          {/* Questions Container */}
          <div className="deco-lines question-container">
              <p id="display-question" className='box-decoration'>{encode(oneQuestion.question)}</p>
          </div>
          {/* Answers Container */}
          <ul className='answers-container'>
            <AnswerItem
              key={oneQuestion.id}
              id={oneQuestion.id}
              correctAnswer={oneQuestion.correctAnswer}
              incorrectAnswers={oneQuestion.incorrectAnswers}
            />
            {/*
            <li className='deco-lines'><span className='box-decoration'>Option 1</span></li>
            <li className='deco-lines'><span className='box-decoration'>Option 2</span></li>
            <li className='deco-lines'><span className='box-decoration'>Option 3</span></li>
            <li className='deco-lines'><span className='box-decoration'>Option 4</span></li>
            */}
          </ul>
          <div className="next-btn-container">
              <a href="#" onClick={getQuestion}>Next Question</a>
          </div>
        </div>
      </main>
    </>
  )
}
