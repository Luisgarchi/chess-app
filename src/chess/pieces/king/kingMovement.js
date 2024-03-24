import { MoveVector } from "../../utils/MoveVector"
import { genericChessPieceMovement } from "../abstractPiece/regularMove"



export default function factoryKingMechanics() {

    // Factory function that returns the movement mechanics for a King

    // Kings can only move 1 square at a time
    const movementRestricted = 1


    /* Define the Mechanics of each vector */


    // Vertical and horizontal movement

    // 1) Vector for moving King north
    const northVector = new MoveVector(1, 0, movementRestricted)
    const northMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving King south
    const southVector= new MoveVector(-1, 0, movementRestricted)
    const southMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving King east
    const eastVector = new MoveVector(0, 1, movementRestricted)
    const eastMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving King west
    const westVector = new MoveVector(0, -1, movementRestricted)
    const westMechanics = [
        westVector, 
        genericChessPieceMovement
    ]


    // Diagonal movement

    // 5) Vector for moving King diagonally north east
    const northEastVector = new MoveVector(1, 1, movementRestricted)
    const northEastMechanics= [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 6) Vector for moving King diagonally north west
    const northWestVector= new MoveVector(1, -1, movementRestricted)
    const northWestMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 7) Vector for moving King diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementRestricted)
    const southEastMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving King diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementRestricted)
    const southWestMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]


    // Combine into an array
    const kingMechanics = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics,
        northEastMechanics,
        northWestMechanics,
        southEastMechanics,
        southWestMechanics
    ]

    return kingMechanics
}