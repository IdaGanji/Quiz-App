import { useState, useCallback } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length
    const quizIsOver = activeQuestionIndex === QUESTINOS.length
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer]
        })
    }, []);
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
    const copyAnswers= [...QUESTINOS[activeQuestionIndex].answers]
    const shuffledAnswers = copyAnswers.sort(() => Math.random() - 0.5)
    return (<div id="quiz">
        <div id="question">
            <QuestionTimer timeout={10000} onTimeOut={handleTimerExpire} key={activeQuestionIndex}/>
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
// Now the issue is that when we are finised with the first question and go to the next, this component is re-rendered
// But since the QuestionTimer component will not re-render as it has not changed
// But since we want the timers to be re-set, we need to make react un-mount and re-mount this component for us
// Solution::: key-prop
// All the components in react have a special Key prop 
// This prop when its value changes -> tells React to destroy the old component and create a new one/ umount and remount the component
