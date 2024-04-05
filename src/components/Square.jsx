import { useContext } from 'react';
import DisplayPiece from './DisplayPiece';
import DisplayOverlay from './DisplayOverlay';
import { GameContext } from "../context/GameContext"

export default function Square({ piece, maskValue, selectedPiecePosition, setNewPiece, position, turn }) {

    // Context hooks
    const { makeMove } = useContext(GameContext);

    // Determine if the moving to the square is valid based on the mask value
    const validMove = maskValue === 'vacant' || maskValue === 'occupied';

    // Determine square background based on mask value
    let background = "bg-transparent"; // default background
    if (maskValue === 'selected') {
        background = "bg-blue-500 bg-opacity-50"; // selected piece background
    } else if (maskValue === 'check') {
        background = "bg-red-500 bg-opacity-50"; // check position background
    }

    // Determine if the current piece matches the player's turn
    const currentColourPieces = turn === 'w' ? 'KQRBNP' : 'kqrbnp';
    const changePiece = piece !== null && currentColourPieces.includes(piece);

    // Enable click based on game logic
    const canClick = changePiece || validMove;
    const cursorStyle = canClick ? "cursor-pointer" : "cursor-default";

    // Combine all styles for the square button
    let stylesSquareButton = `relative w-full h-full p-0 m-0 flex justify-center items-center ${background} ${cursorStyle}`;


    // Handles click events on the square
    function handleClick() {
        if (validMove) {
            // Execute the move
            makeMove(selectedPiecePosition, position);
            setNewPiece(null);
        } else if (maskValue === 'selected' || (selectedPiecePosition !== null && maskValue === 'none')) {
            // Deselect the piece
            setNewPiece(null);
        } else if (changePiece) {
            // Select a new piece
            setNewPiece(position);
        }
    }

    return (
        <button
            className = {stylesSquareButton}
            onClick = {() => handleClick(position, selectedPiecePosition)}
        >
            {piece && <DisplayPiece piece={piece} />}
            {validMove && <DisplayOverlay value={maskValue} />}
        </button>
    );
}