import { useState } from "react";

import Position from "./chess/utils/Position";
import GameMode from "./components/GameMode";
import ChessBoard from "./components/ChessBoard";
import Player from "./components/Player";

import { INITIAL_PLAYERS, initChessPieces } from "./chess/chess_setup";


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

function deriveBoard(pieces){

    const board = Array.from({ length: 8 }, () => Array(8).fill(null))
    
    function formatRow(row) {
        const nRows = board.length
        /* subtract 1 from row because board is represented as an array (starts at zero index)
        subtract from nRows since we want lower rows displayed at the bottom of the console instead of at top*/ 
        return (nRows - 1) - (row - 1)
    }

    function formatColumn(column){
        // zero index columns
        return column - 1
    }

    for(const piece of pieces){
        const row = formatRow(piece.position.rank)
        const column = formatColumn(Position.fileToNum(piece.position.file))
        board[row][column] = piece
    }

    return board
}

export default function App(){

    // Define state hooks
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [pieces, setPieces] = useState(initChessPieces())
    const [history, setHistory] = useState([])
    
    // Derive from state
    const activePlayer = deriveActivePlayer(history)
    const board = deriveBoard(pieces)

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