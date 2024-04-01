export default function GameMode({ onSelect }) {

    const buttonBaseStyles = `font-bold text-stone-950 flex-grow px-4 border-4 rounded
        bg-stone-400 border-solid border-stone-400 hover:border-stone-600`;

    const buttonMiddleStyles = `${buttonBaseStyles} my-4`;

    // Additional CSS class to ensure text in brackets wraps
    const wrapTextStyles = `block`;

    return (
        <header className="flex flex-col justify-between h-full">
            <button className={buttonBaseStyles} onClick={onSelect}>
                Bullet <span className={wrapTextStyles}>(2 min)</span>
            </button>
            <button className={buttonMiddleStyles} onClick={onSelect}>
                Blitz <span className={wrapTextStyles}>(5 mins)</span>
            </button>
            <button className={buttonBaseStyles} onClick={onSelect}>
                Rapid <span className={wrapTextStyles}>(10 mins)</span>
            </button>
        </header>
    );
}