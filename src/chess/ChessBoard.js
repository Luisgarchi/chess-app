import { SQUARE_BOARD_SIZE } from "./chess_setup"
import { PIECES } from "./pieces"

export default class ChessBoard {

    constructor(fen){

        const fenComponents = fen.split(' ')

        this.piecePlacement = fenComponents[0]
        this.activeColour = fenComponents[1]
        this.castlingAvailability = fenComponents[2]
        this.enpassantTarget = fenComponents[3]
        this.halfmoveClock = fenComponents[4]
        this.fullmoveNumber = fenComponents[5]
        
        this.board = this.parseBoard()
    }

    /* Static Methods */

    // NOT Redundant
    static rankToRowIndex(rank) {

        /* subtract 1 from row because board is represented as an array (starts at zero index)
        subtract from nRows since we want lower rows displayed at the bottom of the console instead of at top*/ 
        return SQUARE_BOARD_SIZE - rank
    }

    // redundant?
    static rowIndexToRank(rowIndex){
        return SQUARE_BOARD_SIZE - rowIndex
    }
    
    // NOT Redundant
    static fileToColIndex(file){
    
        // zero index columns
        return file.charCodeAt(0) - 'a'.charCodeAt(0)
    }

    // redundant?
    static colIndexToFile(columnIndex){
        return String.fromCharCode(columnIndex + 'a'.charCodeAt(0))
    }

    // redundant?
    static incrementRank(rank, increment){
        return rank + increment
    }

    // redundant?
    static incrementFile(file, increment){
        return String.fromCharCode(file.charCodeAt(0) + increment)
    }
    
    static parseAlgebraicNotation(algebraicNotation) {
        const file = algebraicNotation[0]
        const rank = parseInt(algebraicNotation[1])

        const rowIndex = ChessBoard.rankToRowIndex(rank)
        const colIndex = ChessBoard.fileToColIndex(file)

        return {rowIndex, colIndex}
    }

    parseBoard() {

        // Function that accepts a FEN string and returns a 2D array representing the board
        const board = []

        // Loop over ranks the ranks 
        const rowsArray = this.piecePlacement.split('/')

        for (let i = 0; i < rowsArray.length; i++){
            const row = rowsArray[i]
            const rowArray = []

            // Loop over the files in the rank
            for (let j = 0; j < row.length; j++){
                const char = row[j]
                if (Number.isInteger(parseInt(char))){
                    for (let k = 0; k < parseInt(char); k++){
                        rowArray.push(null)
                    }
                }
                else {
                    // Add to board
                    rowArray.push(char)
                }
            }
            board.push(rowArray)
        }
        this.board = board
    }


    getPieceAt(position) {
        return this.board[position.rowIndex][position.colIndex]
    }

    // Redundant?
    getRowAndColIndices(position) {
        const rowIndex = ChessBoard.rankToRowIndex(position.rank)
        const colIndex = ChessBoard.fileToColIndex(position.file)
        return {rowIndex, colIndex}
    }

    getPieceMoves(position) {

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        if (piece === null){ 
            throw new Error("No piece found at position")   
        }

        // Get the movement vectors for the piece
        const pieceMoveVectors = PIECES[piece].movement
    
        // Initialize an array where the positions will be stored when found.
        const allPositions = []
        
        // Loop over all movement vectors of the piece to find all possible moves
        for (let i = 0; i < pieceMoveVectors.length; i++){

            // get the vector and associated function used to calculate positions along said vector
            const vector = pieceMoveVectors[i][0]
            const findPositionsVector = pieceMoveVectors[i][1]

            // find and store the positions along vector for the current piece on the board
            const positionsVector = findPositionsVector(position, vector, this.board)
            allPositions.push(...positionsVector)
        }
        return allPositions
    }

    getAllMoves(position) {

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        // Checks to if piece exists and is of correct colour
        const correctColourPieces = (this.activeColour) === "w" ? 'KQRBNP' : 'kqrbnp'

        if (piece === null){ 
            throw new Error("No piece found at position")   
        }
        else if (!correctColourPieces.includes(piece)){
            throw new Error("Incorrect piece colour")
        }

        // Get the normal moves for each piece
        const positions = this.getPieceMoves(position)

        // Add special moves
        
        // Enpassant
        positions.push(...this.getEnpassantPositions(position))

        // Castles
        positions.push(...this.getCastlesPositions(position))

        return positions
    }

    getCastles(position){

        const positions = []

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        // Return empty array if piece is not king or king is in check
        if (this.isInCheck() || !'Kk'.includes(piece)){
            return positions
        }

        const castlesKingTargetSquare = new Map([
            ['K', {rowIndex: 7, colIndex: 6}],
            ['Q', {rowIndex: 7, colIndex: 2}],
            ['k', {rowIndex: 0, colIndex: 6}],
            ['q', {rowIndex: 0, colIndex: 2}]
        ])

        // Get the relevant castling symbols for the current player
        const castleSymbols = (this.activeColour === 'w') ? "KQ" : "kq"

        // Get the available castling directions
        const castleDirections = this.castlingAvailability.split('')
                                    .filter((char) => castleSymbols.includes(char))
                                    .map((symbol) => castlesKingTargetSquare.get(symbol))
        
        // Check that the castling directions are valid
        for (const direction of castleDirections){

            const travelSquares = this.getKingCastlesTravelSquares(position, direction)

            if (
                this.ensureNoPiecesOnPosition(travelSquares) &&
                this.ensurePositionsNotControlledByOpponent(travelSquares)
                ){
                positions.push(direction)
            }
        }
        return positions
    }

