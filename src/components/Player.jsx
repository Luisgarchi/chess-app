import { useState, useRef, useEffect } from 'react'
import kingWhite from '../assets/kingWhite.svg'
import kingBlack from '../assets/kingBlack.svg'

export default function Player({ initialName, colour, time }) {

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

    return (
        <div className='flex justify-between w-full items-center bg-stone-400 p-4 rounded text-stone-950'>
            <div className='flex items-center gap-2'>
                <img src={(colour === 'white') ? kingWhite : kingBlack} />
                <span className='font-bold w-32'>{name}</span>
            </div>
            <span className="ml-auto font-bold text-2xl">
                {displayTime}
            </span>
        </div>
    )
}