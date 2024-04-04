export default function GameOver({status, onRestart, onNewGame}){

    const buttonGray = "bg-stone-400 text-stone-900 px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 font-medium";
    const buttonBlue = "bg-blue-400 text-white px-4 py-2 mx-4 rounded outline outline-2 hover:outline-4 outline-blue-600 hover:outline-blue-900 font-medium";
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative text-center">
                <h1 className="text-4xl font-bold text-stone-900 mb-4">Game Over</h1>
                <h2 className="text-2xl font-bold text-stone-900">{status}</h2>
                <div className="flex justify-between my-4">
                    <button className={buttonGray} onClick={onRestart} >
                        Play Again
                    </button>
                    <button className={buttonGray} onClick={onRestart} >
                        New Game
                    </button>
                </div>
                <div className="mt-4">
                    <button className={buttonBlue} onClick={onRestart}>
                        Analyse Game
                    </button>
                </div>
            </div>s
        </div>
    )
};
