import { useState, useContext } from "react"
import { GameContext } from "../context/GameContext"

import Square from "./Square"

// Generates a mask to highlight relevant squares based on the selected piece and board state
function deriveMaskSquareHighlights(chessBoard, selectedPiecePosition) {
    const mask = Array.from({ length: 8 }, () => Array(8).fill("none"));

    // Highlight the king's position if in check
    if (chessBoard.isCheck()) {
        const kingPosition = chessBoard.getKingPosition();
        mask[kingPosition.rowIndex][kingPosition.colIndex] = "check";
    }

    if (selectedPiecePosition === null) return mask; // Early return if no piece is selected

    // Highlight the selected piece
    const { rowIndex, colIndex } = selectedPiecePosition;
    mask[rowIndex][colIndex] = "selected";

    // Calculate and highlight valid moves for the selected piece
    const moves = chessBoard.getAllMoves(selectedPiecePosition);
    const pieceMoves = [...moves.regular, ...moves.enpassant, ...moves.castles];

    pieceMoves.forEach(({ rowIndex, colIndex }) => {
        mask[rowIndex][colIndex] = chessBoard.board[rowIndex][colIndex] === null ? "vacant" : "occupied";
    });

    return mask;
}

export default function Board() {
    const [selectedPiecePosition, setSelectedPiecePosition] = useState(null);
    const { chessInstance } = useContext(GameContext);

    const mask = deriveMaskSquareHighlights(chessInstance, selectedPiecePosition);

    return (
        <ol className="flex flex-col justify-center items-center">
            {chessInstance.board.map((row, rowIndex) => (
                <li className="flex" key={rowIndex}>
                    <ol className="flex justify-center">
                        {row.map((piece, colIndex) => {
                            
                            const maskValue = mask[rowIndex][colIndex];
                            const position = { rowIndex, colIndex };
                            const squareColor = (rowIndex + colIndex) % 2 === 0 ? "bg-[#F0D9B5]" : "bg-[#b58863]";
                            const squareStyles = `w-16 h-16 flex justify-center items-center ${squareColor}`;

                            return (
                                <li key={colIndex} className={squareStyles}>
                                    <Square 
                                        piece={piece}
                                        maskValue={maskValue}
                                        selectedPiecePosition={selectedPiecePosition}
                                        setNewPiece={setSelectedPiecePosition}
                                        position={position}
                                        turn={chessInstance.activeColour}
                                    />
                                </li>
                            );
                        })}
                    </ol>
                </li>
            ))}
        </ol>
    );
}