    getKingCastlesTravelSquares(initialPosition, endPosition){

        // Get the row and column indices of the initial and end positions
        const rowIndex = initialPosition.rowIndex
        const startColIndex = initialPosition.colIndex
        const endColIndex = endPosition.colIndex

        // Get the smaller and larger column indices
        const small = (startColIndex > endColIndex) ? endColIndex : startColIndex
        const big = (startColIndex > endColIndex) ? startColIndex : endColIndex

        const positions = []
        for (let i = small; i <= big; i++){
            positions.push({rowIndex, colIndex: i + 1})
        }
        return positions
    }

    ensureNoPiecesOnPosition(positions){
            
        // Loop over the positions and check if any pieces are in the way
        for (let i = 0; i < positions.length; i++){
            const position = positions[i]
            if (this.board[position.rowIndex][position.colIndex] !== null){
                return false
            }
        }
        return true
    }

    ensurePositionsNotControlledByOpponent(positions){
            
        // Get opponent piece symbols
        const opponentPieces = (this.activeColour === 'w') ? 'kqrbnp' : 'KQRBNP'

        // Loop over the board
        for(let i = 0; i < this.board.length; i++){

            for (let j = 0; j < this.board[i].length; j++){

                // Get the piece at the current position
                const piece = this.board[i][j]

                // Check if said piece is an opponent piece
                if (opponentPieces.includes(piece)){

                    // Get the squares controlled by the opponent piece
                    const opponentPosition = {rowIndex: i, colIndex: j}
                    const controllingSquares = this.getPieceMoves(opponentPosition)

                    // Check if any of the squares controlled by the opponent piece are in the positions array
                    if (this.overlapPositions(controllingSquares, positions)){
                        return false
                    }
                }
            }
        }
        return true
    }

    getEnpassantPositions(position){

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        // Check if piece is a pawn and can enpassant
        if (this.enpassantTarget !== '-' && 'Pp'.includes(piece)) {
    
            // Assuming this.enpassantTarget is in algebraic notation (e.g., "e3")
            const targetPosition = ChessBoard.parseAlgebraicNotation(this.enpassantTarget)

            // Adjust the target position based on pawn color
            const newPieceRow   = position.rowIndex + ((piece === 'P') ? -1 : 1)
            const leftPieceCol  = position.colIndex - 1
            const rightPieceCol = position.colIndex + 1
            
            if (
                    (newPieceRow === targetPosition.rowIndex) && 
                    (leftPieceCol === targetPosition.colIndex || rightPieceCol === targetPosition.colIndex)
                ) {
                // If the pawn is next to the en passant target, add the en passant move
                return [targetPosition];
            }
        }
        return []
    }

    isInCheck(){

        // Get the king position
        const kingPosition = this.getKingPosition()

        // Get the opponent pieces
        const opponentPieces = (this.activeColour === 'w') ? 'kqrbnp' : 'KQRBNP'

        // Loop over the board
        for(let i = 0; i < this.board.length; i++){

            for (let j = 0; j < this.board[i].length; j++){

                // Get the piece at the current position
                const piece = this.board[i][j]

                // Check if said piece is an opponent piece
                if (opponentPieces.includes(piece)){

                    // Get the squares controlled by the opponent piece
                    const opponentPosition = {rowIndex: i, colIndex: j}
                    const controllingSquares = this.getPieceMoves(opponentPosition)

                    // Check if the king is in any of the squares controlled by the opponent
                    if (this.includesPosition(controllingSquares, kingPosition)){
                        return true
                    }
                }
            }
        }
        return false
    }

    getKingPosition(){

        // Get the king symbol
        const kingSymbol = (this.activeColour === 'w') ? 'K' : 'k'

        // Loop over the board
        for(let i = 0; i < this.board.length; i++){

            for (let j = 0; j < this.board[i].length; j++){

                // Get the piece at the current position
                const piece = this.board[i][j]

                // Check if said piece is the king
                if (piece === kingSymbol){
                    return {rowIndex: i, colIndex: j}
                }
            }
        }
        throw new Error(`${(this.activeColour === 'w') ? 'White' : 'Black'} king found on the board`)
    }

    isCheckMae(){
        

    }

    makeMove(){}

    parseFen(){}

    
    
    includesPosition(positions, position) {
        
        // Loop over the positions and check if the position is included
        for (let i = 0; i < positions.length; i++){

            const checkPosition = positions[i]
            if (
                position.rowIndex === checkPosition.rowIndex &&
                position.colIndex === checkPosition.colIndex
            ){
                return true
            }
        }
        return false
    }

    overlapPositions(positions_A, positions_B){

        // Loop over the positions and check if any position overlaps both arrays
        for (let i = 0; i < positions_A.length; i++){

            const checkPosition = positions_A[i]

            if (this.includesPosition(positions_B, checkPosition)){
                return true
            }
        }
        return false
    }

}