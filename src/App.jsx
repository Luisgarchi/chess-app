import { useState } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";
import Board from "./components/Board";
import ChessBoard from "./chess/ChessBoard";
import { GameContext } from "./GameContext";

const INITIAL_PLAYERS = {
    white: {
        name: "White Player",
        time: undefined,
    },
    black: {
        name: "Black Player",
        time: undefined,
    }
}

const startNotation = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"


export default function App(){

    // Define state hooks
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [chessLogs, setChessLogs] = useState([{
        move: null,
        fen: startNotation,
    }])
    const [gameDisplay, setGameDisplay] = useState(chessLogs[chessLogs.length - 1].fen)


    // Derive all the relevant game states
    const currentGame = chessLogs[chessLogs.length - 1].fen
    const chessBoard = new ChessBoard(currentGame)

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

    function handleMakeMove(start, end){

        // Make the move on the board
        chessBoard.makeMove(start, end)
        // Get the new fen
        const newFen = chessBoard.fen

        // Derive the move in algebraic notation
        const moveStart = ChessBoard.toAlgebraicNotation(start)
        const moveEnd = ChessBoard.toAlgebraicNotation(end)
        const move = `${moveStart}${moveEnd}`
        
        // Update the logs
        setChessLogs((prevLogs) => {
            const newLog = {
                move: move,
                fen: newFen,
            }
            return [...prevLogs, newLog]
        })
        // Update the display
        setGameDisplay(newFen)
    }

    const isBoardCurrent = gameDisplay === currentGame

    const ctxGame = {
        fen: gameDisplay,
        active: isBoardCurrent,
        makeMove: handleMakeMove,
    }

    return (
        <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
            <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center">
                    <GameMode />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Player initialName={players.black.name} colour="black" onChangeName={handlePlayerNameChange}/>
                    
                    <GameContext.Provider value={ctxGame}>
                        <Board />
                    </GameContext.Provider>
                    <Player initialName={players.white.name} colour="white" onChangeName={handlePlayerNameChange}/>
                </div>
            </div>
        </div>
    )
}