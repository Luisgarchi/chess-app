import { useEffect, useMemo, createContext, memo } from 'react'
import Chess from '../chess/Chess'

import Board from './Board';
import { GameContext } from '../context/GameContext';

function GameBoard ({ gameState, onMove, onGameOver }){
        
    // Derive a chess instance from the game state (in FEN notation)
    const chessInstance = new Chess(gameState)

    // Get the relevant game information
    const turn = chessInstance.activeColour
    const isCheckMate = chessInstance.isCheckMate()
    const isFiftyMove = chessInstance.isFiftyMove() 
    const isStaleMate = chessInstance.isStaleMate()
    

    // Check if the game is over
    useEffect(() => {
        if (isCheckMate) {
            onGameOver({ type: "CHECKMATE", turn });
        } else if (isFiftyMove){
            onGameOver({ type: "FIFTYMOVE" });
        } else if (isStaleMate){
            onGameOver({ type: "STALEMATE" });
        }
    }, [turn, isCheckMate, isFiftyMove, isStaleMate])

    function makeMove(start, end){
        // Execute the move on the board and retrieve the updated FEN notation.
        chessInstance.makeMove(start, end);
        const newFen = chessInstance.fen;
    
        // Construct the move in algebraic notation.
        const moveStart = Chess.toAlgebraicNotation(start);
        const moveEnd = Chess.toAlgebraicNotation(end);
        const algebraicMove = `${moveStart}${moveEnd}`;

        onMove(newFen, algebraicMove, turn);
    }

    const ctxGame = useMemo(() => ({
        chessInstance,
        makeMove,
    }), [chessInstance, makeMove])

    return (        
        <GameContext.Provider value={ctxGame}>
            <Board />
        </GameContext.Provider>
    )
}

export default memo(GameBoard, (prevProps, nextProps) => {
    return prevProps.gameState === nextProps.gameState
})