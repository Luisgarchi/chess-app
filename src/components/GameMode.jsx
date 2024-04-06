import { useState, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"

import timer from "../assets/timer.svg"
import arrowup from "../assets/arrowup.svg"

import Button from "./uiComponents/Button"

export default function GameMode() {

    // Get releveant context states
    const { states } = useContext(AppContext);
    const { chessLogs, timeControls, increment } = states;

    // Define component state
    const [opening, setOpening] = useState(null);

    // Derive states from context
    const currentFen = chessLogs[chessLogs.length - 1].fen;
    const openingRequest = `https://explorer.lichess.ovh/masters?fen=${currentFen}&moves=0&topGames=0`

    // Set the game opening via a http request to Lichess' database
    useEffect(() => {

        async function fetchOpening() {
            // Fetch the opening from the Lichess database
            const response = await fetch(openingRequest);
            const responseData = await response.json();

            // Extarct opening name (if present)
            if(responseData.opening !== null){
                setOpening(responseData.opening.name)
            } else {
                setOpening(null)
            }
        }

        fetchOpening()
    }, [currentFen, openingRequest])


    // Styles for the buttons
    const buttonBaseStyles = `font-bold text-stone-950 flex-grow px-4 border-4 rounded
        bg-stone-400 border-solid border-stone-400 hover:border-stone-600`;

    const buttonMiddleStyles = `${buttonBaseStyles} my-4`;

    // Additional CSS class to ensure text in brackets wraps
    const wrapTextStyles = `block`;



    function handleClick(time) {

        if (gameStatus === "in-progress") {
            setModalIsOpen(true);
            setTime(time);
        }
        else{
            onChangeTime(time);
        }
    }

    function handleRestart(time){
        onChangeTime(time);
        setModalIsOpen(false); // Close the modal
    }


    let displayTime

    if (timeControls === undefined) {
        displayTime = 'Off';
    } else {
        const mins = Math.floor(timeControls / 60)
        displayTime = `${mins.toString()} min${mins > 1 ? 's' : ''}`;
    }

    
    return (
        <header className="bg-stone-400 p-4 flex flex-col justify-between outline outline-2 rounded">
            
            
            <div className="flex justify-between items-center">
                <div >
                    <img src={timer} alt="timer" className="h-8 w-8 inline-block mr-2" />
                    <span className="text-stone-900 font-bold">  { displayTime }</span>
                </div>
                <div>
                    <img src={arrowup} alt="increment" className="h-8 w-8 inline-block mr-2" />
                    <span className="text-stone-900 font-bold"> {increment}s</span>   
                </div>
                <Button type = "restart" iconStyles={"h-8 w-8 mr-2"}/>
                <Button type = "settings" iconStyles={"h-7 w-7 mr-2"}/>
            </div>

            {/*  <Navigation />  */}
            {/*  <History />  <h1>{opening.opening.name}</h1> */}
            
            <h2 className="text-2xl font-bold text-black mb-2">Welcome to React Chess</h2>
            <button className={buttonBaseStyles} >
                Bullet <span className={wrapTextStyles}>(2 min)</span>
            </button>
            <button className={buttonMiddleStyles}>
                Blitz <span className={wrapTextStyles}>(5 mins)</span>
            </button>
            <button className={buttonBaseStyles} >
                Rapid <span className={wrapTextStyles}>(10 mins)</span>
            </button>
        </header>
    );
}