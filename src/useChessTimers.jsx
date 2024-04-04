import { useState, useEffect, useCallback } from 'react';

export default function useChessTimers(stateTime, stateIncrement) {
    const [whiteTime, setWhiteTime] = useState(stateTime);
    const [blackTime, setBlackTime] = useState(stateTime);
    const [increment, setIncrement] = useState(stateIncrement)
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

    const startTimer = useCallback((colour) => {
        if (colour === 'w') {
            setIsWhiteTimerActive(true);
            setIsBlackTimerActive(false);
        } else if (colour === 'b') {
            setIsWhiteTimerActive(false);
            setIsBlackTimerActive(true);
        }
    }, []);

    const stopTimer = useCallback((colour) => {
        if (colour === 'w') {
            setIsWhiteTimerActive(false);
            setWhiteTime((time) => time + increment)
        } else if (colour === 'b') {
            setIsBlackTimerActive(false);
            setBlackTime((time) => time + increment)
        }
    }, []);

    const initTimers = useCallback((timeControl, increment) => {
        setWhiteTime(timeControl);
        setBlackTime(timeControl);
        setIncrement(increment)
    }, []);

    // Return the added function alongside the existing ones
    return { whiteTime, blackTime, startTimer, stopTimer, initTimers };
}
