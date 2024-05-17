import play from "../../assets/icons/play.svg";
import settings from "../../assets/icons/settings.svg"
import restart from "../../assets/icons/restart.svg"
import analyse from "../../assets/icons/analyse.svg"
import flag from "../../assets/icons/flag.svg"
import forward from "../../assets/icons/forward.svg"
import forwardforward from "../../assets/icons/forwardforward.svg"
import back from "../../assets/icons/back.svg"
import backback from "../../assets/icons/backback.svg"
import cancel from "../../assets/icons/cancel.svg"

const icon = {
    play: play,
    settings: settings,
    restart: restart,
    analyse: analyse,
    flag: flag,
    forward: forward,
    forwardforward: forwardforward,
    back: back,
    backback: backback,
    cancel: cancel,
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
