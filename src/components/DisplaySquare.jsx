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

import highlightVacant from '../assets/highlightVacant.svg'
import highlightEnemy from '../assets/highlightEnemy.svg'

export default function DisplaySquare({ piece, squareColour, maskValue }) {

    const pieceImages = {
        King: { white: kingWhite, black: kingBlack },
        Queen: { white: queenWhite, black: queenBlack },
        Rook: { white: rookWhite, black: rookBlack },
        Bishop: { white: bishopWhite, black: bishopBlack },
        Knight: { white: knightWhite, black: knightBlack },
        Pawn: { white: pawnWhite, black: pawnBlack },
    };

    const pieceImage = piece ? pieceImages[piece.type][piece.colour] : null;
    const showOverlay = maskValue === 'available' || maskValue === 'enemy' || maskValue === 'selected';

    const colourCSS = (squareColour === "light")  ? " bg-[#F0D9B5]" : " bg-[#b58863]"
    const cssSquare = `relative w-full h-full p-0 m-0 flex justify-center items-center ${colourCSS}`


    return (
        <button className = {cssSquare}>
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