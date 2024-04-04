import WelcomeMessage from "./WelcomeMessage";
import GameConfiguration from "./GameConfiguration";

import { useState } from "react";

export default function GameStart({ configGame, initParams, close }) {

    const [isGameConfigured, setIsGameConfigured] = useState(false);

    function selectConfigure(){
        setIsGameConfigured(true)
    }

    return (
        <>
            {!isGameConfigured && <WelcomeMessage 
                    quickPlay = {close}
                    onSelectConfig = {selectConfigure}
                />
            }
            {isGameConfigured && <GameConfiguration 
                    configGame={configGame}
                    initParams={initParams}
                    submit = {close}
                />
            }
        </>
    )
}