


export default function GameMode({onSelect}) {

    const cssClasses = `font-bold text-stone-950 flex-grow px-4 border-4 rounded
        bg-stone-400 border-solid border-stone-400 hover:border-stone-600`

    const cssMiddle = cssClasses + ' my-4'

    return (
        <header className = "flex flex-col justify-between h-full">
            <button className = {cssClasses} onClick={onSelect} > Bullet </button>
            <button className = {cssMiddle} onClick={onSelect}> Blitz </button>
            <button className = {cssClasses} onClick={onSelect}> Rapid </button>
        </header>
    )
}


