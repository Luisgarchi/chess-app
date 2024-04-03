import WelcomeMessage from "./WelcomeMessage";
import GameConfiguration from "./GameConfiguration";

import { useState } from "react";

export default function GameStart({configGame, defaultGame, initNames}) {

    const [isGameConfigured, setIsGameConfigured] = useState(false);

    function selectConfigure(){
        setIsGameConfigured(true)
    }

    return (
        <>
            {!isGameConfigured && <WelcomeMessage 
                    onDefault={defaultGame}
                    onSelectConfig = {selectConfigure}
                />
            }
            {isGameConfigured && <GameConfiguration 
                    configGame={configGame}
                    initNames={initNames}
                />
            }
        </>
    )
}