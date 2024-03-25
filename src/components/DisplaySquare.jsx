import kingWhite from '../assets/kingWhite.svg'
import kingBlack from '../assets/kingBlack.svg'
import queenWhite from '../assets/queenWhite.svg'
import queenBlack from '../assets/queenBlack.svg'
import rookWhite from '../assets/rookWhite.svg'
import rookBlack from '../assets/rookBlack.svg'
import bishopWhite from '../assets/bishopWhite.svg'
import bishopBlack from '../assets/bishopBlack.svg'
import knightWhite from '../assets/knightWhite.svg'
import knightBlack from '../assets/knightBlack.svg'
import pawnWhite from '../assets/pawnWhite.svg'
import pawnBlack from '../assets/pawnBlack.svg'

const pieceImages = {
    King: { white: kingWhite, black: kingBlack },
    Queen: { white: queenWhite, black: queenBlack },
    Rook: { white: rookWhite, black: rookBlack },
    Bishop: { white: bishopWhite, black: bishopBlack },
    Knight: { white: knightWhite, black: knightBlack },
    Pawn: { white: pawnWhite, black: pawnBlack },
};

import highlightVacant from '../assets/highlightVacant.svg'
import highlightEnemy from '../assets/highlightEnemy.svg'



export default function DisplaySquare({ piece, maskValue, selectedPiece, playerTurn }) {



    // Format the square with the piece image and overlay
    const pieceImage = piece ? pieceImages[piece.type][piece.colour] : null;
    const showOverlay = maskValue === 'available' || maskValue === 'enemy';

    let stylesSquareButton = `relative w-full h-full p-0 m-0 flex justify-center items-center`

    if (maskValue === 'selected') {
        stylesSquareButton += " bg-blue-500 bg-opacity-50"
    }
    else {
        stylesSquareButton += " bg-transparent"
    }

    // Button is active when:
    // 1) No piece is selected and the square contains a piece that matches the current players colour.
    // 2) A piece is selected and the square contains is one of those that the selected piece can move to.
    // 3) The piece is selected and a square contains a piece of the same colour (i.e. to change moving piece)
    const isButtonActive = (
        (selectedPiece === null && piece !== null && piece.colour === playerTurn) ||
        (selectedPiece !== null && (maskValue === 'available' || maskValue === 'enemy')) || 
        (selectedPiece !== null && piece !== null && piece.colour === selectedPiece.colour)
    )
    
    return (
        <button disabled={!isButtonActive} className = {stylesSquareButton} >
            {piece && (
                <img 
                    className = "absolute top-0 left-0 w-full h-full object-contain z-10" 
                    src={pieceImage} 
                    alt={`${piece.colour} ${piece.type}`} 
                 />
            )}
            {showOverlay && (
                <img 
                    className = "absolute top-0 left-0 w-full h-full object-contain z-20" 
                    src={ (piece === null) ? highlightVacant : highlightEnemy} 
                    alt="Highlight" 
                />
            )}
        </button>
    );
}