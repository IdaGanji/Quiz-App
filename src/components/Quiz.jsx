import { useState } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length
    // first make a copy of answers because sort mutates the array
    const quizIsOver= activeQuestionIndex===QUESTINOS.length
    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer]
        })
    }
    if (quizIsOver) {
        console.log("quiz is over")
        return <div id="summary">
            <img src={ Over}  alt="Trophy image"/>
            <h2>Quiz completed!</h2>
        </div>
    }
    // Now the last round you end up in the quizIsOver code-block and after return no code is executed
    const copyAnswers= [...QUESTINOS[activeQuestionIndex].answers]
    const shuffledAnswers = copyAnswers.sort(() => Math.random() - 0.5)
    // make sure to always pass a reference to the function and not immediatelycall the function in JSX
    // you can do it by passing an arrow function that calls the original event-listener
    return (<div id="quiz">
        <div id="question">
            <QuestionTimer timeout={10000} onTimeOut={() =>{handleSelectAnswer(null)}}/>
            <h2>{QUESTINOS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map((answer, i) =>
                (<li key={i} className="answer">
                    <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                </li>))}
            </ul>
        </div>
    </div>);
}
