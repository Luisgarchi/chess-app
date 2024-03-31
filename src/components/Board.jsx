import { useState, useContext } from "react"
import { GameContext } from "../GameContext"

import Square from "./Square"
import ChessBoard from "../chess/ChessBoard"

function deriveMaskSquareHighlights(chessBoard, selectedPiecePosition){

    // Derive a mask that highlights squares of relevance for the selected piece
    const mask = Array.from({ length: 8 }, () => Array(8).fill("none"))

    // Check if the king is in check add check to mask
    if (chessBoard.isCheck()){
        const kingPosition = chessBoard.getKingPosition()
        mask[kingPosition.rowIndex][kingPosition.colIndex] = "check"
    }

    // If no piece is selected, return the mask as is
    if (selectedPiecePosition === null) return mask

    // Set the selected piece mask
    const {rowIndex, colIndex} = selectedPiecePosition
    mask[rowIndex][colIndex] = "selected"

    // Get all the squares the selected piece can move to
    const {regular, enpassant, castles} = chessBoard.getAllMoves(selectedPiecePosition)
    const pieceMoves = [...regular, ...enpassant, ...castles]

    // Derive mask by looping through all squares on board
    for(const position of pieceMoves){

        const {rowIndex, colIndex} = position

        // If their is no piece on square it is vacant
        if (chessBoard.board[rowIndex][colIndex] === null){
            mask[rowIndex][colIndex] = "vacant"
        }
        // Otherwise an enemy piece is on the square
        else {
            mask[rowIndex][colIndex] = "occupied"
        }
    }
    return mask
}

export default function Board() {

    const [selectedPiece, setSelectedPiece] = useState({rowIndex: 7, colIndex: 1})
    const {fen, active} = useContext(GameContext)

    const chessBoard = new ChessBoard(fen)

    // Derive the representation of the board as well as the mask
    const board = chessBoard.board
    const mask = deriveMaskSquareHighlights(chessBoard, selectedPiece)

    
    return(
        <ol className="flex flex-col justify-center items-center">
            {board.map((row, rowIndex) => (
                <li className = "flex" key={rowIndex}>
                    <ol className="flex justify-center">
                        {row.map((piece, colIndex) => {

                            const maskValue = mask[rowIndex][colIndex]
                            const position = {rowIndex, colIndex}
                            const squareColour = ((rowIndex + colIndex) % 2 === 0) ? "bg-[#F0D9B5]" : "bg-[#b58863]"
                            const squareStyles = `w-16 h-16 flex justify-center items-center ${squareColour}`
                            
                            return (
                                <li key={colIndex} className = {squareStyles}>
                                    <Square 
                                        piece = {piece}
                                        maskValue = {maskValue}
                                        selectedPiece={selectedPiece}
                                        position = {position}
                                        turn = {chessBoard.activeColour}
                                    />
                                </li>
                            )
                        })}
                    </ol>
                </li>
            ))}
        </ol>
    )
}