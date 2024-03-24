import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryKnightMechanics from './knightMovement'

export default class Knight extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'Knight'

        // Number of points piece is worth
        const points = 3

        // Define the movement Mechanics
        const mechanics = factoryKnightMechanics()

        // Construct the object
        super(type, colour, position, points, mechanics)        
        
    }

    makeCopy(){
        return new Knight(this.colour, new Position(this.position.serialiseUCI()))
    }
}