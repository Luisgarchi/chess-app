import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryPawnMechanics from './pawnMovement'

export default class Pawn extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'Pawn'

        // Number of points piece is worth
        const points = 1

        // Define the movement Mechanics
        const mechanics = factoryPawnMechanics(colour)

        // Construct the object
        super(type, colour, position, points, mechanics)        
        
    }

    makeCopy(){
        return new Pawn(this.colour, new Position(this.position.serialiseUCI()))
    }
}