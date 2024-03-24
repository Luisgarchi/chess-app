import { MoveVector } from "../../utils/MoveVector"
import { genericChessPieceMovement } from "../abstractPiece/regularMove"



export default function factoryBishopMechanics() {

    // Factory function that returns the movement mechanics for a Bishop

    // Bishops can move any amount of squares along a unit vector
    const movementUnrestricted = 0


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Bishop diagonally north east
    const northEastVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics = [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Bishop diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Bishop diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Bishop diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]
    
    // Combine into an array
    const bishopMechanics = [
        northEastMechanics, 
        northWestMechanics, 
        southEastMechanics,
        southWestMechanics
    ]

    return bishopMechanics
}