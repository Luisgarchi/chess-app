import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { fenStart } from "../../chess/fenStart";

import Button from "../uiComponents/Button";


export default function GameOver(){

    const { states, setStates } = useContext(ModalContext)
    const { gameResult, timeControls, increment } = states
    const { setChessLogs, setGameStatus, setGameResult, initTimers } = setStates

    function onRestart (){
        setGameStatus("not-started")
        setChessLogs([{ move: null, fen: fenStart }])
        setGameResult(undefined)
        initTimers(timeControls, increment)
    }

    function onAnalyse (){
        setGameStatus("analyse")
    }

    function onConfigure (){
        onRestart()
        setGameStatus("settings")
    }

    const buttonGray = "bg-stone-400 text-stone-900 px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex-1";
    const buttonBlue = "bg-blue-400 text-white px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 outline-blue-600 hover:outline-blue-900 font-medium";
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative text-center">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Game Over</h2>
                <h1 className="text-4xl font-bold text-stone-900">{gameResult}</h1>
                <div className="flex justify-start my-8">
                    <button className={buttonGray} onClick={onRestart} >
                        Rematch
                    </button>
                    <Button type = {'settings'} text = {"Configure"} onClick={onConfigure} />
                </div>
                <div className="mt-8">
                    <button className={buttonBlue} onClick={onAnalyse}>
                        Analyse Game
                    </button>
                </div>
            </div>
        </div>
    )
};
