import { 
    allVectorPositionsOnBoard, 
    filterPositionsRestricted 
} from "../abstractPiece/regularMove"


export const pawnVerticalMovement =  function(vector, piece, piecesArray){

    configPawnMoveIfOnStartRank(vector, piece)
    const allPositions = allVectorPositionsOnBoard(vector, piece, piecesArray)
    const restrictedPositions = filterPositionsRestricted(allPositions, vector)
    const removedPositions = pawnBlockedVeritcal(restrictedPositions, piecesArray)
    return removedPositions
}



export function configPawnMoveIfOnStartRank(vector, piece) {
    /* Set the Pawns vector's vertical restriction to  1 or 2 depending on if the 
    Pawn is in it's starting rank*/
    
    // A Pawn can only move 2 squares along a file if it is in it's starting rank
    const startingRank = piece.position.rank
    if (
        // Starting rank for white Pawn is 2nd rank
        ((piece.colour == "white") && (startingRank == 2)) ||    // OR

        // Starting rank for black Pawn is 7th rank
        ((piece.colour == "black") && (startingRank == 7))){

        vector.updateRestricted = 2
    }
    else{
        vector.updateRestricted = 1
    }
}   


export const pawnBlockedVeritcal = function(positions, piecesArray){

    /* Function returns a filtered array of positions a pawn can move vertically 
    A pawn can only move to a new position along the same file if NO piece, (no
    matter the colour) is blocking it */
        
    let positionsSerialised = positions.map((position) => position.serialiseUCI())

    for (let i = 0; i < piecesArray.length; i++){

        // Get the current piece position and colour
        const blockingPiece = piecesArray[i]
        const blockingPosition = blockingPiece.position
        const blockingPositionSerialised = blockingPosition.serialiseUCI()

        // Only positions that lie on the vector
        if (positionsSerialised.includes(blockingPositionSerialised)){

            // Find the index of the blocking piece
            function matchingIndex(piecesPosition){
                return piecesPosition == blockingPositionSerialised
            }

            const index = positionsSerialised.findIndex(matchingIndex)

            // Same colour piece can only move to the index/position before blocking position
            if (index == 0){
                return []
            }
            positionsSerialised = positionsSerialised.slice(0, index)
            positions = positions.slice(0, index)
        }
    }
    return positions
}