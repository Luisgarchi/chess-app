import { useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import WelcomeMessage from "./WelcomeMessage";
import GameConfiguration from "./GameConfiguration";
import RestartConfirmation from "./RestartConfirmation";
import GameOver from "./GameOver";
 
function Modal() {

    const { states, setStates } = useContext(AppContext)
    const { gameStatus, modalStatus } = states
    const {restartGame} = setStates

    let modalContent = <></>

    if (modalStatus === "welcome") {
        modalContent = <WelcomeMessage />
    }
    else if (modalStatus === "settings") {
        modalContent = <GameConfiguration  />
    }    
    else if(gameStatus === "game-over") {
        modalContent = <GameOver />
    }
    else if(modalStatus === "restart") {
        modalContent = <RestartConfirmation />
    }


    return createPortal(modalContent,
        document.getElementById('modal')
    )
}

export default Modal;