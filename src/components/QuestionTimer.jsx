import { useState, useEffect } from "react"
export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout)
    useEffect(() => {
       const timeOut= setTimeout(onTimeOut, timeout)
        console.log("Setting Timeout"); 
        return () => {
            clearTimeout(timeOut)
        }
    }, [onTimeOut, timeout])
    useEffect(() => {
     const interval= setInterval(() => {
            setRemainingTime(prev => prev - 100)
        }, 100)
        console.log("Setting Interval");
        return () => {
            clearInterval(interval)
        }
    },[])
    return <>
        <p>{ remainingTime}</p>
    <progress id="question-time" max={timeout} value={remainingTime}></progress></>
}


