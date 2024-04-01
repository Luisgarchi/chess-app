import { GameContext } from "../GameContext";
import Board from "./Board";

import { memo } from "react"

export const CurrentGame = memo(({value}) => {
    // Isolated context provider for the current game (Avoids re-rendering the entire app)

    return (
        <GameContext.Provider value={value}>
            <Board />
        </GameContext.Provider>
    );
});
