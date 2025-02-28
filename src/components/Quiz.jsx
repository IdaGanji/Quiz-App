import { useState, useCallback } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const [answerState, setAnswerState] = useState('');
    // We added more logic here
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsOver = activeQuestionIndex === QUESTINOS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer]
        })
        setTimeout(() => {
            if (selectedAnswer === QUESTINOS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong')
            }
            // We add a nested timer that starts when the parent one expired
            setTimeout(() => {
                setAnswerState('');
            },2000)
        }, 1000)
        // The activeQuestionIndex should be added as a dependecy because we want the function to be re-created 
        // When this variable changes!
    }, [activeQuestionIndex]);

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
                {shuffledAnswers.map((answer, i) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = '';
                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    }
                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState;
                    }
                    return <li key={i} className="answer">
                    <button className={cssClass} onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                </li>
                }
                )}
            </ul>
        </div>
    </div>);
}

