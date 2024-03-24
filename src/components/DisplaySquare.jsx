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


export default function DisplaySquare({ piece, squareColour, maskValue }) {
    const pieceImages = {
        King: { white: kingWhite, black: kingBlack },
        Queen: { white: queenWhite, black: queenBlack },
        Rook: { white: rookWhite, black: rookBlack },
        Bishop: { white: bishopWhite, black: bishopBlack },
        Knight: { white: knightWhite, black: knightBlack },
        Pawn: { white: pawnWhite, black: pawnBlack },
    };

    const pieceImage = pieceImages[piece.type][piece.colour];

    /*
    if (squareColour === "light") {
        cssSquare += " bg-[#F0D9B5]"
    }
    else {
        cssSquare += " bg-[#b58863]"
    }
    */

    return (
        <button className="w-full h-full p-0 m-0 flex justify-center items-center">
            <img className="w-full h-full object-contain" src={pieceImage} alt={`${piece.colour} ${piece.type}`} />
        </button>
    );
}