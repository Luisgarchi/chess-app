import { useState, useRef, useEffect, useContext } from "react";
import { AppContext} from "../context/AppContext";
import Button from "./uiComponents/Button";

function pairMoves(chessLogs){
    const moves = []
    // Start from 1 since we want to skip the initial board state (which is not a move)
    for (let i = 1; i < chessLogs.length; i++){

        // White will move when i is odd
        const move = chessLogs[i].move
        if(i % 2 === 0){
            moves.push({
                white: chessLogs[i-1].move,
                black: chessLogs[i].move
            })
        }
    }
    // If black has not yet moved add the white move
    if(i % 2 !== 0){
        moves.push( {white: chessLogs[i-1].move} )
    }
    return moves
}



export default function MoveHistory() {

    const { states } = useContext(AppContext);
    const { chessLogs } = states;

    const [moveHistory, setMoveHistory] = useState([])
    const scrollContainerRef = useRef(null); // Ref for the scroll container

    useEffect(() => {
        // Scroll to the bottom of the list after updates
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [moveHistory]); // Dependency array includes moveHistory

    // In case the component is re-mounted with existing chess logs
    useEffect(() => {
        if(chessLogs.length > 1){
            setMoveHistory(pairMoves(chessLogs))
        }
    }, [])
    

    // When chess logs are updated from our context. Update the history with the latest log
    useEffect(() => {

        if(chessLogs.length === 1){
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


    const moves = moveHistory.map((moveData, numFullMove) => {
        
        const whiteMove = moveData.white
        const blackMove = ('black' in moveData) ? moveData.black : ''
         
        return (
            <li key={numFullMove} className="flex justify-between px-2">
                <span className="w-1/12">{numFullMove + 1}</span>
                <span className="w-5/12 text-right">{whiteMove}</span>
                <span className="w-5/12 text-right">{blackMove}</span>
            </li>
        )
        
    })

    const iconStyles = "h-8 w-8"
    
    return (
        <div className= "p-4 w-full outline outline-2 rounded mt-4">
            <div className="flex justify-center items-center">
                <Button type="backback" iconStyles = {iconStyles} />
                <Button type="back" iconStyles = {iconStyles} />
                <h2 className="text-stone-900 font-bold">Move History</h2>
                <Button type="forward" iconStyles = {iconStyles} />
                <Button type="forwardforward" iconStyles = {iconStyles} /> 
            </div>
            
            <ol ref = {scrollContainerRef} className="flex flex-col w-full max-h-24 overflow-auto">
                {moves}
            </ol>
        </div>
    )   
}