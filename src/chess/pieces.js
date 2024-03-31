

// Define how the king moves
const kingMoves = [
    {vector: {rankComponent:  1, fileComponent:  0, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  0, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent:  1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent: -1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent:  1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent: -1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent: -1, restricted: true}, mechanics : basicMove}
];

// Define how the queen moves
const queenMoves = [
    {vector: {rankComponent:  1, fileComponent:  0, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  0, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent: -1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent: -1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent: -1, restricted: false}, mechanics : basicMove}
];

// Define how the rook moves
const rookMoves = [
    {vector: {rankComponent:  1, fileComponent:  0, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  0, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  0, fileComponent: -1, restricted: false}, mechanics : basicMove}
];

// Define how the bishop moves
const bishopMoves = [
    {vector: {rankComponent:  1, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent: -1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  1, restricted: false}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent: -1, restricted: false}, mechanics : basicMove}
];

// Define how the knight moves
const knightMoves = [
    {vector: {rankComponent:  2, fileComponent:  1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent:  2, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  2, fileComponent: -1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent:  1, fileComponent: -2, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -2, fileComponent:  1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent:  2, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -2, fileComponent: -1, restricted: true}, mechanics : basicMove},
    {vector: {rankComponent: -1, fileComponent: -2, restricted: true}, mechanics : basicMove}
];

// Define how the white pawn moves
const whitePawnRankDirection = 1
const whitePawnMoves = [
    {vector: {rankComponent: whitePawnRankDirection, fileComponent: 0, restricted: false}, mechanics: pawnVerticalMove},
    {vector: {rankComponent: whitePawnRankDirection, fileComponent: 1, restricted: true}, mechanics: pawnCapture},
    {vector: {rankComponent: whitePawnRankDirection, fileComponent: -1, restricted: true}, mechanics: pawnCapture},
];

// Define how the black pawn moves
const blackPawnRankDirection = -1
const blackPawnMoves = [
    {vector: {rankComponent: blackPawnRankDirection, fileComponent: 0, restricted: false}, mechanics: pawnVerticalMove},
    {vector: {rankComponent: blackPawnRankDirection, fileComponent: 1, restricted: true}, mechanics: pawnCapture},
    {vector: {rankComponent: blackPawnRankDirection, fileComponent: -1, restricted: true}, mechanics: pawnCapture},
];


export const PIECES = {

    // white pieces in uppercase
    K: {points: 0, movement: kingMoves},
    Q: {points: 9, movement: queenMoves},
    R: {points: 5, movement: rookMoves},
    B: {points: 3, movement: bishopMoves},
    N: {points: 3, movement: knightMoves},
    P: {points: 1, movement: whitePawnMoves},

    // black pieces in lowercase
    k: {points: 0, movement: kingMoves},
    q: {points: 9, movement: queenMoves},
    r: {points: 5, movement: rookMoves},
    b: {points: 3, movement: bishopMoves},
    n: {points: 3, movement: knightMoves},
    p: {points: 1, movement: blackPawnMoves},
}


function createIsOnBoardChecker(board) {

    // helper function to check if a row and column index are on the board

    const minRowIndex = 0
    const maxRowIndex = board.length - 1
    const minColIndex = 0
    const maxColIndex = board[0].length - 1
  
    return function(row, col) {
        return (
            row >= minRowIndex && row <= maxRowIndex &&
            col >= minColIndex && col <= maxColIndex
        )
    }
}

function basicMove(position, vector, board){

    // Move logic that is common to all pieces except pawns

    // Get function to check if a file and rank are on a board
    const isOnBoard = createIsOnBoardChecker(board)

    const rowColPositions = []
    let {rowIndex, colIndex} = position
    const piece = board[rowIndex][colIndex]

    // Do while loop (by using a do while loop the first iteration is guaranteed to run
    // which serves the purpose of ensuring restricted move vectors are checked only once)

    // Calculate and check next position after moving once along a vector
    rowIndex += vector.rankComponent
    colIndex += vector.fileComponent

    while ( !vector.restricted && 
            isOnBoard(rowIndex, colIndex) && 
            board[rowIndex][colIndex] === null){

        // if the square is empty and on board, add it to the array
        rowColPositions.push({rowIndex, colIndex})
        
        // repeat the process for the next square
        rowIndex += vector.rankComponent
        colIndex += vector.fileComponent
    }

    // Do a last check for restricted vectors as well as if the square is occupied by a piece

    // Get the pieces of the same colour as the piece
    const colour = (piece === piece.toUpperCase()) ? "KQRBKP" : "kqrbkp"

    // We first need to check the square is on the board.
    // The check if either the square is vacant (null) or if it is occupied by a piece of the opposite colour (hence not operator)
    if (isOnBoard(rowIndex, colIndex) &&
        (board[rowIndex][colIndex] === null || !colour.includes(board[rowIndex][colIndex]))){

        rowColPositions.push({rowIndex, colIndex})
    }

    return rowColPositions
}

function pawnVerticalMove(position, vector, board){
    
    // Pawns will never be on the first or last ranks, 
    // therefore there is no need to check if vertical movment will be on board

    const rowColPositions = []
    let {rowIndex, colIndex} = position
    const piece = board[rowIndex][colIndex]

    // Calculate and check next position after moving once along a vector
    const isOnStartRank = (piece === piece.toUpperCase()) ? (board.length - 2 === rowIndex) : (rowIndex === 2)

    // If the pawn is on the starting rank, it can move 2 squares
    const iterationLimit = (isOnStartRank) ? 2 : 1

    for (let i = 0; i < iterationLimit; i++){

        rowIndex += vector.rankComponent
        colIndex += vector.fileComponent
        
        // if the square is empty and on board, add it to the array
        if (board[rowIndex][colIndex] === null){
            rowColPositions.push({rowIndex, colIndex})
        }
        else{
            // Note pawns can not capture pieces vertically. If we find a piece exit the loop
            break
        }
    }
    return rowColPositions
}

function pawnCapture(position, vector, board){

    // Get function to check if a file and rank are on a board
    const isOnBoard = createIsOnBoardChecker(board)

    const rowColPositions = []
    let {rowIndex, colIndex} = position
    const piece = board[rowIndex][colIndex]

    // Calculate and check next position after moving once along a vector
    rowIndex += vector.rankComponent
    colIndex += vector.fileComponent

    const oppositeColour = (piece === piece.toUpperCase()) ? "kqrbkp" : "KQRBKP"

    // Check if the square is on the board
    if (isOnBoard(rowIndex, colIndex) && oppositeColour.includes(board[rowIndex][colIndex])){
        rowColPositions.push({rowIndex, colIndex})
    }
    return rowColPositions
}