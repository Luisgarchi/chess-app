import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryBishopMechanics from './bishopMovement'

export default class Bishop extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'Bishop'

        // Number of points piece is worth
        const points = 3

        // Define the movement Mechanics
        const mechanics = factoryBishopMechanics()

        // Construct the object
        super(type, colour, position, points, mechanics)        
        
    }

    makeCopy(){
        return new Bishop(this.colour, new Position(this.position.serialiseUCI()))
    }
}