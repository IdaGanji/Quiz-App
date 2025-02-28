import { useState, useCallback, useRef } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const shuffledAnswers = useRef();
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
    // Now the bug in the last commit was that since we added another state (answerState)
    // Then the UI re-renders immediately at line 13 when the user chooses an answer
    // So the shuffledAnswers variable is calculated again and since the question index has not changed yet
    // We don´t immediately jump to the next question and but the same questions answers gets shuffled
    ///::::::Solution::::
    // we can store the value of the shuffledAnswers in a ref-variable
    // Since ref-variables persist their value independently of component being re-rendered then the value won´t be re-calculated
    // at every component re-render
    // So we can check if the current is undefined, we sort it otherwise not.
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...QUESTINOS[activeQuestionIndex].answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (<div id="quiz">
        <div id="question">
            <QuestionTimer timeout={10000} onTimeOut={handleTimerExpire} key={activeQuestionIndex}/>
            <h2>{QUESTINOS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.current.map((answer, i) => {
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

