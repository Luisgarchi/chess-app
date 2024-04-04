import { useState, useEffect, useMemo, useCallback } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";
import useChessTimers from "./useChessTimers";
import GameStart from "./components/modals/GameStart";
import GameOver from "./components/modals/GameOver"
import GameBoard from "./components/GameBoard";

const startNotation = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const INITIAL_PLAYERS = {
    white: "White",
    black: "Black",
}


export default function App(){

    // Define App States
    const [chessLogs, setChessLogs] = useState([{ move: null, fen: startNotation }])
    const [gameDisplay, setGameDisplay] = useState(chessLogs[chessLogs.length - 1].fen)
    const [gameStatus, setGameStatus] = useState("not-started");
    const [gameResult, setGameResult] = useState(undefined)

    // Define Custom Chess Game Settings
    const [players, setPlayers] = useState({...INITIAL_PLAYERS})
    const [increment, setIncrement] = useState(0)
    const [timeControls, setTimeControls] = useState(undefined)

    // Define Chess Timers
    const { whiteTime, blackTime, startTimer, stopTimer, stopBothTimers, initTimers } = useChessTimers(timeControls, increment);

    // Derive the current game state from the chess logs
    const gameState = useMemo(() => chessLogs[chessLogs.length - 1].fen, [chessLogs])






    // const isDraw = chessBoard.isDraw()
    // const isStaleMate = chessBoard.isStaleMate()

    // Check if the game is over
    useEffect(() => {
        if (whiteTime === 0 || blackTime === 0) {
            // Game ends due to time running out, so the player with time left wins
            setGameStatus("game-over");
            setGameResult(`${whiteTime === 0 ? players.black : players.white} wins on time`);
            stopTimer()
        }
    }, [whiteTime, blackTime])

    


    function handleGameOver(payload){
        setGameStatus("game-over")

        if (payload.type === "CHECKMATE"){
            setGameResult(`Checkmate - ${payload.turn === 'w' ? players.black : players.white} wins`);
        } else if (payload.type === "STALEMATE"){
            setGameResult("Stalemate - Draw")
        } else if (payload.type === "FIFTYMOVE"){
            setGameResult("Fifty-move rule - Draw")
        } else if (payload.type === "TIME"){
            setGameResult(`${payload.turn === 'w' ? players.black : players.white} wins on time`)
        }
        stopBothTimers()
    }

    function handleMove(fen, move, turn){
        setGameStatus("in-progress")
        setChessLogs(prevLogs => [...prevLogs, { move, fen }]);

        stopTimer(turn);
        const nextTurn = turn === 'w' ? 'b' : 'w';
        startTimer(nextTurn);
    }

    function handlePlayerNameChange(colour, newName){
        setPlayers(prevPlayers => ({...prevPlayers, [colour]: newName}));  
    }

    function configureGame(time, increment, whiteName, blackName){
        setTimeControls(time)
        setIncrement(increment)
        setPlayers({white: whiteName, black: blackName})
    }

    useEffect(()=> {
        initTimers(timeControls, increment)
    }, [timeControls, increment])

    const initParams = { timeControls, increment, players }

    return (
        <>
            {(gameStatus === "not-started") && 
                <GameStart configGame={configureGame} initParams = {initParams} close = {() => setGameStatus("in-progress")} />}
            {(gameStatus === "game-over") && 
                <GameOver status = {gameResult}/>}

            <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <GameMode onChangeTime={() => {return}} gameStatus={gameStatus}/>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Player initialName={players.black} colour="black" onChangeName={handlePlayerNameChange} time = {blackTime}/>
                        <GameBoard gameState = {gameState} onMove = {handleMove} onGameOver = {handleGameOver} />
                        <Player initialName={players.white} colour="white" onChangeName={handlePlayerNameChange} time = {whiteTime}/>
                    </div>
                </div>
            </div>
        </>
    )
}


/**Move / Leave the timers in the main App.jsx file.

Make move can behalf in the main App.jsx file (this should be the logic that is concerned with handling the timers and the chessLogs)
- Logic that has to do with parsing the moves and the fen can be in the Game Component. (Pass these values back to the function define in the App)

Create a context API for time? Use in app consumed inside player. */