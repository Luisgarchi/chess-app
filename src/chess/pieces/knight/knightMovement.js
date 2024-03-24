import { MoveVector } from "../../utils/MoveVector"
import { genericChessPieceMovement } from "../abstractPiece/regularMove"



export default function factoryKnightMechanics() {

    // Factory function that returns the movement mechanics for a Knight

    // Knights can move only once along a unit vector in a single move
    const movementUnrestricted = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Knight diagonally north north east
    const northNorthEastVector = new MoveVector(2, 1, movementUnrestricted)
    const northNorthEastMechanics = [
        northNorthEastVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Knight diagonally north east east
    const northEastEastVector = new MoveVector(1, 2, movementUnrestricted)
    const northEastEastMechanics = [
        northEastEastVector, 
        genericChessPieceMovement
    ]


    // 3) Vector for moving Knight diagonally north north west
    const northNorthWestVector = new MoveVector(2, -1, movementUnrestricted)
    const northNorthWestMechanics = [
        northNorthWestVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Knight diagonally north west west
    const northWestWestVector = new MoveVector(1, -2, movementUnrestricted)
    const northWestWestMechanics = [
        northWestWestVector, 
        genericChessPieceMovement
    ]


    // 5) Vector for moving Knight diagonally south south east
    const southSouthEastVector = new MoveVector(-2, 1, movementUnrestricted)
    const southSouthEastMechanics = [
        southSouthEastVector,
        genericChessPieceMovement
    ]

    // 6) Vector for moving Knight diagonally south east east
    const southEastEastVector = new MoveVector(-1, 2, movementUnrestricted)
    const southEastEastMechanics = [
        southEastEastVector, 
        genericChessPieceMovement
    ]


    // 7) Vector for moving Knight diagonally south south west
    const southSouthWestVector = new MoveVector(-2, -1, movementUnrestricted)
    const southSouthWestMechanics = [
        southSouthWestVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving Knight diagonally south west west
    const southWestWestVector = new MoveVector(-1, -2, movementUnrestricted)
    const southWestWestMechanics = [
        southWestWestVector, 
        genericChessPieceMovement
    ]



    // Combine into an array
    const knightMechanics = [
        northNorthEastMechanics, 
        northEastEastMechanics, 
        northNorthWestMechanics,
        northWestWestMechanics,
        southSouthEastMechanics,
        southEastEastMechanics,
        southSouthWestMechanics,
        southWestWestMechanics
    ]

    return knightMechanics
}
