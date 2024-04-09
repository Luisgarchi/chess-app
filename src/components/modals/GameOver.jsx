import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../uiComponents/Button";

export default function GameOver() {
    const { states, setStates } = useContext(AppContext);
    const { gameResult } = states;
    const { restartGame, setModalStatus } = setStates;

    function onConfigure() {
        restartGame(); // Ensure onRestart is defined or imported if it's used here
        setModalStatus("settings");
    }

    const buttonBaseStyle = "px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex items-center justify-center";
    const buttonGray = buttonBaseStyle + " bg-stone-400 text-stone-900 flex-1";

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative text-center">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Game Over</h2>
                <h1 className="text-4xl font-bold text-stone-900">{gameResult}</h1>
                <div className="flex mt-4">
                    <Button type={'restart'} text={"Rematch"} onClick={restartGame} styles={buttonGray} />
                    <Button type={'settings'} text={"Configure"} onClick={onConfigure} styles={buttonGray} />
                </div>
            </div>
        </div>
    );
}
