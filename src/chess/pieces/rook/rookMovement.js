import { MoveVector } from "../../utils/MoveVector"
import { genericChessPieceMovement } from "../abstractPiece/regularMove"



export default function factoryRookMechanics() {

    // Factory function that returns the movement mechanics for a Rook

    // Rooks can move any amount of squares along a unit vector * 
    const movementUnrestricted = 0

    /* Define the Mechanics of each vector */

    // 1) Vector for moving Rook north
    const northVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Rook south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Rook east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Rook west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics = [
        westVector, 
        genericChessPieceMovement
    ]
    
    // Combine into an array
    const rookMechanics = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics
    ]

    return rookMechanics
}
