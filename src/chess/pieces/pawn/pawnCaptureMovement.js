import Position from "../../utils/Position" 

import { 
    allVectorPositionsOnBoard, 
    filterPositionsRestricted 
} from "../abstractPiece/regularMove"



export const pawnCaptureMovement = function(vector, piece, piecesArray) {

    const allPositions = allVectorPositionsOnBoard(vector, piece, piecesArray)
    const restrictedPositions = filterPositionsRestricted(allPositions, vector)
    const removedPositions = pawnDiagonalCapture(restrictedPositions, piece, piecesArray)
    return removedPositions
}


export const pawnDiagonalCapture = function(positions, piece, piecesArray){

    /* Function returns a filtered array of positions a pawn can move vertically 
    A pawn can only move to a new position along the same file if NO piece, (no
    matter the colour) is blocking it */
    
    if (positions.length == 0) {
        return []
    }

    const positionToCapture = positions[0]

    const capturePieces = piecesArray.filter(
            (capturingPiece) => capturingPiece.colour != piece.colour
        )

    for (let i = 0; i < capturePieces.length; i++){

        // Get the current piece position and colour
        const currentPiece = capturePieces[i]
        const currentPosition = currentPiece.position

        // Only positions that lie on the vector
        if (Position.compare(currentPosition, positionToCapture)){
            return [currentPosition]
        }
    }
    return []
}

