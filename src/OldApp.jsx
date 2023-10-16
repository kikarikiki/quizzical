import React from "react";
import {nanoid} from "nanoid"
import {encode} from 'html-entities'
import AnswerItem from './components/AnswerItem.jsx'
import './App.scss'

export default function OldApp() {

  const api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple"

  const [allQuestions, setAllQuestions] = React.useState([])

  // const [oneQuestion, setOneQuestion] = React.useState({
  //   question: "",
  //   correctAnswer: "",
  //   incorrectAnswers: [],
  //   id: "",
  //   wasAsk: false
  // })

  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch(api)
        const data = await res.json()
        const results = data.results
        // Update AllQuestions Array and add key:value-pair wasAsk: false
        setAllQuestions(results.map(result => {
          return { ...result, id: nanoid, wasAsk: false }
        }))
      }
      getQuestions()
    }, [])

  // Sync internal States (allQuestions, oneQuestion)
  React.useEffect(() => {
    console.log("change")
    // Flip .wasAsk on the object that is displayed
      setAllQuestions(prevQuestions => prevQuestions.map(question => {
        return question.id === oneQuestion.id ?
            {...question, wasAsk: !question.wasAsk} :
            question
      }))
  }, [oneQuestion])


  // Get Question
  function getQuestion() {
    // All questions objects that weren't ask yet (wasAsk = false)
    const questionItem = allQuestions.find(question => !question.wasAsk )

    setOneQuestion(({
      question: questionItem.question,
      correctAnswer: questionItem.correct_answer,
      incorrectAnswers: questionItem.incorrect_answers,
      id: questionItem.id
    }))
  }



    // // Handle wasAsk
    // function handleWasAsk(id) {
    //   // Flip .wasAsk on the object that is displayed
    //   setAllQuestions(prevQuestions => prevQuestions.map(question => {
    //     return question.id === id ?
    //         {...question, wasAsk: !question.wasAsk} :
    //         question
    //   }))
    // }

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
              correctAnswer={encode(oneQuestion.correctAnswer)}
              incorrectAnswers={encode(oneQuestion.incorrectAnswers)}
            />
          </ul>
          <div className="next-btn-container">
              <a href="#" onClick={getQuestion}>Next Question</a>
          </div>
        </div>
      </main>
    </>
  )
}
