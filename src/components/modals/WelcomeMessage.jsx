import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import Button from "../uiComponents/Button";


export default function WelcomeMessage() {
    
    const { setStates } = useContext(ModalContext);
    const { setGameStatus } = setStates;

    function quickPlay() {
        setGameStatus("game-start");
    }

    function onSelectConfig() {
        setGameStatus("settings");
    }

    // Updated buttonBaseStyle to include flex and items-center
    const buttonBaseStyle = "px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex items-center justify-center flex-1";
    const buttonGrey = buttonBaseStyle + " bg-stone-400 text-stone-900";
    const buttonBlue = buttonBaseStyle + " bg-blue-400 text-white outline-blue-900";
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Welcome to React Chess Demo</h2>
                <p className="text-stone-800">Would you like to configure the game?</p>
                <div className="flex mt-8">
                    <Button type = {'play'} text = {"Quick Play"} onClick={quickPlay} styles = {buttonBlue}/>
                    <Button type = {'settings'} text = {"Configure"} onClick={onSelectConfig} styles = {buttonGrey} />
                </div>
            </div>
        </div>
    );
}
