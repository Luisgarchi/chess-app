
export default function RestartConfirmation({ onRestart, onCancel }) {


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-stone-900">Restart Game</h2>
                <p className="text-stone-800">Are you sure you want to restart the game?</p>
                <div className="flex justify-between mt-8">
                    <button className="bg-stone-400 text-stone-900 px-4 py-2 rounded" onClick={onRestart}>Restart</button>
                    <button className="bg-stone-400 text-stone-900 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}