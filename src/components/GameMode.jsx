import { useState, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"

import timer from "../assets/timer.svg"
import arrowup from "../assets/arrowup.svg"

import Button from "./uiComponents/Button"
import MoveHistory from "./MoveHistory."


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
            }
        }

        fetchOpening()
    }, [currentFen, openingRequest])


    let displayTime

    if (timeControls === undefined) {
        displayTime = 'Off';
    } else {
        const mins = Math.floor(timeControls / 60)
        displayTime = `${mins.toString()}m`;
    }

    return (
        <header className="bg-stone-400 p-4 flex flex-col justify-between outline outline-2 rounded-lg w-80 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                    <img src={timer} alt="timer" className="h-9 w-9 inline-block" />
                    <span className="text-stone-900 font-bold">  { displayTime }</span>
                </div>
                <div className="flex-1">
                    <img src={arrowup} alt="increment" className="h-9 w-9 inline-block" />
                    <span className="text-stone-900 font-bold"> {increment}s</span>   
                </div>
                <Button type = "restart" iconStyles={"h-10 w-10 mr-2 outline outline-2 rounded-md p-1"}/>
                <Button type = "settings" iconStyles={"h-10 w-10 mr-2 outline outline-2 rounded-md p-1"}/>
            </div>

            {/*  <Navigation />  */}
            {/*  <History />  <h1>{opening.opening.name}</h1> */}
            
            {opening !== null && <h1 className="text-lg font-bold text-black mt-2 text-center">{opening}</h1>}
            <MoveHistory/>

        </header>
    );
}