import { useState } from "react";

import GameMode from "./components/GameMode";
import Board from "./components/Board";
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

const startingFenPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export default function App(){

    // Define state hooks
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [matchLog, setMatchLog] = useState([
        {
            boardPositions: startingFenPosition, 
            moves: null
        }
    ])
    const [pieces, setPieces] = useState(initChessPieces())
    
    // Derive from state
    const turn = deriveActivePlayer(history)

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

    function handlePieceSelect(){
        return 1;
    }

    function handlePieceMove(){
        return 1
    }

    function handleClick(){
        return 1
    }

    return (
        <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
            <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center">
                    <GameMode />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Player initialName={players.black.name} colour="black" onChangeName={handlePlayerNameChange}/>
                    <ChessBoard pieces={pieces} turn = {turn}/>
                    <Player initialName={players.white.name} colour="white" onChangeName={handlePlayerNameChange}/>
                </div>
            </div>
        </div>
    )
}