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

  // State of asked Questions && rounds
  const [askedQuestions, setAskedQuestions] = React.useState([])
  const [isCorrect, setIsCorrect] = React.useState(null)
  const [start, setStart] = React.useState(true)
  const [restart, setRestart] = React.useState(false)

  const score = [
    {value: "0", milestone: true},
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
    }, [restart])

    // Get question from allQuestions Arr
    function getQuestion() {
      console.log(allQuestions)
      console.log(askedQuestions)
      setStart(false)
      const unansweredQuestions = allQuestions.filter(q => q.wasAsk === false);

      if (unansweredQuestions.length > 0) {
        const randomNumber = Math.floor(Math.random() * unansweredQuestions.length)
        const randomQuestion = unansweredQuestions[randomNumber]

        setQuestion({
          id: randomQuestion.id,
          question: randomQuestion.question,
          correctAnswer: randomQuestion.correctAnswer,
          allAnswers: randomQuestion.allAnswers,
          wasAsk: !randomQuestion.wasAsk,
          selected: "",
          givenAnswer: null
        })

        setAskedQuestions([...askedQuestions, {...randomQuestion, wasAsk: true}])
        setIsCorrect(null);
        //wasAsk(question.id)

      } else {
        // Start new game
        console.log("finished")
      }
    }

    // Handle givenAnswer on askedQuestion && update -wasAsk- on allQuestions
    React.useEffect(()=>{
      setAllQuestions(prevQuestions => prevQuestions.map(q => q.id === question.id ? {...q, wasAsk: question.wasAsk} : q))
      setAskedQuestions(prevAskQ => prevAskQ.map(q => q.id === question.id ? {...q, givenAnswer: isCorrect} : q))
    }, [question, isCorrect])


    function handleOptionSelect(selectedOption) {
      const isCorrectAnswer = selectedOption === question.correctAnswer;
      setIsCorrect(isCorrectAnswer)
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        selected: selectedOption,
        givenAnswer: isCorrectAnswer
      }))
    }

    /* function restartGame() {
      setAskedQuestions([])
      setAllQuestions([])
      setRestart(prevState => !prevState)
      getQuestion()
    } */


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
            <p>you want to be a quizzionaire?</p><p>Put you knowledge to the test!</p>
            <div className="btn">
                <a href="#" onClick={getQuestion}>Start</a>
            </div>
          </div>
          :
          // Code for the active game screen
          <div className="quiz-container">
            <div className="game-details-container">
                <h1><span id="player-score" style={score[askedQuestions.length].milestone ? {color: `#FEC355`} : null }>  ${score[askedQuestions.length].value}</span></h1>
                <h1><span id="question-number">{askedQuestions.length} / {allQuestions.length}</span></h1>
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
            {/* Conditional rendering of buttons */}
            {question.selected === "" ? null : question.selected === question.correctAnswer ? (
              <div className="btn">
                <a className="start-button" onClick={getQuestion}>Next Question</a>
              </div>
            ) : (
              <div className="btn">
                <a className="restart-button" onClick={getQuestion}>Next Question</a>
              </div>
            )}
          </div>
        }
      </main>
    </>
  )
}
