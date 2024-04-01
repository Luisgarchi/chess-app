import { useState } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";
import Board from "./components/Board";
import ChessBoard from "./chess/ChessBoard";
import { GameContext } from "./GameContext";

const INITIAL_PLAYERS = {
    white: {
        name: "White Player",
        time: 120,
    },
    black: {
        name: "Black Player",
        time: 120,
    }
}

const startNotation = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"


export default function App(){

    // Define state hooks
    const { whiteTime, blackTime, startTimer, stopTimer, resetTimers } = useChessTimers(INITIAL_TIME, INITIAL_TIME);
    const [players, setPlayers] = useState(INITIAL_PLAYERS)
    const [chessLogs, setChessLogs] = useState([{ move: null, fen: startNotation }])
    const [gameDisplay, setGameDisplay] = useState(chessLogs[chessLogs.length - 1].fen)

    const [gameOver, setGameOver] = useState(false);
    const [gameResult, setGameResult] = useState(null)

    // Derive all the relevant game states
    const currentGame = chessLogs[chessLogs.length - 1].fen
    const chessBoard = new ChessBoard(currentGame)
    const isCheckMate = chessBoard.isCheckMate()
    const turn = chessBoard.activeColour
    // const isDraw = chessBoard.isDraw()


    // Check if the game is over
    useEffect(() => {
        if (isCheckMate) {
            // Game ends due to checkmate, so the current player wins
            setGameOver(true);
            setGameResult(turn === 'w' ? 'white-wins' : 'black-wins');
        } else if (whiteTime === 0 || blackTime === 0) {
            // Game ends due to time running out, so the player with time left wins
            setGameOver(true);
            setGameResult(whiteTime === 0 ? 'black-wins' : 'white-wins');
        }
    }, [turn, whiteTime, blackTime, isCheckMate])


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


        const nextTurn = turn === 'w' ? 'b' : 'w';
        stopTimer();
        startTimer(nextTurn);
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