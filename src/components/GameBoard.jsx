import { useEffect, useMemo, createContext, memo } from 'react'
import ChessBoard from '../chess/ChessBoard'

import Board from './Board';
import { GameContext } from '../GameContext';

function GameBoard ({ gameState, onMove, onGameOver }){
        
    // Derive a chess instance from the game state (in FEN notation)
    const chessInstance = useMemo(() => new ChessBoard(gameState), [gameState]);

    // Get the relevant game information
    const turn = useMemo(() => chessInstance.activeColour, [chessInstance]);
    const isCheckMate = useMemo(() => chessInstance.isCheckMate(), [chessInstance]);
    //const isStaleMate = useMemo(() => chessInstance.isStaleMate(), [chessInstance]);
    //const isFiftyMove = useMemo(() => chessInstance.isFiftyMove(), [chessInstance]);
    

    // Check if the game is over
    useEffect(() => {
        if (isCheckMate) {
            onGameOver({ type: "CHECKMATE", turn });
        }
    }, [turn, isCheckMate])

    function makeMove(start, end){
        // Execute the move on the board and retrieve the updated FEN notation.
        chessInstance.makeMove(start, end);
        const newFen = chessInstance.fen;
    
        // Construct the move in algebraic notation.
        const moveStart = ChessBoard.toAlgebraicNotation(start);
        const moveEnd = ChessBoard.toAlgebraicNotation(end);
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