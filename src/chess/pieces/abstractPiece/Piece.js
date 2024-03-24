import Position from '../../utils/Position'

export default class Piece {

    constructor(type, colour, position, points, mechanics){
        this.type = type
        this.colour = colour
        this.position = new Position(position[0], Number(position[1]))
        this.points = points
        this.mechanics = mechanics
        this.startingPosition = this.position
    }

    findReachablePositions(piecesArray) {

        /* Return the positions a piece can move to in a move */

        // Initialize the correct vectors based on the piece and chess board
        //this.initializeVectorMechanics(piece, board)

        // Initialize an array where the positions will be stored when found.
        const allPositions = []

        // Filter for only active vectors
        const activeVectors = this.mechanics.filter(
            (mechanics) => mechanics[0].activated
        )

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < activeVectors.length; i++){

            // get the vector
            const vector = this.mechanics[i][0]
            
            // get the associated function used to find positions along said vector
            const findPositionsVector = this.mechanics[i][1]

            // find the positions along vector for the current piece on the board
            const positionsVector = findPositionsVector(vector, this, piecesArray)

            // Store the positions
            allPositions.push(...positionsVector)

        }
        return allPositions
    }

    updatePosition(newPosition){
        this.position = newPosition
    }
}

