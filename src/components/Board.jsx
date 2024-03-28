import { useState } from "react"

import DisplaySquare from "./DisplaySquare"
import { SQUARE_BOARD_SIZE } from "../chess/chess_setup" 
import Position from "../chess/utils/Position"

function formatRow(row) {

    /* subtract 1 from row because board is represented as an array (starts at zero index)
    subtract from nRows since we want lower rows displayed at the bottom of the console instead of at top*/ 
    return (SQUARE_BOARD_SIZE - 1) - (row - 1)
}

function formatColumn(column){
    // zero index columns
    return column - 1
}


function deriveMaskSquareHighlights(selectedPiece, piecesArray){

    // Derive a mask that highlights squares of relevance for the selected piece
    
    const mask = Array.from({ length: 8 }, () => Array(8).fill("none"))

    // Create a hash of enemy piece positions
    const oppositeColourPositions = new Set(
        piecesArray
          .filter((piece) => piece.colour !== selectedPiece.colour)
          .map((piece) => piece.position.serialiseUCI())
    )

    const reachablePositions = selectedPiece.findReachablePositions(piecesArray)
    // filter positions that would result in check, they need to be removed as they are illegal
    

    for(const position of reachablePositions){

        // Check if the position is occupied by an enemy piece.
        const differentColour = oppositeColourPositions.has(position.serialiseUCI())
        // If so mark for capture otherwise otherwise mark as also "available" to move
        const maskValue = differentColour ? "enemy" : "available"

        const row = formatRow(position.rank)
        const column = formatColumn(Position.fileToNum(position.file))

        mask[row][column] = maskValue
    }

    // Add the selected piece to the mask
    const selectedPieceRow = formatRow(selectedPiece.position.rank)
    const selectedPieceColumn = formatColumn(Position.fileToNum(selectedPiece.position.file))
    mask[selectedPieceRow][selectedPieceColumn] = "selected"

    return mask
}

export default function Board({ pieces, history }) {


    const [selectedPiece, setSelectedPiece] = useState(null)

    // Derive the representation of the board as well as the mask
    const board = deriveBoard(pieces)
    const mask = (selectedPiece === null) ? null : deriveMaskSquareHighlights(selectedPiece, pieces)

    return(
        <ol className="flex flex-col justify-center items-center">
            {board.map((row, rowIndex) => (
                <li className = "flex" key={rowIndex}>
                    <ol className="flex justify-center">
                        {row.map((piece, pieceIndex) => {

                            const maskValue = (mask === null) ? "none" : mask[rowIndex][pieceIndex]
                            const squareColour = ((rowIndex + pieceIndex) % 2 === 0) ? "bg-[#F0D9B5]" : "bg-[#b58863]"
                            const squareStyles = `w-16 h-16 flex justify-center items-center ${squareColour}`
                            return (
                                <li key={pieceIndex} className = {squareStyles}>
                                    <DisplaySquare 
                                        piece = {piece}
                                        maskValue = {maskValue}
                                        selectedPiece={selectedPiece}
                                        playerTurn = {turn}
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