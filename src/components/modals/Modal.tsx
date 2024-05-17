import { useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import WelcomeMessage from "./WelcomeMessage";
import GameConfiguration from "./GameConfiguration";
import GameOver from "./GameOver";

function Modal() {

    const { states } = useContext(AppContext)
    const { gameStatus, modalStatus } = states

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


    return createPortal(modalContent,
        document.getElementById('modal')
    )
}

export default Modal;