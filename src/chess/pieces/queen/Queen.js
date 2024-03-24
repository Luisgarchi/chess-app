import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryQueenMechanics from './queenMovement'

export default class Queen extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'Queen'

        // Number of points piece is worth
        const points = 9

        // Define the movement Mechanics
        const mechanics = factoryQueenMechanics()

        // Construct the object
        super(type, colour, position, points, mechanics)        
        
    }

    makeCopy(){
        return new Queen(this.colour, new Position(this.position.serialiseUCI()))
    }
}