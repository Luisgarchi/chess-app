import { useState } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";

import ChessBoard from "./chess/ChessBoard";


export const INITIAL_PLAYERS = {
    white: {
        name: "White Player",
        time: undefined,
    },
    black: {
        name: "Black Player",
        time: undefined,
    }
}


const startingFenPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export default function App(){

    // Define state hooks
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [chessLogs, setChessLogs] = useState([{
        moves: null,
        board: startingFenPosition,
    }])

    // Derive all the relevant game states
    const gameState = chessLogs[chessLogs.length - 1].board
    const chessBoard = new ChessBoard(gameState)

    const isWinner = chessBoard.isCheckMate()
    // const isDraw = chessBoard.isDraw()


    // Define event handlers
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
                    <ChessBoard chessBoard = {chessBoard}/>
                    <Player initialName={players.white.name} colour="white" onChangeName={handlePlayerNameChange}/>
                </div>
            </div>
        </div>
    )
}