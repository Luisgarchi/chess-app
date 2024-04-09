import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import Button from "../uiComponents/Button";



export default function RestartConfirmation() {

    const { states, setStates } = useContext(AppContext);
    const { gameStatus } = states;
    const { restartGame, setModalStatus } = setStates;

    useEffect(() => {
        if(gameStatus !== "in-progress"){
            restartGame()
        }
    }, [])

    function onRestart() {
        restartGame();
        setModalStatus("welcome")
    }

    function onCancel() {
        setModalStatus("none");
    }

    // Updated buttonBaseStyle to include flex and items-center
    const buttonBaseStyle = "px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex items-center justify-center flex-1";
    const buttonGrey = buttonBaseStyle + " bg-stone-400 text-stone-900";
    const buttonBlue = buttonBaseStyle + " bg-blue-400 text-white outline-blue-900";

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Current Game In Progress</h2>
                <p className="text-stone-800">Are you sure you want to restart?</p>
                <div className="flex mt-8">
                    <Button type = {'play'} text = {"Restart"} onClick={onRestart} styles = {buttonBlue}/>
                    <Button type = {'cancel'} text = {"Cancel"} onClick={onCancel} styles = {buttonGrey} />
                </div>
            </div>
        </div>
    );
}
