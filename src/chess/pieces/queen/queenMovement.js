import { MoveVector } from "../../utils/MoveVector"
import { genericChessPieceMovement } from "../abstractPiece/regularMove"



export default function factoryQueenMechanics() {

    // Factory function that returns the movement mechanics for a Queen

    // Queens can move any amount of squares along a unit vector
    const movementUnrestricted = 0


    /* Define the Mechanics of each vector */


    // Vertical and horizontal movement

    // 1) Vector for moving Queen north
    const northVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Queen south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Queen east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Queen west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics = [
        westVector, 
        genericChessPieceMovement
    ]


    // Diagonal movement

    // 5) Vector for moving Queen diagonally north east
    const northEastVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics = [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 6) Vector for moving Queen diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 7) Vector for moving Queen diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving Queen diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]
    
    

    // Combine into an array
    const queenMechanics = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics,
        northEastMechanics,
        northWestMechanics,
        southEastMechanics,
        southWestMechanics
    ]

    return queenMechanics
}
