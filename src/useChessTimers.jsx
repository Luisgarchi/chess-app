import { useState, useEffect, useCallback } from 'react';

export default function useChessTimers(stateTime, stateIncrement) {
    const [whiteTime, setWhiteTime] = useState(stateTime);
    const [blackTime, setBlackTime] = useState(stateTime);
    const [increment, setIncrement] = useState(stateIncrement)

    // Logic to handle no incrementing on first move
    const [incrementWhite, setIncrementWhite] = useState(false);
    const [incrementBlack, setIncrementBlack] = useState(false);

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

            if(incrementWhite) {
                setWhiteTime((time) => time + increment)
            } else {
                setIncrementWhite(true)
            }

        } else if (colour === 'b') {
            setIsBlackTimerActive(false);

            if (incrementBlack) {
                setBlackTime((time) => time + increment)
            } else {
                setIncrementBlack(true)
            }
        }
    }, [increment, incrementWhite, incrementBlack]);

    const stopBothTimers = useCallback(() => {
        setIsWhiteTimerActive(false);
        setIsBlackTimerActive(false);
    }, []);

    const initTimers = useCallback((timeControl, increment) => {
        setWhiteTime(timeControl);
        setBlackTime(timeControl);
        setIncrement(increment)
        setIncrementWhite(false)
        setIncrementBlack(false)
    }, []);

    // Return the added function alongside the existing ones
    return { whiteTime, blackTime, startTimer, stopTimer, stopBothTimers, initTimers };
}