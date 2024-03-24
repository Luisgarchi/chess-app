import { MoveVector } from "../../utils/MoveVector"
import { pawnVerticalMovement } from "./pawnVerticalMovement"
import { pawnCaptureMovement } from "./pawnCaptureMovement"


export default function factoryPawnMechanics(colour) {

    // Factory function to create the movement mechanics for a pawn

    // The direction is included since pawn movement vectors are not symetric.
    const direction = (colour == "white") ? 1 : -1
    // By adding this variable, it establishes the directions black/white pawns move in

    // Pawns generally only move along a unit vector 1 square
    const movementRestricted = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Pawn vertically along files
    const verticalVector = new MoveVector(direction, 0, movementRestricted)
    const vecticalMechanics = [
        verticalVector, 
        pawnVerticalMovement
    ]

    // 2) Vector for moving Pawn diagonally capture right *
    const diagonalVectorRight = new MoveVector(direction, 1, movementRestricted)
    const diagonalRightMechanics = [
        diagonalVectorRight, 
        pawnCaptureMovement
    ]

    // 3) Vector for moving Pawn diagonally capture left * 
    const diagonalVectorLeft = new MoveVector(direction, -1, movementRestricted)
    const diagonalLeftMechanics = [
        diagonalVectorLeft, 
        pawnCaptureMovement
    ]
    
    // Combine into an array
    const pawnMechanics = [
        vecticalMechanics, 
        diagonalRightMechanics, 
        diagonalLeftMechanics
    ]

    return pawnMechanics
}
