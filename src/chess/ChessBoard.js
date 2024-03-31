import { PIECES } from "./pieces"



// Public methods
// 1) getPieceAt(position) - returns the piece at the positionç
// 2) getKingPosition() - returns the position of the king
// 3) getAllMoves(position) - returns all possible moves for a piece at the position
// 4) makeMove(startPosition, endPosition, promotionPiece) - makes a move on the board
// 5) isCheck() - returns true if the current king is in check
// 6) isCheckMate() - returns true if the current king is in checkmate


export default class ChessBoard {

    constructor(fen){

        this.fen = fen

        const fenComponents = fen.split(' ')

        this.piecePlacement = fenComponents[0]
        this.activeColour = fenComponents[1]
        this.castlingAvailability = fenComponents[2]
        this.enpassantTarget = fenComponents[3]
        this.halfmoveClock = fenComponents[4]
        this.fullmoveNumber = fenComponents[5]
        
        this.board = this.parseBoard()
    }



    /* Static Methods for position calculations */

    static rankToRowIndex(rank) {
        return 8 - rank
    }

    static rowIndexToRank(rowIndex){
        return 8 - rowIndex
    }

    static fileToColIndex(file){
        return file.charCodeAt(0) - 'a'.charCodeAt(0)
    }

    static colIndexToFile(columnIndex){
        return String.fromCharCode(columnIndex + 'a'.charCodeAt(0))
    }

    static incrementRank(rank, increment){
        return rank + increment
    }

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

    static toAlgebraicNotation(position) {
        const file = ChessBoard.colIndexToFile(position.colIndex)
        const rank = ChessBoard.rowIndexToRank(position.rowIndex)

        return file + rank
    }



