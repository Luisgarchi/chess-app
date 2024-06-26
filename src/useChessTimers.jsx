import { useState, useEffect, useCallback } from 'react';


// Custom hook to handle chess timers
export default function useChessTimers(stateTime, stateIncrement) {



    const [whiteTime, setWhiteTime] = useState(stateTime);
    const [blackTime, setBlackTime] = useState(stateTime);
    const [increment, setIncrement] = useState(stateIncrement)

    // Logic to handle no incrementing on first move (only need to handle the black case
    // since whites first move is done with the timers "off" )
    const [incrementBlack, setIncrementBlack] = useState(false);

    // Timer states
    const [isWhiteTimerActive, setIsWhiteTimerActive] = useState(false);
    const [isBlackTimerActive, setIsBlackTimerActive] = useState(false);


    // White Timer
    useEffect(() => {
        let intervalId;
        if (isWhiteTimerActive) {
            intervalId = setInterval(() => {
                setWhiteTime((time) => time > 0 ? time - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isWhiteTimerActive]);

    // Black Timer
    useEffect(() => {
        let intervalId;
        if (isBlackTimerActive) {
            intervalId = setInterval(() => {
                setBlackTime((time) => time > 0 ? time - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isBlackTimerActive]);



    const startTimer = (colour) => {
        if (colour === 'w') {
            setIsWhiteTimerActive(true);
            setIsBlackTimerActive(false);
        } else if (colour === 'b') {
            setIsWhiteTimerActive(false);
            setIsBlackTimerActive(true);
        }
    };

    const stopTimer = useCallback((colour) => {
        if (colour === 'w') {
            setIsWhiteTimerActive(false);
            setWhiteTime((time) => time + increment)

        } else if (colour === 'b') {
            setIsBlackTimerActive(false);

            if (incrementBlack) {
                setBlackTime((time) => time + increment)
            } else {
                setIncrementBlack(true)
            }
            console.log(whiteTime, blackTime)
        }
    }, [increment, incrementBlack]);


    const stopBothTimers = () => {
        setIsWhiteTimerActive(false);
        setIsBlackTimerActive(false);
    }

    
    const initTimers = (timeControl, increment) => {
        setWhiteTime(timeControl);
        setBlackTime(timeControl);
        setIncrement(increment)
        setIncrementBlack(false)
    }

    // Return the added function alongside the existing ones
    return { whiteTime, blackTime, startTimer, stopTimer, stopBothTimers, initTimers };
}