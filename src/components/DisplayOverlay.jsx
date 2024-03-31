import highlightVacant from '../assets/highlightVacant.svg'
import highlightEnemy from '../assets/highlightEnemy.svg'


export default function DisplayOverlay({ value }) {

    return (
        <img 
           className = "absolute top-0 left-0 w-full h-full object-contain z-20" 
            src={ (value === "vacant") ? highlightVacant : highlightEnemy} 
            alt="Highlight" 
        />
    )
}