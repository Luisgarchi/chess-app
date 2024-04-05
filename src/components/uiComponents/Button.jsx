import play from "../../assets/play.svg";
import settings from "../../assets/settings.svg"
import restart from "../../assets/restart.svg"


const icon = {
    play: play,
    settings: settings,
    restart: restart
}

export default function Button({type, text, onClick, styles}) {

    return (
        <button className={styles} onClick={onClick}>
            {text !== undefined && text}
            {type !== undefined && <img src={icon[type]} className="w-6 h-6 ml-2" alt="play"/>}
        </button>
    )
}
