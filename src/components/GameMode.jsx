import Modal from "./Modal";
import RestartConfirmation from "./modals/RestartConfirmation";

import { useState } from "react";

export default function GameMode({ onChangeTime, gameStatus }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [time, setTime] = useState(null)


    // Styles for the buttons
    const buttonBaseStyles = `font-bold text-stone-950 flex-grow px-4 border-4 rounded
        bg-stone-400 border-solid border-stone-400 hover:border-stone-600`;

    const buttonMiddleStyles = `${buttonBaseStyles} my-4`;

    // Additional CSS class to ensure text in brackets wraps
    const wrapTextStyles = `block`;



    function handleClick(time) {

        if (gameStatus === "in-progress") {
            setModalIsOpen(true);
            setTime(time);
        }
        else{
            onChangeTime(time);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleRestart(time){
        onChangeTime(time);
        setModalIsOpen(false); // Close the modal
    }

    return (
        <>
            <Modal open={modalIsOpen} onClose={closeModal}>
                {modalIsOpen && <RestartConfirmation 
                    onRestart={() => handleRestart(time)} 
                    onCancel={closeModal} 
                />}
            </Modal>

            <header className="flex flex-col justify-between h-full">
                <button className={buttonBaseStyles} onClick={() => handleClick(120)}>
                    Bullet <span className={wrapTextStyles}>(2 min)</span>
                </button>
                <button className={buttonMiddleStyles} onClick={() => handleClick(300)}>
                    Blitz <span className={wrapTextStyles}>(5 mins)</span>
                </button>
                <button className={buttonBaseStyles} onClick={() => handleClick(600)}>
                    Rapid <span className={wrapTextStyles}>(10 mins)</span>
                </button>
            </header>
        </>

    );
}