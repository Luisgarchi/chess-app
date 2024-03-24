export const INITIAL_CHESS_BOARD = [
    [
        {type: "rook", colour: "black", points: 5},
        {type: "knight", colour: "black", points: 3},
        {type: "bishop", colour: "black", points: 3},
        {type: "queen", colour: "black", points: 9},
        {type: "king", colour: "black", points: 0},
        {type: "bishop", colour: "black", points: 3},
        {type: "knight", colour: "black", points: 3},
        {type: "rook", colour: "black", points: 5},
    ],
    [
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
        {type: "pawn", colour: "black", points: 1},
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
        {type: "pawn", colour: "white", points: 1},
    ],
    [
        {type: "rook", colour: "white", points: 5},
        {type: "knight", colour: "white", points: 3},
        {type: "bishop", colour: "white", points: 3},
        {type: "queen", colour: "white", points: 9},
        {type: "king", colour: "white", points: 0},
        {type: "bishop", colour: "white", points: 3},
        {type: "knight", colour: "white", points: 3},
        {type: "rook", colour: "white", points: 5},
    ],
]

export const INITIAL_PLAYERS = {
    white: {
        name: "White Player",
        time: undefined,
    },
    black: {
        name: "Black Player",
        time: undefined,
    }
}
