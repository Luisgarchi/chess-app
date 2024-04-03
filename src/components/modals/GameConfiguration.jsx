import { useState, useRef } from "react"
import kingBlack from "../../assets/kingBlack.svg"
import kingWhite from "../../assets/kingWhite.svg"

export default function GameConfiguration({ configGame, initNames }) {

    const [whiteName, setWhiteName] = useState(initNames.white)
    const [blackName, setBlackName] = useState(initNames.black)
    const [timeControl, setTimeControl] = useState(300)
    const [increment, setIncrement] = useState(0)

    const whiteNameRef = useRef()
    const blackNameRef = useRef()

    const buttonBaseStyle = "bg-stone-400 text-stone-900 px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4";

    function getButtonClass(condition) {
        // When the condition is true, make the outline thicker to indicate active state
        // For non-active buttons, add a hover effect that increases the outline width
        return condition ? `${buttonBaseStyle} outline-stone-900 outline-4` : `${buttonBaseStyle} outline-stone-600 hover:outline-stone-900 hover:outline-4`;
    }

    function handleChange(player) {
        if (player === "white") {
            setWhiteName(whiteNameRef.current.value)
        }else {
            setBlackName(blackNameRef.current.value)
        }
    }

    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
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
                <h2 className="text-2xl font-bold text-stone-900">Time Controls</h2>
                <div className="flex justify-between my-4">
                    <button className={getButtonClass(timeControl === 0)} onClick={() => setTimeControl(0)}> Off </button>
                    <button className={getButtonClass(timeControl === 60)} onClick={() => setTimeControl(60)}>1 mins</button>
                    <button className={getButtonClass(timeControl === 300)} onClick={() => setTimeControl(300)}>5 mins</button>
                    <button className={getButtonClass(timeControl === 600)} onClick={() => setTimeControl(600)}>10 mins</button>
                </div>
                <h2 className="text-2xl font-bold text-stone-900">Increment</h2>
                <div className="flex justify-between my-4">
                    <button className={getButtonClass(increment === 0)} onClick={() => setIncrement(0)}>0s</button>
                    <button className={getButtonClass(increment === 1)} onClick={() => setIncrement(1)}>1s</button>
                    <button className={getButtonClass(increment === 2)} onClick={() => setIncrement(2)}>2s</button>
                    <button className={getButtonClass(increment === 5)} onClick={() => setIncrement(5)}>5s</button>
                    <button className={getButtonClass(increment === 10)} onClick={() => setIncrement(10)}>10s</button>
                </div>
                {/* Submit button*/}
                <div className="flex justify-center mt-16">
                    <button className={buttonBaseStyle + " button-pulsate"} onClick={() => configGame(whiteName, blackName, timeControl)}>Start Game</button>
                </div>
            </div>
        </div>
    )
}      