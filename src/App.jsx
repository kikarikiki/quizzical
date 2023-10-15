import React from "react";
import {nanoid} from "nanoid"
import AnswerItem from './components/AnswerItem.jsx'
import './App.scss'
import { question } from "fontawesome";

export default function App() {

  const api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple"


  const [oneQuestion, setOneQuestion] = React.useState({
    question: "",
    correctAnswer: "",
    incorrectAnswers: []
  })

  const [allQuestions, setAllQuestions] = React.useState([])

  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch(api)
        const data = await res.json()
        setAllQuestions(data.results)
      }
      getQuestions()
    }, [])

  // Get Question
  function getQuestion() {
    // All
    const questionsArray = allQuestions
    // Random numbers of 15(total questions)
    const randomNumber = Math.floor(Math.random() * questionsArray.length)

    const question = questionsArray[randomNumber].question
    const correct_answer = questionsArray[randomNumber].correct_answer
    const incorrect_answers = questionsArray[randomNumber].incorrect_answers

    // Set OneQuestion State Object to
    setOneQuestion(prevQuestion => ({
      ...prevQuestion,
      id: nanoid(),
      question: question,
      correctAnswer: correct_answer,
      incorrectAnswers: incorrect_answers
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
              <h1 id="display-question" className='box-decoration'>{oneQuestion.question}</h1>
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
