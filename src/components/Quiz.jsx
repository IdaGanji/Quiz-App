import { useState, useCallback } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length
    // first make a copy of answers because sort mutates the array
    const quizIsOver = activeQuestionIndex === QUESTINOS.length
    // now handleSelectAnswer should be wrapped by useCallBack
    // no dependencies because the only thing used is state-updating function and that is not needed as a dependency
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer]
        })
    }, []);
    // first the arrow-function
    // we wrap it with useCallBack and pass the handleselectanswer as dependency
    // because that function is a value that internally depends on props and states

    const handleTimerExpire = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]); 
    
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
            <QuestionTimer timeout={10000} onTimeOut={handleTimerExpire}/>
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
// The solution to the previous commit is to wrap the functions with useCallback hook
// because everytime this component is run again, the handleSelectAnswer and the
// nameless arrow-function () =>{handleSelectAnswer(null)} are brand new functions in memory.
// With the useCallBack in place, our functions are not re-executed just because the surrounding componet has re-rendered

///::Issue::://
// we still have the wired pause after the timer has ran out and the next question being rendered!