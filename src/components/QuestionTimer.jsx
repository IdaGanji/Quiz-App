import { useState, useEffect } from "react"
export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout)
    //If we don´t wrap it with useEffect, on every re-render so runs this code and we get a new timeOut
    // We only want one timeout and it should be run again if any of the props/states passed to it change
    // For example if the parent component changes the timeout or the onTimeout function then we want setTimeout to be called again with the updated properties
    useEffect(() => {
        setTimeout(onTimeOut, timeout)
        console.log("Setting Timeout"); 
    }, [onTimeOut, timeout])
    // we want our remainingTime state to gets updated every 100ms, but we only want setInterval to happen once
    // so we need to wrap it with useeffect because otherwise we would have this evig loop 
    useEffect(() => {
        setInterval(() => {
            setRemainingTime(prev => prev - 100)
        }, 100)
        console.log("Setting Interval");
    },[])
    return <progress id="question-time" max={timeout} value={remainingTime}></progress>
}
