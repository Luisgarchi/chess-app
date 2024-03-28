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

const pieces = {
    K: {src: kingWhite, description: "White King"},   
    k: {src: kingBlack, description: "Black King"},
    Q: {src: queenWhite, description: "White Queen"},  
    q: {src: queenBlack, description: "Black Queen"},
    R: {src: rookWhite, description: "White Rook"},    
    r: {src: rookBlack, description: "Black Rook"},
    B: {src: bishopWhite, description: "White Bishop"},
    b: {src: bishopBlack, description: "Black Bishop"},
    N: {src: knightWhite, description: "White Knight"},
    n: {src: knightBlack, description: "Black Knight"},
    P: {src: pawnWhite, description: "White Pawn"},    
    p: {src: pawnBlack, description: "Black Pawn"},
};


export default function DisplayPiece({ piece }) {

    return (
        <img 
            className = "absolute top-0 left-0 w-full h-full object-contain z-10" 
            src={pieces[piece].src} 
            alt={pieces[piece].description} 
        />
    )
}