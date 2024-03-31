import DisplayPiece from './DisplayPiece';
import DisplayOverlay from './DisplayOverlay';


export default function Square({ piece, maskValue, selectedPiece, position, turn }) {

    // Format the square with the piece image and overlay
    const showOverlay = (maskValue === 'vacant' || maskValue === 'occupied');
    
    let background = null
    if (maskValue === 'selected') {
        background = "bg-blue-500 bg-opacity-50"
    }
    else if(maskValue === 'check'){
        background = "bg-red-500 bg-opacity-50"
    }
    let stylesSquareButton = `relative w-full h-full p-0 m-0 flex justify-center items-center ${(background !== null) ? background : "bg-transparent"}`

    // Button is active when:
    // 1) No piece is selected and the square contains a piece that matches the current players colour. 
    //    The piece is selected and a square contains a piece of the same colour (i.e. to change moving piece)
    // 2) A piece is selected and the square contains is one of those that the selected piece can move to.

    const currentColourPieces = (turn === 'w') ? 'KQRBNP' : 'kqrbnp'// Get the current colour via the context

    const isButtonActive = (
        (piece !== null && currentColourPieces.includes(piece)) ||
        (selectedPiece !== null && showOverlay)
    )
    
    return (
        <button disabled={!isButtonActive} className = {stylesSquareButton} >
            {piece && <DisplayPiece piece={piece} />}
            {showOverlay && <DisplayOverlay value={maskValue} />}
        </button>
    );
}