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


export default function DisplayPiece({ piece }) {
    const pieceImages = {
        king: { white: kingWhite, black: kingBlack },
        queen: { white: queenWhite, black: queenBlack },
        rook: { white: rookWhite, black: rookBlack },
        bishop: { white: bishopWhite, black: bishopBlack },
        knight: { white: knightWhite, black: knightBlack },
        pawn: { white: pawnWhite, black: pawnBlack },
    };

    const pieceImage = pieceImages[piece.type][piece.colour];

    return (
        <button className="w-full h-full p-0 m-0 flex justify-center items-center">
            <img className="w-full h-full object-contain" src={pieceImage} alt={`${piece.colour} ${piece.type}`} />
        </button>
    );
}