import React, { useState, useEffect, useMemo, useCallback } from "react";

import SideBar from "./components/SideBar";
import Player from "./components/Player";
import useChessTimers from "./useChessTimers";
import GameBoard from "./components/board/GameBoard";
import Chess from "./chess/Chess";
import Modal from "./components/modals/Modal";
import { AppContext } from "./context/AppContext";
import { fenStart } from "./chess/fenStart";
import DisplayBoard from "./components/board/DisplayBoard";

const INITIAL_PLAYERS = {
    white: "White",
    black: "Black",
}

interface ChessLog {
    move: string | null;
    fen: string;
}

type GameStatus = 'not-started' | 'in-progress' | 'game-over';
type GameResult = string | undefined; 
type Colour = 'w' | 'b'

interface PlayerType {
    white: string;
    black: string;
}

interface Payload {
    type: 'CHECKMATE' | 'STALEMATE' | 'FIFTYMOVE' | 'TIME';
    turn: Colour;
}


const App: React.FC = () => { 

    /* _______   State   _______*/

    // Define App States
    const [chessLogs, setChessLogs] = useState<ChessLog[]>([{ move: null, fen: fenStart }]);
    const [displayId, setDisplayId] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
    const [gameResult, setGameResult] = useState<GameResult>(undefined);
    const [modalStatus, setModalStatus] = useState<string>("welcome");

    // Define Custom Chess Game Settings
    const [players, setPlayers] = useState<PlayerType>({...INITIAL_PLAYERS});
    const [increment, setIncrement] = useState<number>(0);
    const [timeControls, setTimeControls] = useState<number | undefined>(undefined);

    // Define Chess Timers (custom hook)
    const { whiteTime, blackTime, startTimer, stopTimer, stopBothTimers, initTimers } = useChessTimers(timeControls, increment);

    // Derive the current game state from the chess logs
    const gameState = useMemo(() => chessLogs[chessLogs.length - 1].fen, [chessLogs])



    /* _______   Effects   _______*/

    // Check if the game is over by time
    useEffect(() => {
        if (whiteTime === 0 || blackTime === 0) {
            // Game ends due to time running out, so the player with time left wins
            setGameStatus("game-over");
            setGameResult(`${whiteTime === 0 ? players.black : players.white} wins on time`);
            stopBothTimers()
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

    // Initialise the timers when the time controls or increment is changes
    useEffect(()=> {
        initTimers(timeControls, increment)
    }, [timeControls, increment])

    // Set the displayId to the last immediately after a new move is made
    useEffect(() => {
        setDisplayId(chessLogs.length -1);
    },[chessLogs])


    /* _______   Functions   _______*/
    
    function handleGameOver(payload: Payload): void{
        setGameStatus("game-over");

        let winner = payload.turn === 'w' ? players.black : players.white;
        if (payload.type === "CHECKMATE") {
            setGameResult(`Checkmate - ${winner} wins`);
        } else if (payload.type === "STALEMATE") {
            setGameResult("Draw - Stalemate");
        } else if (payload.type === "FIFTYMOVE") {
            setGameResult("Draw - Fifty-move rule");
        } else if (payload.type === "TIME") {
            setGameResult(`${winner} wins on time`);
        }
        stopBothTimers();
    }

    const handleMove = useCallback((fen: string, move: string, turn: Colour): void => {
        setGameStatus("in-progress");
        setChessLogs(prevLogs => [...prevLogs, { move, fen }]);
        if (timeControls !== undefined) {
            stopTimer(turn);
            const nextTurn = turn === 'w' ? 'b' : 'w';
            startTimer(nextTurn);
        }
    }, [timeControls, startTimer, stopTimer]);
    

    function resignGame(colour: Colour): void {
        setGameStatus("game-over");
        setGameResult(`${colour === 'w' ? players.black : players.white} wins by resignation`);
        stopBothTimers()
    }

    function restartGame(): void {
        setChessLogs([{ move: null, fen: fenStart }]);
        setGameStatus("not-started");
        setModalStatus("none");
        setGameResult(undefined);
        setDisplayId(0);
        initTimers(timeControls, increment)
    }


    // App State context

    interface ModalContextType {
        states: {
            chessLogs: ChessLog[];
            displayId: number;
            gameStatus: GameStatus;
            gameResult: GameResult;
            modalStatus: string;
            players: PlayerType;
            timeControls: number | undefined;
            increment: number;
        };
        setStates: {
            setChessLogs: React.Dispatch<React.SetStateAction<ChessLog[]>>;
            setDisplayId: React.Dispatch<React.SetStateAction<number>>;
            setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
            setGameResult: React.Dispatch<React.SetStateAction<GameResult>>;
            setModalStatus: React.Dispatch<React.SetStateAction<string>>;
            setPlayers: React.Dispatch<React.SetStateAction<PlayerType>>;
            setTimeControls: React.Dispatch<React.SetStateAction<number | undefined>>;
            setIncrement: React.Dispatch<React.SetStateAction<number>>;
            initTimers: (tc?: number, inc?: number) => void;
            restartGame: () => void;
        };
    }

    const modalStates = { chessLogs, displayId, gameStatus, gameResult, modalStatus, players, timeControls, increment }
    const modalSetStates = { setChessLogs, setDisplayId, setGameStatus, setGameResult, setModalStatus, setPlayers, setTimeControls, setIncrement, initTimers, restartGame }
    const modalCtxValues: ModalContextType = { states: modalStates, setStates: modalSetStates }

    const displaGame = useMemo(() => (displayId === chessLogs.length - 1), [chessLogs, displayId])
    const displayFen = useMemo(() => chessLogs[displayId].fen, [chessLogs, displayId])
    

    return (
        <AppContext.Provider value = {modalCtxValues}>
            <Modal />

            <div className="bg-stone-200 w-screen h-screen flex justify-center items-center">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Player initialName={players.black} colour="b" onChangeName={() => {return}} time = {blackTime} resign = {resignGame}/>
                        
                        { displaGame && <GameBoard gameState = {gameState} onMove = {handleMove} onGameOver = {handleGameOver} />}
                        { !displaGame && <DisplayBoard gameState = {displayFen} />}

                        <Player initialName={players.white} colour="w" onChangeName={() => {return}} time = {whiteTime} resign = {resignGame}/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <SideBar chessLogs = {chessLogs}/>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    )
}

export default App;