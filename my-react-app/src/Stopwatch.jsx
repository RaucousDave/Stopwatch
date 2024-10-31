import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime; // Capture the correct start time
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current); // Clear the interval when not running
        }

        return () => {
            clearInterval(intervalIdRef.current); // Cleanup on unmount or re-run
        };
    }, [isRunning, elapsedTime]); // Added elapsedTime to dependencies

    const start = () => {
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
    };

    return (
        <div className="clock-container">
            <div className="clock">
                <p>{formatTime()}</p>
            </div>
            <div className="btn">
                <button id="start" onClick={start}>Start</button>
                <button id="reset" onClick={reset}>Reset</button>
                <button id="stop" onClick={stop}>Stop</button>
            </div>
        </div>
    );
}

export default Stopwatch;
