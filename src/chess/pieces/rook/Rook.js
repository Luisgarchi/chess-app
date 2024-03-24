import Piece from '../abstractPiece/Piece'
import Position from '../../utils/Position'
import factoryRookMechanics from './rookMovement'

export default class Rook extends Piece {

    /* Constructor */
    constructor(colour, position){

        // Name/type of piece
        const type = 'Rook'

        // Number of points piece is worth
        const points = 5

        // Define the movement Mechanics
        const mechanics = factoryRookMechanics()

        // Construct the object
        super(type, colour, position, points, mechanics)
        
    }

    makeCopy(){
        return new Rook(this.colour, new Position(this.position.serialiseUCI()))
    }
}
