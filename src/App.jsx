import './App.scss'

export default function App() {

  return (
    <>
      <main>
        {/* Logo Container */}
        <header>
          <img src="" alt="" className="logo"/>
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
              <h1 id="display-question" className='box-decoration'>Question Example</h1>
          </div>
          {/* Answers Container */}
          <ul className='answers-container'>
            <li className='deco-lines'><span className='box-decoration'>1</span></li>
            <li className='deco-lines'><span className='box-decoration'>2</span></li>
            <li className='deco-lines'><span className='box-decoration'>3</span></li>
            <li className='deco-lines'><span className='box-decoration'>4</span></li>
          </ul>
          <div className="next-btn-container">
              <a href="#">Next Question</a>
          </div>
        </div>
      </main>
    </>
  )
}
