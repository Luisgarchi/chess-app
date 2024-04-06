import { useState, useEffect, useMemo, useCallback } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";
import useChessTimers from "./useChessTimers";
import GameBoard from "./components/GameBoard";
import Chess from "./chess/Chess";
import Modal from "./components/modals/Modal";
import { ModalContext } from "./context/ModalContext";
import { fenStart } from "./chess/fenStart";

const INITIAL_PLAYERS = {
    white: "White",
    black: "Black",
}


export default function App(){

    // Define App States
    const [chessLogs, setChessLogs] = useState([{ move: null, fen: fenStart }])
    const [gameDisplay, setGameDisplay] = useState(chessLogs[chessLogs.length - 1].fen)
    const [gameStatus, setGameStatus] = useState("app-start");
    const [gameResult, setGameResult] = useState(undefined)

    // Define Custom Chess Game Settings
    const [players, setPlayers] = useState({...INITIAL_PLAYERS})
    const [increment, setIncrement] = useState(0)
    const [timeControls, setTimeControls] = useState(undefined)

    // Define Chess Timers
    const { whiteTime, blackTime, startTimer, stopTimer, stopBothTimers, initTimers } = useChessTimers(timeControls, increment);

    // Derive the current game state from the chess logs
    const gameState = useMemo(() => chessLogs[chessLogs.length - 1].fen, [chessLogs])

    // Check if the game is over
    useEffect(() => {
        if (whiteTime === 0 || blackTime === 0) {
            // Game ends due to time running out, so the player with time left wins
            setGameStatus("game-over");
            setGameResult(`${whiteTime === 0 ? players.black : players.white} wins on time`);
            stopTimer()
        }
    }, [whiteTime, blackTime])

    // Check for three fold repetition
    useEffect(() => {
        const isThreeFoldRepetition = Chess.isThreeFoldRepetition(chessLogs.map(log => log.fen))
        if (isThreeFoldRepetition) {
            setGameStatus("game-over");
            setGameResult("Threefold repetition - Draw")
        }
    }, [chessLogs])
    
    function handleGameOver(payload){
        setGameStatus("game-over")

        if (payload.type === "CHECKMATE"){
            setGameResult(`Checkmate - ${payload.turn === 'w' ? players.black : players.white} wins`);
        } else if (payload.type === "STALEMATE"){
            setGameResult("Draw - Stalemate")
        } else if (payload.type === "FIFTYMOVE"){
            setGameResult("Draw - Fifty-move rule")
        } else if (payload.type === "TIME"){
            setGameResult(`${payload.turn === 'w' ? players.black : players.white} wins on time`)
        }
        stopBothTimers()
    }

    const handleMove = useCallback((fen, move, turn) => {
        setGameStatus("in-progress");
        setChessLogs(prevLogs => [...prevLogs, { move, fen }]);
        
        if (timeControls !== undefined) {
            stopTimer(turn);
            const nextTurn = turn === 'w' ? 'b' : 'w';
            startTimer(nextTurn);
        }
    }, [timeControls, startTimer, stopTimer]);

    function resignGame(colour){
        setGameStatus("game-over");
        setGameResult(`${colour === 'w' ? players.black : players.white} wins by resignation`);
        stopBothTimers()
    }


    useEffect(()=> {
        initTimers(timeControls, increment)
    }, [timeControls, increment])


    // Modal Context
    const modalStates = { gameStatus, gameResult, players, timeControls, increment }
    const modalSetStates = { setChessLogs, setGameStatus, setGameResult, setPlayers, setTimeControls, setIncrement, initTimers }
    const modalCtxValues = { states: modalStates, setStates: modalSetStates }



    return (
        <>
            <ModalContext.Provider value = {modalCtxValues}>
                <Modal />
            </ModalContext.Provider>

            <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Player initialName={players.black} colour="b" onChangeName={() => {return}} time = {blackTime} resign = {resignGame}/>
                        <GameBoard gameState = {gameState} onMove = {handleMove} onGameOver = {handleGameOver} />
                        <Player initialName={players.white} colour="w" onChangeName={() => {return}} time = {whiteTime} resign = {resignGame}/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <GameMode onChangeTime={() => {return}} gameStatus={gameStatus}/>
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