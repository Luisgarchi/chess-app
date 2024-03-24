import { useState } from "react";

import GameMode from "./components/GameMode";
import ChessBoard from "./components/ChessBoard";
import Player from "./components/Player";

import {INITIAL_CHESS_BOARD, INITIAL_PLAYERS} from "./chess/chess_setup";


function deriveActivePlayer(history){
    // If the history has an even length, it's white's turn
    if (history.length % 2 === 0) {
        return "white"
    }
    // Otherwise it is black''s turn
    else {
        return "black"
    }
}

export default function App(){

    // Define state hooks
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [board, setBoard] = useState(INITIAL_CHESS_BOARD)
    const [history, setHistory] = useState([])
    
    // Derive from state
    const activePlayer = deriveActivePlayer(history)
    /*const winner = deriveWinner(board, history, players)
    const isDraw = deriveDraw()
    */

    
    function handlePlayerNameChange(colour, newName){
        setPlayers((prevPlayers) => {
            const newPlayer = prevPlayers[colour]
            newPlayer.name = newName
            return {
                ...prevPlayers,
                [colour]: newPlayer
            }
        })
    }

    return (
        <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
            <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center">
                    <GameMode />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Player initialName={players.black.name} colour="black" onChangeName={handlePlayerNameChange}/>
                    <ChessBoard board={board}/>
                    <Player initialName={players.white.name} colour="white" onChangeName={handlePlayerNameChange}/>
                </div>
            </div>
        </div>
    )
}