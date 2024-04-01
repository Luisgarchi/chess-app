import { useState, useEffect, useCallback } from 'react';

export default function useChessTimers(initialWhiteTime, initialBlackTime) {
    const [whiteTime, setWhiteTime] = useState(initialWhiteTime);
    const [blackTime, setBlackTime] = useState(initialBlackTime);
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

    const startTimer = useCallback((color) => {
        if (color === 'w') {
            setIsWhiteTimerActive(true);
            setIsBlackTimerActive(false);
        } else if (color === 'b') {
            setIsWhiteTimerActive(false);
            setIsBlackTimerActive(true);
        }
    }, []);

    const stopTimer = useCallback(() => {
        setIsWhiteTimerActive(false);
        setIsBlackTimerActive(false);
    }, []);

    const resetTimers = useCallback(() => {
        setWhiteTime(initialWhiteTime);
        setBlackTime(initialBlackTime);
    }, [initialWhiteTime, initialBlackTime]);

    // Added function to initialize timers
    const initTimers = useCallback((newWhiteTime, newBlackTime) => {
        setWhiteTime(newWhiteTime);
        setBlackTime(newBlackTime);
    }, []);

    // Return the added function alongside the existing ones
    return { whiteTime, blackTime, startTimer, stopTimer, resetTimers, initTimers };
}
