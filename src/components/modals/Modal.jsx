import { useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import WelcomeMessage from "./WelcomeMessage";
import GameConfiguration from "./GameConfiguration";
import RestartConfirmation from "./RestartConfirmation";
import GameOver from "./GameOver";
 
function Modal() {

    const { states } = useContext(AppContext)
    const { gameStatus } = states

    let modalContent = <></>

    if (gameStatus === "app-start") {
        modalContent = <WelcomeMessage />
    }
    else if (gameStatus === "settings") {
        modalContent = <GameConfiguration  />
    }    
    else if(gameStatus === "game-over") {
        modalContent = <GameOver />
    }
    else if(gameStatus === "restart") {
        modalContent = <RestartConfirmation />
    }


    return createPortal(modalContent,
        document.getElementById('modal')
    )
}

export default Modal;