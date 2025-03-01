import { useState, useCallback, useRef } from "react"
import QUESTINOS from '../../questions.js'
import Over from '../assets/quiz-complete.png'
import Question from "./Question.jsx"
export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([])
    const [answerState, setAnswerState] = useState('');

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
            }, 2000)
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
            <img src={Over} alt="Trophy image" />
            <h2>Quiz completed!</h2>
        </div>
    }


    return (<div id="quiz">
        <Question questionText={QUESTINOS[activeQuestionIndex].text}
            answers={QUESTINOS[activeQuestionIndex].answers}
            onSelectAnswer={handleSelectAnswer}
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSkipAnswer={handleTimerExpire}
            key={activeQuestionIndex}
        />

    </div>);
}
// When the active question index changes, the Answers Question gets destroyed and re-created because of the 
// fantastic key prop