    /* Board Representation */

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
        return board
    }



    /* Getters */

    getPieceAt(position) {

        // Get the piece at the position
        const piece = this.board[position.rowIndex][position.colIndex]
        
        // Check if the piece exists
        if (piece === null){ 
            throw new Error("No piece found at position")   
        }

        return piece
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



    /* Movement */

    getPieceMoves(position) {

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        // Get the movement vectors for the piece
        const pieceMoveVectors = PIECES[piece].movement
    
        // Initialize an array where the positions will be stored when found.
        const allPositions = []
        
        // Loop over all movement vectors of the piece to find all possible moves
        for (let i = 0; i < pieceMoveVectors.length; i++){

            // get the vector and associated function used to calculate positions along said vector
            const vector = pieceMoveVectors[i].vector
            const findPositionsVector = pieceMoveVectors[i].mechanics

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

        if (!correctColourPieces.includes(piece)){
            throw new Error("Incorrect piece colour")
        }

        // Get the normal moves for each piece
        const regular = this.getPieceMoves(position).filter(
            (endPosition) => this.isLegalMove(position, endPosition))

        // Add special moves
        const enpassant = this.getEnpassantPositions(position).filter(
            (endPosition) => this.isLegalMove(position, endPosition))

        const castles = this.getCastlesPositions(position).filter(
            (endPosition) => this.isLegalMove(position, endPosition))
        
        return {regular, enpassant, castles}
    }



    /* Castling */

    getCastlesPositions(position){

        const positions = []

        const castlesKingTargetSquare = new Map([
            ['K', {rowIndex: 7, colIndex: 6}],
            ['Q', {rowIndex: 7, colIndex: 2}],
            ['k', {rowIndex: 0, colIndex: 6}],
            ['q', {rowIndex: 0, colIndex: 2}]
        ])

        // Get the piece on the board
        const piece = this.getPieceAt(position)

        // Get the relevant castling symbols for the current player
        const castleSymbols = (this.activeColour === 'w') ? "KQ" : "kq"

        // Get the available castling directions
        const castleDirections = this.castlingAvailability.split('')
                                    .filter((char) => castleSymbols.includes(char))
                                    .map((symbol) => castlesKingTargetSquare.get(symbol))

    
        // Return empty array if piece is not king or king is in check
        if (this.isCheck() || !'Kk'.includes(piece) || castleDirections.length === 0){
            return positions
        }

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

        // Check if the castling is kingside or queenside
        const isKingSide = (startColIndex < endColIndex)
        const direction = (isKingSide) ? 1 : -1

        // Get the smaller and larger column indices
        const numberOfSquares = Math.abs(startColIndex - endColIndex)

        const positions = []
        for (let i = 1; i <= numberOfSquares; i++){

            const newColIndex = startColIndex + i * direction
            positions.push({rowIndex, colIndex: newColIndex})
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



    /* Enpassant */

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



    /* Check and Checkmate */

    isCheck(){

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

    isLegalMove(start, end){

        // Function checks if a move is legal
        //  1) King is not in check
        //  2) a piece (king or pinned piece) can not move into check

        // Create a copy of the board
        const boardCopy = new ChessBoard(this.fen)

        // Make the move
        boardCopy.board[end.rowIndex][end.colIndex] = boardCopy.board[start.rowIndex][start.colIndex]
        boardCopy.board[start.rowIndex][start.colIndex] = null

        // A move is legal if the king is not in check
        return !boardCopy.isCheck() 
    }

    isCheckMate(){
        
        // It is check mate when the king is in check and has no legal moves
        // and the checking piece can not be blocked or captured

        const kingLegalMoves = this.getPieceMoves(this.getKingPosition())

        return(
            this.isCheck() && 
            kingLegalMoves.length > 0 && 
            !this.isCheckBlockOrCapture()
        )
    }

    getCheckingPieces(){
            
        // Get the king position
        const kingPosition = this.getKingPosition()

        // Get the opponent pieces
        const opponentPieces = (this.activeColour === 'w') ? 'kqrbnp' : 'KQRBNP'

        const checkingPieces = []

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
                        checkingPieces.push(opponentPosition)
                    }
                }
            }
        }
        return checkingPieces
    }
    
    isCheckBlockOrCapture(){

        if (!this.isCheck()){
            throw new error('Can not block or capture a "checking piece" when the king is not in check')
        } 

        // Find the chceking pieces. If there are more than 2, it is checkmate
        const checkingPieces = this.getCheckingPieces()

        if(checkingPieces.length > 1){
            return false
        }

        // Get the checking piece position
        const checkingPiecePosition = checkingPieces[0]

        // Get positions checking piece moves
        const blockCaputrePositions = this.getBlockCapturePositions(checkingPiecePosition)

        // Check if any piece of the same colour as the king can block or capture the checking piece
        const blockingPieces = (this.activeColour === 'w') ? 'QRBNP' : 'qrbnp'        // Notice the absence of the king

        for(let i = 0; i < this.board.length; i++){

            for (let j = 0; j < this.board[i].length; j++){

                const piece = this.board[i][j]

                if (piece !== null && blockingPieces.includes(piece)){

                    const piecePosition = {rowIndex: i, colIndex: j}

                    const pieceMoves = this.getPieceMoves(piecePosition)
                    const overlappingPositions = this.getOverlappingPositions(pieceMoves, blockCaputrePositions)

                    // Check that blocking move does not put the king in check
                    overlappingPositions.filter((position) => this.isLegalMove(piecePosition, position))

                    // If we have at least one valid move, the check can be blocked or captured
                    if(overlappingPositions.length > 0){
                        return true
                    }
                }
            }
        }
        // No piece can block or capture the checking piece
        return false
    }

    getBlockCapturePositions(checkingPiecePosition){
            
        // Get the king position
        const kingPosition = this.getKingPosition()

        // Get the checking piece
        const checkingPiece = this.getPieceAt(checkingPiecePosition)

        // Get the movement vectors for the checking piece
        const checkingVectors = PIECES[checkingPiece].movement

        let positionsAlongVector = []

        for (let i = 0; i < checkingVectors.length; i++){

            const vector = checkingVectors[i].vector
            const findPositionsVector = checkingVectors[i].mechanics

            positionsAlongVector = findPositionsVector(checkingPiecePosition, vector, this.board)

            if (this.includesPosition(positionsAlongVector, kingPosition)){
                break
            }
        }

        if (!this.includesPosition(positionsAlongVector, kingPosition)){
            throw new Error('"Checking piece" does not attack the king')
        }

        // 3) Remove the position of the king (it is not a valid move)
        positionsAlongVector.filter((position) => !(    // Apply not operator 
            position.rowIndex === kingPosition.rowIndex && position.colIndex === kingPosition.colIndex      // find the king position
            )
        )

        // 4) Add the position of checking piece (a capture is a valid move)
        positionsAlongVector.push(checkingPiecePosition)

        return positionsAlongVector
    }



    /* Executing verified moves */

    makeMove(startPosition, endPosition, promotionPiece = null){

        // Get the possible moves for the piece
        const {regular, enpassant, castles} = this.getAllMoves(startPosition)

        // Check if the end position is a possible move
        if (this.includesPosition(regular, endPosition)){
            this.makeRegularMove(startPosition, endPosition, promotionPiece)
        }
        else if (this.includesPosition(enpassant, endPosition)){
            this.makeEnpassantMove(startPosition, endPosition)
        }
        else if (this.includesPosition(castles, endPosition)){
            this.makeCastlesMove(startPosition, endPosition)
        }
        else {
            throw new Error("Invalid move")
        }
    }

    makeRegularMove(startPosition, endPosition, promotionPiece){
            
        // Get piece
        const piece = this.getPieceAt(startPosition)
        const capturedPiece = this.board[endPosition.rowIndex][endPosition.colIndex]
        let target = piece

        // Check if the move is a promotion, if so replace the piece with promoting piece
        if (this.isPromotion(startPosition, endPosition, promotionPiece)){
            target = promotionPiece
        }
        
        // Make the move by updating the board representation
        this.board[endPosition.rowIndex][endPosition.colIndex] = target
        this.board[startPosition.rowIndex][startPosition.colIndex] = null

        // Update the FEN
        this.updateFen(piece, capturedPiece, startPosition, endPosition)
    }

    isPromotion(startPosition, endPosition, promotionPiece = null){

        // Get the piece at the start position
        const piece = this.getPieceAt(startPosition)
        // Get the promotion options
        const promotionOptions = (this.activeColour === 'w') ? 'QRBN' : 'qrbn'
        //  Get the end row
        const endRow = (this.activeColour === 'w') ? 0 : 7

        // Check if promotion is specified
        if (promotionPiece === null){
            return false
        }
        // Check if the end position is at the end row and the promotion piece is valid
        else if (   (!promotionOptions.includes(promotionPiece))    || 
                    (endPosition.rowIndex !== endRow)               || 
                    (!'Pp'.includes(piece))){

            throw new Error("Invalid promotion")
        }
        // Promotion is valid
        else {
            return true
        }
    }

    makeEnpassantMove(startPosition, endPosition){
            
        // Get the piece
        const piece = this.getPieceAt(startPosition)
        
        // Get the captured piece by 
        const capturePosition = {rowIndex: startPosition.rowIndex, colIndex: endPosition.colIndex}
        const capturedPiece = this.board[endPosition.rowIndex][endPosition.colIndex]
        
        // Make the move by updating the board representation
        this.board[endPosition.rowIndex][endPosition.colIndex] = piece
        this.board[startPosition.rowIndex][startPosition.colIndex] = null

        // Remove the captured piece
        this.board[capturePosition.rowIndex][capturePosition.colIndex] = null

        // Update the FEN
        this.updateFen(piece, capturedPiece, startPosition, endPosition)
    }

    makeCastlesMove(startPosition, endPosition){
        
        // Get the piece
        const piece = this.getPieceAt(startPosition)

        // Get the direction of the castling move
        const direction = (endPosition.colIndex === 2) ? 'Queenside' : 'Kingside'

        // Get the rook position
        const rookStartPosition = (direction === 'Queenside') ? {rowIndex: startPosition.rowIndex, colIndex: 0} : {rowIndex: startPosition.rowIndex, colIndex: 7}
        
        // Get the rook end position
        const rookEndPosition = (direction === 'Queenside') ? {rowIndex: startPosition.rowIndex, colIndex: 3} : {rowIndex: startPosition.rowIndex, colIndex: 5}

        // Make the move by updating the board representation
        this.board[endPosition.rowIndex][endPosition.colIndex] = piece
        this.board[startPosition.rowIndex][startPosition.colIndex] = null
        this.board[rookEndPosition.rowIndex][rookEndPosition.colIndex] = (piece === 'K') ? 'R' : 'r'
        this.board[rookStartPosition.rowIndex][rookStartPosition.colIndex] = null

        // Update the FEN
        this.updateFen(piece, null, startPosition, endPosition)
    }


    /* Updating the FEN */

    updateFen(initialPiece, capturedPiece, startPosition, endPosition){

        // Parse piece placement
        this.updatePiecePlacementFromBoard()

        // Update the castling availability
        this.updateCastlingAvailability(initialPiece, startPosition)

        // Update the enpassant target
        if ('Pp'.includes(initialPiece) && Math.abs(startPosition.rowIndex - endPosition.rowIndex) === 2){
            const file = ChessBoard.colIndexToFile(endPosition.colIndex) 
            const rank = ChessBoard.rowIndexToRank(endPosition.rowIndex)
            const rankBehind = ChessBoard.incrementRank(rank, (initialPiece === 'P') ? -1 : 1) 
            this.enpassantTarget = file + rankBehind
        }
        else {
            this.enpassantTarget = '-'
        }
        
        // Update full move number
        this.fullmoveNumber += (this.activeColour === 'b') ? 1 : 0
        
        // Reset the half move clock if the piece is a pawn or a capture is made or increment otherwise
        const resetHalfMoveClock = (capturedPiece !== null) && !'Pp'.includes(initialPiece)
        this.halfmoveClock = (resetHalfMoveClock) ? 0 : this.halfmoveClock + 1

        // Update the active colour
        this.activeColour = (this.activeColour === 'w') ? 'b' : 'w'

        // Update the overall fen board representation
        this.fen = this.parseFen()
    }

    updateCastlingAvailability(initialPiece, startPosition){

        // No need to update castling availability if it is not possible
        if (this.castlingAvailability === '-'){
            return
        }

        // Remove castling availability if the king or rook moves
        if (initialPiece === 'K'){
            this.castlingAvailability = this.castlingAvailability.replace(/(K|Q)/g, '')
        }
        else if (initialPiece === 'k'){
            this.castlingAvailability = this.castlingAvailability.replace(/(k|q)/g, '')
        }
        else if (initialPiece === 'R'){
            if (startPosition.rowIndex === 7 && startPosition.colIndex === 0){
                this.castlingAvailability = this.castlingAvailability.replace(/(Q)/g, '')
            }
            else if (startPosition.rowIndex === 7 && startPosition.colIndex === 7){
                this.castlingAvailability = this.castlingAvailability.replace(/(K)/g, '')
            }
        }
        else if (initialPiece === 'r'){
            if (startPosition.rowIndex === 0 && startPosition.colIndex === 0){
                this.castlingAvailability = this.castlingAvailability.replace(/(q)/g, '')
            }
            else if (startPosition.rowIndex === 0 && startPosition.colIndex === 7){
                this.castlingAvailability = this.castlingAvailability.replace(/(k)/g, '')
            }
        }

        // Provide default value if the castling availability is empty
        if (this.castlingAvailability === ''){
            this.castlingAvailability = '-'
        }
    }

    updatePiecePlacementFromBoard(){

        let piecePlacement = ''

        // Loop over the board rows
        for (let i = 0; i < this.board.length; i++){
            let emptySquares = 0

            // Loop over the board columns
            for (let j = 0; j < this.board[i].length; j++){

                const piece = this.board[i][j]

                // Check if the square is empty if so increment the empty squares counter
                if (piece === null){
                    emptySquares += 1
                }
                // Otherwise add the empty squares counter to the piece placement string and reset it
                // Add the current piece to the piece placement string
                else {
                    if (emptySquares > 0){
                        piecePlacement += emptySquares.toString()
                        emptySquares = 0
                    }
                    piecePlacement += piece
                }
            }

            // If the end of the row is reached add the empty squares to the piece placement string
            if (emptySquares > 0){
                piecePlacement += emptySquares.toString()
            }

            // Add a '/' to separate the rows (not needed for the last row)
            if (i < this.board.length - 1){
                piecePlacement += '/'
            }
        }
        this.piecePlacement = piecePlacement
    }

    parseFen(){
        return [
            this.piecePlacement, 
            this.activeColour, 
            this.castlingAvailability, 
            this.enpassantTarget, 
            this.halfmoveClock, 
            this.fullmoveNumber
        ].join(' ')
    }

    
    
    /* Helper functions dealing with position caculations */

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

    getOverlappingPositions(positions_A, positions_B){
            
        // Loop over the positions and check if any position overlaps both arrays
        const overlappingPositions = []

        for (let i = 0; i < positions_A.length; i++){

            const checkPosition = positions_A[i]

            if (this.includesPosition(positions_B, checkPosition)){
                overlappingPositions.push(checkPosition)
            }
        }
        return overlappingPositions
    }
}