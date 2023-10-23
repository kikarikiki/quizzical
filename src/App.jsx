import React from "react"
import {nanoid} from "nanoid"
import Question from './components/Question.jsx'
import './App.scss'

export default function App() {


  const [allQuestions, setAllQuestions] = React.useState([])
  const [question, setQuestion] = React.useState({
    id: "",
    question: "...",
    correctAnswer: "...",
    allAnswers: [],
    selected: "",
    wasAsk:  false
  })
  const [askedQuestions, setAskedQuestions] = React.useState([])
  const [isCorrect, setIsCorrect] = React.useState(null)

  const score = [
    {value: "100", milestone: true},
    {value: "200", milestone: false},
    {value: "300", milestone: false},
    {value: "500", milestone: false},
    {value: "1.000", milestone: true},
    {value: "2.000", milestone: false},
    {value: "4.000", milestone: false},
    {value: "8.000", milestone: false},
    {value: "16.000", milestone: false},
    {value: "32.000", milestone: true},
    {value: "64.000", milestone: false},
    {value: "125.000", milestone: false},
    {value: "250.000", milestone: false},
    {value: "500.000", milestone: false},
    {value: "1.000.000", milestone: true}
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
            id:nanoid(),
            wasAsk: false
          }
        }))
      }
      getQuestions()
    }, [])

    function getQuestion() {
      const unansweredQuestions = allQuestions.filter(
        (q) => !askedQuestions.includes(q.id)
      );

      if (unansweredQuestions.length > 0) {
        const randomNumber = Math.floor(Math.random() * unansweredQuestions.length);
        const currentQuestion = unansweredQuestions[randomNumber];
        setAskedQuestions([...askedQuestions, currentQuestion.id]);

        setQuestion({
          id: currentQuestion.id,
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correctAnswer,
          allAnswers: currentQuestion.allAnswers,
          wasAsk: !currentQuestion.wasAsk,
          selected: "",
        });
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
      selected: selectedOption
    }));
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
              <h1>Score :<span id="player-score" style={score[askedQuestions.length].milestone ? {color: `#FEC355`} : null }> ${score[askedQuestions.length].value}</span></h1>
              <h1> Question : <span id="question-number"></span> {askedQuestions.length} / {allQuestions.length} </h1>
          </div>
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
            correctAnswer={question.correctAnswer}
            allAnswers={question.allAnswers}
            wasAsk={question.wasAsk}
            handleSelect={handleOptionSelect}
            isCorrect={isCorrect}
            selected={question.selected}
          />
          <div className="next-btn-container">
              <a href="#" onClick={getQuestion}>Next Question</a>
          </div>
        </div>
      </main>
    </>
  )
}
