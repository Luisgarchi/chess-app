import { useState, useRef, useEffect, useContext } from "react";
import { AppContext} from "../context/AppContext";
import Button from "./uiComponents/Button";

export default function MoveHistory() {

    const { states, setStates } = useContext(AppContext);
    const { chessLogs, displayId } = states;
    const { setDisplayId } = setStates

    const [moveHistory, setMoveHistory] = useState([])

    const scrollContainerRef = useRef(null); // Ref for the scroll container

    useEffect(() => {
        // Scroll to the bottom of the list after updates
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [moveHistory]); // Dependency array includes moveHistory

    // When chess logs are updated from our context. Update the history with the latest log
    useEffect(() => {

        if(chessLogs.length === 1){
            setMoveHistory([])
            return
        }

        // Get the move we need to add
        const latestMove = chessLogs[chessLogs.length - 1].move

        if (chessLogs.length % 2 === 1){

            // Get the previous moves up to but not including the last full move
            const previousMoves = moveHistory.slice(0, -1)
            
            // Get the white move
            const whiteMove = moveHistory[moveHistory.length - 1].white

            // Add the new full move to the history
            setMoveHistory([...previousMoves, {white: whiteMove, black: latestMove}])
        }
        else {
            // Start a new full move
            setMoveHistory([...moveHistory, {white: latestMove}])
        }
    }, [chessLogs])


    function forwardOne(){
        if (displayId < chessLogs.length - 1){
            setDisplayId((prevId) => prevId + 1)
        }
    }

    function forwardAll(){
        setDisplayId(chessLogs.length - 1)
    }

    function backOne(){
        if (displayId > 0){
            setDisplayId((prevId) => prevId - 1)
        }
    }

    function backwardAll(){
        setDisplayId(0)
    }

    function clickMove(fullMove, colour){

        const halfMove = (colour === 'white') ? 1 : 2
        const newActiveId = fullMove * 2 + halfMove

        if(newActiveId !== displayId){
            setDisplayId(newActiveId)
        }
    }

    const moves = moveHistory.map((moveData, numFullMove) => {
        
        // Get the row which contains the active move
        const activeRow = Math.floor((displayId - 1) / 2)
        
        const baseStyles = "w-5/12 text-right px-2 hover:bg-stone-700 hover:text-white"
        
        let whiteStyles = baseStyles
        let blackStyles = baseStyles

        if (activeRow === numFullMove){
            // If the activeID is odd then white is the active move
            if (displayId % 2 === 1){
                whiteStyles = baseStyles + " bg-stone-700 text-white"
            } else {
                blackStyles = baseStyles + " bg-stone-700 text-white"
            }
        }

        const whiteMove = moveData.white
        const blackMove = ('black' in moveData) ? moveData.black : ''
        
        if (blackMove === ''){
            blackStyles = "w-5/12 text-right pr-2"
        }

        return (
            <li key={numFullMove} className="flex justify-between px-2 font-semibold">
                <span className="w-1/12">{numFullMove + 1}</span>
                <button className={whiteStyles} onClick={() => clickMove(numFullMove, "white")}> {whiteMove} </button>
                <button className={blackStyles} onClick={() => clickMove(numFullMove, "black")}> {blackMove} </button>        
            </li>
        )
    })

    const iconStyles = "h-8 w-8"
    
    return (
        <div className= "p-4 w-full outline outline-2 rounded mt-4">
            <div className="flex justify-center items-center">
                <Button type="backback" iconStyles = {iconStyles} onClick = {backwardAll} />
                <Button type="back" iconStyles = {iconStyles} onClick={backOne}/>
                <h2 className="text-stone-900 font-bold">Move History</h2>
                <Button type="forward" iconStyles = {iconStyles} onClick={forwardOne}/>
                <Button type="forwardforward" iconStyles = {iconStyles} onClick={forwardAll}/> 
            </div>
            
            <ol ref = {scrollContainerRef} className="flex flex-col w-full max-h-24 overflow-auto">
                {moves}
            </ol>
        </div>
    )   
}