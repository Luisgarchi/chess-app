import { useState, useEffect, useMemo, useCallback } from "react";

import GameMode from "./components/GameMode";
import Player from "./components/Player";
import {CurrentGame} from "./components/CurrentGame";
import ChessBoard from "./chess/ChessBoard";
import useChessTimers from "./useChessTimers";
import GameStart from "./components/modals/GameStart";
import Modal from "./components/Modal";
const startNotation = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const INITIAL_TIME = 300;

 const INITIAL_PLAYERS = {
    white: "Player 1",
    black: "Player 2",
}

export default function App(){

    // Define state hooks
    const { whiteTime, blackTime, startTimer, stopTimer, resetTimers, initTimers } = useChessTimers(INITIAL_TIME, INITIAL_TIME);
    
    const [players, setPlayers] = useState({...INITIAL_PLAYERS})
    const [chessLogs, setChessLogs] = useState([{ move: null, fen: startNotation }])
    const [gameDisplay, setGameDisplay] = useState(chessLogs[chessLogs.length - 1].fen)
    
    const [gameStatus, setGameStatus] = useState("not-started");
    const [gameResult, setGameResult] = useState(null)

    // Derive all the relevant game states
    const currentGame = useMemo(() => chessLogs[chessLogs.length - 1].fen, [chessLogs]);
    const chessBoard = useMemo(() => new ChessBoard(currentGame), [currentGame]);
    const isCheckMate = useMemo(() => chessBoard.isCheckMate(), [chessBoard]);
    const turn = useMemo(() => chessBoard.activeColour, [chessBoard]);
    const isBoardCurrent = useMemo(() => gameDisplay === currentGame, [gameDisplay, currentGame]);


    // const isDraw = chessBoard.isDraw()


    // Check if the game is over
    useEffect(() => {
        if (isCheckMate) {
            // Game ends due to checkmate, so the current player wins
            setGameStatus("game-over");
            setGameResult(turn === 'w' ? 'black-wins' : 'white-wins');
            stopTimer()
        } else if (whiteTime === 0 || blackTime === 0) {
            // Game ends due to time running out, so the player with time left wins
            setGameStatus("game-over");
            setGameResult(whiteTime === 0 ? 'black-wins' : 'white-wins');
            stopTimer()
        }
    }, [turn, whiteTime, blackTime, isCheckMate])

    

    // Define event handlers
    function handlePlayerNameChange(colour, newName){
        setPlayers(prevPlayers => ({...prevPlayers, [colour]: newName}));  
    }

    const handleMakeMove = useCallback((start, end) => {
        // Execute the move on the board and retrieve the updated FEN notation.
        chessBoard.makeMove(start, end);
        const newFen = chessBoard.fen;
    
        // Construct the move in algebraic notation.
        const moveStart = ChessBoard.toAlgebraicNotation(start);
        const moveEnd = ChessBoard.toAlgebraicNotation(end);
        const algebraicMove = `${moveStart}${moveEnd}`;
        
        // Update chess status
        setGameStatus("in-progress");

        // Update the chess logs with the new move and FEN.
        setChessLogs(prevLogs => [...prevLogs, { move: algebraicMove, fen: newFen }]);
        
        // Reflect the new game state in the display.
        setGameDisplay(newFen);
    
        // Switch turns, stopping the timer for the current player and starting it for the next.
        const nextTurn = turn === 'w' ? 'b' : 'w';
        stopTimer();
        startTimer(nextTurn);
    }, [chessBoard, setChessLogs, setGameDisplay, turn, stopTimer, startTimer]);

    /**Why Specify Dependencies?
     * When you define a function inside a React component, that function captures the current values 
     * of props, state, and any other variables it uses from the component's scope ("closures"). 
     * If any of these captured values change, the function won't "see" the updated values unless it's 
     * redefined to capture the new values. This is crucial for functions that interact with state or 
     * props, like handleMakeMove, which uses several pieces of component state and props. 
     * */

    const handleTimeChange = function(newTime) { 
        stopTimer()
        initTimers(newTime, newTime)
        setChessLogs([{ move: null, fen: startNotation }])
        setGameDisplay(startNotation)
        setGameStatus("not-started")
        setGameResult(null)
    }
    

    const ctxGame = useMemo(() => ({
        fen: gameDisplay,
        active: isBoardCurrent,
        makeMove: handleMakeMove,
    }), [gameDisplay, isBoardCurrent, handleMakeMove])
    
    const [isModalOpen, setIsModalOpen] = useState(gameStatus ==="not-started" || gameStatus ==="game-over")


    function handleGameConfig(player1, player2, time){
        initTimers(time, time)
        setPlayers({white: player1, black: player2})
        setIsModalOpen(false)
    }

    function handleGameDefault(){
        initTimers(INITIAL_TIME, INITIAL_TIME)
        setPlayers({white: "Player 1", black: "Player 2"})
        setIsModalOpen(false)
    }
    console.log(players)
    return (
        <>
            <Modal open={isModalOpen} onClose={(handleGameDefault)}>
                {(gameStatus ==="not-started") && <GameStart 
                    configGame={handleGameConfig}
                    defaultGame = {handleGameDefault} 
                    initNames = {players}
                />}
                {(gameStatus ==="game-over") && <RestartConfirmation 
                    onRestart={() => handleRestart(time)} 
                    onCancel={closeModal} 
                />}
            </Modal>
            <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <GameMode onChangeTime = {handleTimeChange} gameStatus = {gameStatus}/>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Player initialName={players.black} colour="black" onChangeName={handlePlayerNameChange} time = {blackTime}/>
                        <CurrentGame value={ctxGame} />
                        <Player initialName={players.white} colour="white" onChangeName={handlePlayerNameChange} time = {whiteTime}/>
                    </div>
                </div>
            </div>
        </>
    )
}