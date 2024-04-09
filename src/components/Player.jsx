import { useState, useRef, useEffect } from 'react'
import kingWhite from '../assets/pieces/kingWhite.svg'
import kingBlack from '../assets/pieces/kingBlack.svg'
import Button from './uiComponents/Button'


export default function Player({ initialName, colour, time, resign }) {

    // Define state hooks
    const [name, setName] = useState(initialName)

    useEffect(() => {
        setName(initialName);
    }, [initialName]);
    

    if (typeof time === 'undefined') {
        time = null;
    }

    let displayTime;
    if (time === null) {
        displayTime = '--:--';
    } else {
        displayTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
    }


    
    const buttonStyle = "mr-8 rounded font-medium";
    const playerStyle = `flex justify-between w-full items-center bg-stone-400 p-4 text-stone-950 outline outline-2 rounded-xl`
    return (
        <div className = {playerStyle}>
            <div className='flex items-center gap-2'>
                <img src={(colour === 'w') ? kingWhite : kingBlack} />
                <span className='font-bold w-32'>{name}</span>
            </div>
            <div>
                <Button type = {"flag"} styles = {buttonStyle} onClick={resign}/>
                <span className="ml-auto font-bold text-4xl">
                    {displayTime}
                </span>
            </div>

        </div>
    )
}