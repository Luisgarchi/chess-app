import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function WelcomeMessage() {
    
    const { setStates } = useContext(ModalContext)
    const { setGameStatus } = setStates; 

    function quickPlay(){
        setGameStatus("game-start")
    }

    function onSelectConfig(){
        setGameStatus("settings")
    }


    const buttonBaseStyle = "bg-stone-400 text-stone-900 px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 flex-1 font-medium";

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-stone-900">Welcome to React Chess Demo</h2>
                <p className="text-stone-800">Would you like to configure Game?</p>
                <div className="flex justify-start space-x-4 mt-8">
                    <button className={buttonBaseStyle} onClick={quickPlay}>Quick Play</button>
                    <button className={buttonBaseStyle} onClick={onSelectConfig}>Configure</button>
                </div>
            </div>
        </div>
    )
}