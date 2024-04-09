import { useState, useRef, useContext } from "react"
import { AppContext } from "../../context/AppContext"
import kingBlack from "../../assets/kingBlack.svg"
import kingWhite from "../../assets/kingWhite.svg"
import Button from "../uiComponents/Button"

export default function GameConfiguration() {

    // Get the states and setStates from the AppContext
    const { states, setStates } = useContext(AppContext)
    const { players, timeControls, increment } = states
    const { setPlayers, setTimeControls, setIncrement, setModalStatus, restartGame } = setStates

    // Local states for the form
    const [whiteName, setWhiteName] = useState(players.white)
    const [blackName, setBlackName] = useState(players.black)
    const [time, setTime] = useState(timeControls)
    const [inc, setInc] = useState(increment)
    const [showAlert, setShowAlert] = useState(false)

    // Refs for the input fields
    const whiteNameRef = useRef()
    const blackNameRef = useRef()

    // Button styles

    const buttonBaseStyle = "bg-stone-400 text-stone-900 px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium flex items-center";
    const buttonBlue = "bg-blue-400 text-white px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 outline-blue-600 hover:outline-blue-900 font-medium flex items-center";
    
    
    function getButtonClass(condition) {
        // When the condition is true, make the outline thicker to indicate active state
        // For non-active buttons, add a hover effect that increases the outline width
        return condition ? `${buttonBaseStyle} outline-stone-900 outline-4` : `${buttonBaseStyle} outline-stone-600 hover:outline-stone-900 hover:outline-4`;
    }

    /* Function to handle local changes */

    // Handle increment change
    function handleChangeIncrement(inc){
        if (time !== undefined || inc === 0) {
            setInc(inc)
        }
        else {
            setShowAlert(true); // Show custom alert
        }
    }

    // Handle time change
    function handleChangeTime(time){
        if (time === undefined) {
            setInc(0)
        }
        setTime(time)
    }

    // Handle player name change
    function handleChange(player) {
        if (player === "white") {
            setWhiteName(whiteNameRef.current.value)
        }else {
            setBlackName(blackNameRef.current.value)
        }
    }

    // Handle close alert
    function handleCloseAlert() {
        setShowAlert(false); // Hide custom alert
    }

        // Custom Alert Component
        const AlertModal = function(){
            return (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border-2 border-red-500">
                    <p className="text-lg">Please select time controls first.</p>
                    <button onClick={handleCloseAlert} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Close
                    </button>
                </div>
            );
        }

    /* Funtion to submit the form and altert global states */

    function handleClose(){
        setTimeControls(time)
        setIncrement(inc)
        setPlayers({white: whiteName, black: blackName})
        setModalStatus("none")
        restartGame()
    }


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative">
                
                {/* Alert for bad use of inc with time controls*/}
                {showAlert && <AlertModal />}

                {/* Player Names */}
                <h2 className="text-2xl font-bold text-stone-900">Player Names</h2>
                <div className="flex justify-between my-4">
                    <div className='flex items-center gap-2 mx-4'>
                        <img src={kingWhite} alt="White Player Image" />
                        <input autoFocus ref = {whiteNameRef} type='text' className='bg-transparent font-bold w-32 border border-stone-600 rounded-lg p-2' required value = {whiteName} onChange = {() => handleChange("white")}/>
                    </div>
                    <div className='flex items-center gap-2 mx-4'>
                        <img src={kingBlack} alt="Black Player Image" />
                        <input ref = {blackNameRef} type='text' className='bg-transparent font-bold w-32 border border-stone-600 rounded-lg p-2' required value = {blackName} onChange = {() => handleChange("black")}/>
                    </div>  
                </div>

                {/* Time Controls */}
                <h2 className="text-2xl font-bold text-stone-900">Time Controls</h2>
                <div className="flex justify-between my-4">
                    <button className={getButtonClass(time === undefined)} onClick={() => handleChangeTime(undefined)}> Off </button>
                    <button className={getButtonClass(time === 60)} onClick={() => handleChangeTime(60)}>1 mins</button>
                    <button className={getButtonClass(time === 300)} onClick={() => handleChangeTime(300)}>5 mins</button>
                    <button className={getButtonClass(time === 600)} onClick={() => handleChangeTime(600)}>10 mins</button>
                </div>

                {/* Increment */}
                <h2 className="text-2xl font-bold text-stone-900">Increment</h2>
                <div className="flex justify-between my-4">
                    <button className={getButtonClass(inc === 0)} onClick={() => handleChangeIncrement(0)}>0s</button>
                    <button className={getButtonClass(inc === 1)} onClick={() => handleChangeIncrement(1)}>1s</button>
                    <button className={getButtonClass(inc === 2)} onClick={() => handleChangeIncrement(2)}>2s</button>
                    <button className={getButtonClass(inc === 5)} onClick={() => handleChangeIncrement(5)}>5s</button>
                    <button className={getButtonClass(inc === 10)} onClick={() => handleChangeIncrement(10)}>10s</button>
                </div>

                {/* Submit button*/}
                <div className="flex justify-center mt-16">
                    <Button type = {'play'} text = {"Start Game"} onClick={handleClose} styles = {buttonBlue}/>
                </div>

            </div>
        </div>
    )
}      