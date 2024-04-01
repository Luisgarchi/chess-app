import { useState, useRef, useEffect } from 'react'
import kingWhite from '../assets/kingWhite.svg'
import kingBlack from '../assets/kingBlack.svg'

export default function Player({ initialName, colour, onChangeName, time }) {

    // Define state hooks
    const [name, setName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)
    
    // Define ref for player name input
    const inputRef = useRef()

    // Effect for focusing on input when player is editing their name
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing])
    
    // function to handle toggling between editing and saving the player name
    function handleEditSaveToggle(){
        if(isEditing){
            onChangeName(colour, name)
        }
        setIsEditing((prevIsEditing) => (!prevIsEditing))
    }

    // function to handle changing the player name
    function handleChange(event){
        setName(event.target.value)
    }

    // Dyanmically render the player name based on whether the player is editing their name or not
    let editablePlayerName = <span className='font-bold w-32'>{name}</span>

    if(isEditing){
        editablePlayerName = (
            <input 
                ref = {inputRef} 
                type='text' 
                className='bg-transparent font-bold w-32' 
                required 
                value = {name} 
                onChange={handleChange}
            />
        )
    }

    return (
        <div className='flex justify-between w-full items-center bg-stone-400 p-4 rounded text-stone-950'>
            <div className='flex items-center gap-2'>
                <img src = { (colour === 'white') ? kingWhite : kingBlack}/>
                {editablePlayerName}
                <button className="p-1 bg-stone-700 hover:bg-stone-900 text-stone-200 rounded text-xs font-bold" onClick={handleEditSaveToggle}>
                    {isEditing ? "Save" : "Edit Name"}
                </button>
            </div>
            <span>{time}</span>
        </div>
    )
}