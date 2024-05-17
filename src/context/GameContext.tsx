import { createContext } from "react"


export const GameContext = createContext({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    makeMove: () => {},
})
