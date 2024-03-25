import Position from "../../utils/Position";
import { BOARD_DIMENSIONS } from "../../chess_setup";

export const genericChessPieceMovement = function(vector, piece, piecesArray){

    const allPositions = allVectorPositionsOnBoard(vector, piece)
    const restrictedPositions = filterPositionsRestricted(allPositions, vector)
    const removeBlockedPositions = filterBlockingPieces(restrictedPositions, piece, piecesArray)
    
    return removeBlockedPositions
}


export const allVectorPositionsOnBoard = function(vector, piece){

    // Function that accepts a move vector and returns an array of Positions that are
    // located along the vector. The starting position this not included in the array. 
    
    const positions = []

    // Get the board dimensions in numbers
    const minFile = Position.fileToNum(BOARD_DIMENSIONS.fileStart)
    const maxFile = Position.fileToNum(BOARD_DIMENSIONS.fileEnd)
    const minRank = BOARD_DIMENSIONS.rankStart
    const maxRank = BOARD_DIMENSIONS.rankEnd

    // Function checks if a file and rank are on a board
    const isOnBoard = function (file, rank) {
        return (
            (file >= minFile) && 
            (file <= maxFile) && 
            (rank >= minRank) && 
            (rank <= maxRank)
        )
    }

    // Calculate the next file and rank after moving once along a vector
    let nextFile = Position.fileToNum(piece.position.file) + vector.fileComponent
    let nextRank = piece.position.rank + vector.rankComponent

    while (isOnBoard(nextFile, nextRank)){

        // Create a new position and append it to array
        const newPosition = new Position(Position.numToFile(nextFile), nextRank)
        positions.push(newPosition)

        // Create the next vector
        nextFile += vector.fileComponent
        nextRank += vector.rankComponent
    }
    return positions
}


export const filterPositionsRestricted = function (positions, vector){
    
    // Function that filters an array of position based on the
    // vector restricted property

    if (vector.restricted == 0){
        // Value 0 means unrestricted 
        return positions
    }
    else {
        return positions.slice(0, vector.restricted)
    }
}


export const filterBlockingPieces = function(positions, piece, piecesArray){

    /* Function returns a filtered array of positions a piece can legally move to. 
    
    Logic: A piece can move to a new position if it is not blocked by a piece
    of the same colour, if there is a piece of a different colour, it can move to 
    said square by capturing the piece but not any further along the vector */

    for (let i = 0; i < piecesArray.length; i++){

        // Get the current piece position and colour
        const blockingPiece = piecesArray[i]
        const blockingPosition = blockingPiece.position
        const blockingColour = blockingPiece.colour


        // Only positions that lie on the vector
        if (Position.includes(positions, blockingPosition)){

            // Find the index of the blocking piece
            function matchingIndex(piecesPosition){
                return Position.compare(piecesPosition, blockingPosition)
            }

            const index = positions.findIndex(matchingIndex)
            
            // Handle logic for same and different coloured pieces
            if (piece.colour == blockingColour){
                
                // Same colour piece can only move to the index/position before blocking position
                if (index == 0){
                    return []
                }
                positions = positions.slice(0, index)
            }
            else{

                // Different colour piece can move to the position by capturing
                positions = positions.slice(0, index + 1)
            }
        }
    }

    return positions
}