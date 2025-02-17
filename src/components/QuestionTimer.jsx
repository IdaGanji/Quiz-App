import { useState, useEffect } from "react"
export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout)
    useEffect(() => {
        setTimeout(onTimeOut, timeout)
        console.log("Setting Timeout"); 
    }, [onTimeOut, timeout])
    //The cleanup function in useEffect runs before the component unmounts or before the effect re-runs.
    useEffect(() => {
     const interval= setInterval(() => {
            setRemainingTime(prev => prev - 100)
        }, 100)
        console.log("Setting Interval");
        // in our case:
        // this function gets automatically called by react before the component is unmounted from the dom 
        return () => {
            clearInterval(interval)
        }
    },[])
    return <>
        <p>{ remainingTime}</p>
    <progress id="question-time" max={timeout} value={remainingTime}></progress></>
}
// The issue of the last commit was that the timer depleated at half of the time defined in timeOut
// reason is that even though we are wrapping setInterval with useEffect, the code gets called twice!
// Due to strictMode in development
//The components get umounted and mounted again so the UseEffects run twice!
//If the useEffect runs twice (due to Strict Mode, hot reload, or component re-mounting), two separate setInterval instances are created.
//Each interval decreases remainingTime every 100 ms independently, meaning the state is updated twice as often.
//Instead of decrementing remainingTime by 100 ms every 100 ms, it now decrements 200 ms every 100 ms, effectively making the timer run twice as fast.
//::Solution:://
// We need a cleanup function in usEeffect

