import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryKingMechanics from './kingMovement'

export default class King extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'King'

        // Number of points piece is worth
        const points = 0

        // Define the movement Mechanics
        const mechanics = factoryKingMechanics()

        // Construct the object
        super(type, colour, position, points, mechanics)        
        
    }

    makeCopy(){
        return new King(this.colour, new Position(this.position.serialiseUCI()))
    }
}