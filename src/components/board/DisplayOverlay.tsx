import highlightVacant from '../../assets/highlights/vacant.svg'
import highlightEnemy from '../../assets/highlights/enemy.svg'


export default function DisplayOverlay({ value }) {

    return (
        <img 
           className = "absolute top-0 left-0 w-full h-full object-contain z-20" 
            src={ (value === "vacant") ? highlightVacant : highlightEnemy} 
            alt="Highlight" 
        />
    )
}