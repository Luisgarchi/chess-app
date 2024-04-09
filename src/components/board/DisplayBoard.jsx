import Chess from "../../chess/Chess"
import DisplayPiece from "./DisplayPiece";

export default function DisplayBoard({ gameState }) {

    const chessBoard = new Chess(gameState)
    let stylesSquareButton = `relative w-full h-full p-0 m-0 flex justify-center items-center cursor-default`;

    return (
        <ol className="flex flex-col justify-center items-center">
            {chessBoard.board.map((row, rowIndex) => (
                <li className="flex" key={rowIndex}>
                    <ol className="flex justify-center">
                        {row.map((piece, colIndex) => {
                        
                            const squareColor = (rowIndex + colIndex) % 2 === 0 ? "bg-[#F0D9B5]" : "bg-[#b58863]";
                            const squareStyles = `w-16 h-16 flex justify-center items-center ${squareColor}`;

                            return (
                                <li key={colIndex} className={squareStyles}>
                                    {piece && <button className= {stylesSquareButton}>
                                            <DisplayPiece piece={piece} />
                                        </button>}
                                </li>
                            );
                        })}
                    </ol>
                </li>
            ))}
        </ol>
    )
}