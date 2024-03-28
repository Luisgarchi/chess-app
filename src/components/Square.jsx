import DisplayPiece from './DisplayPiece';
import DisplayOverlay from './DisplayOverlay';


export default function Square({ piece, maskValue, selectedPiece, position}) {

    // Format the square with the piece image and overlay
    const showOverlay = maskValue === 'available' || maskValue === 'enemy';

    let stylesSquareButton = `relative w-full h-full p-0 m-0 flex justify-center items-center`

    if (maskValue === 'selected') {
        stylesSquareButton += " bg-blue-500 bg-opacity-50"
    }
    else {
        stylesSquareButton += " bg-transparent"
    }

    // Button is active when:
    // 1) No piece is selected and the square contains a piece that matches the current players colour.
    // 2) A piece is selected and the square contains is one of those that the selected piece can move to.
    // 3) The piece is selected and a square contains a piece of the same colour (i.e. to change moving piece)
    const isButtonActive = (
        (selectedPiece === null && piece !== null && piece.colour === playerTurn) ||
        (selectedPiece !== null && (maskValue === 'available' || maskValue === 'enemy')) || 
        (selectedPiece !== null && piece !== null && piece.colour === selectedPiece.colour)
    )
    
    return (
        <button disabled={!isButtonActive} className = {stylesSquareButton} >
            {piece && <DisplayPiece piece={piece} />}
            {showOverlay && <DisplayOverlay value={maskValue} />}
        </button>
    );
}