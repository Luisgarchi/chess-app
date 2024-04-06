import play from "../../assets/play.svg";
import settings from "../../assets/settings.svg"
import restart from "../../assets/restart.svg"
import analyse from "../../assets/analyse.svg"
import flag from "../../assets/flag.svg"


const icon = {
    play: play,
    settings: settings,
    restart: restart,
    analyse: analyse,
    flag: flag,
}

export default function Button({type, text, onClick, styles, iconStyles}) {

    const imgStyles = (iconStyles === undefined) ? "w-6 h-6 ml-2" : iconStyles
    
    return (
        <button className={styles} onClick={onClick}>
            {text !== undefined && text}
            {type !== undefined && <img src={icon[type]} className={imgStyles} alt = {type}/>}
        </button>
    )
}
