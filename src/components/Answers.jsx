import { useRef } from "react";
export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();
    // Now the bug in the last commit was that the shuffledAnswers never get updated as the activeQuestionIndex updates
    // So what we look for is to be able to be able to somehow make the answers part of the app
    // To be reset every time we go to another question
    // That is possible using Key prop because it unmounts and mounts the component and all get reset
    // When the key changes and a new version of the component is created
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer, i) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }
                return <li key={i} className="answer">
                    <button className={cssClass} onClick={() => onSelect(answer)}>{answer}</button>
                </li>
            }
            )}
        </ul>
    );
}