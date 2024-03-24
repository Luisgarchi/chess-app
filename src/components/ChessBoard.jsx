import DisplayPiece from "./DisplayPiece"




export default function ChessBoard({ board }) {

    return(
        <ol className="flex flex-col justify-center items-center">
            {board.map((row, rowIndex) => (
                <li className = "flex" key={rowIndex}>
                    <ol className="flex justify-center">
                        {row.map((piece, pieceIndex) => {

                            let cssSquare = "w-16 h-16 flex justify-center items-center"
                            if((rowIndex + pieceIndex) % 2 === 0){
                                cssSquare += " bg-[#F0D9B5]"
                            } else {
                                cssSquare += " bg-[#b58863]"
                            }
                            
                            const display = (!piece) ? null : <DisplayPiece piece= {piece}/>

                            return (
                                <li key={pieceIndex} className = {cssSquare}>
                                    {display}
                                </li>
                            )
                        })}
                    </ol>
                </li>
            ))}
        </ol>
    )
}