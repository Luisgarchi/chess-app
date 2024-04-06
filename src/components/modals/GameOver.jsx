import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { fenStart } from "../../chess/fenStart";

import Button from "../uiComponents/Button";

export default function GameOver() {
    const { states, setStates } = useContext(ModalContext);
    const { gameResult, timeControls, increment } = states;
    const { setChessLogs, setGameStatus, setGameResult, initTimers } = setStates;

    function onRestart() {
        setGameStatus("not-started");
        setChessLogs([{ move: null, fen: fenStart }]);
        setGameResult(undefined);
        initTimers(timeControls, increment);
    }

    function handleAnalyse() {
        setGameStatus("analyse");
    }

    function onConfigure() {
        onRestart(); // Ensure onRestart is defined or imported if it's used here
        setGameStatus("settings");
    }

    const buttonBaseStyle = "px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex items-center justify-center";
    const buttonGray = buttonBaseStyle + " bg-stone-400 text-stone-900 flex-1";
    const buttonBlue = buttonBaseStyle + " bg-blue-400 text-white outline-blue-900 justify-center items-center";

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative text-center">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Game Over</h2>
                <h1 className="text-4xl font-bold text-stone-900">{gameResult}</h1>
                <div className="flex my-8">
                    <Button type={'restart'} text={"Rematch"} onClick={onRestart} styles={buttonGray} />
                    <Button type={'settings'} text={"Configure"} onClick={onConfigure} styles={buttonGray} />
                </div>
                <div className="mt-8 flex justify-center">
                    <Button type={'analyse'} text={"Analyse Game"} onClick={handleAnalyse} styles={buttonBlue} />
                </div>
            </div>
        </div>
    );
}
