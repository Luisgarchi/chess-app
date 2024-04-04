import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
    const dialog = useRef();

    useEffect(() => {
        // Function to prevent dialog from closing
        const handleCancelEvent = (event) => {
            event.preventDefault();
        };

        if(open) {
            dialog.current.showModal();
            // Add event listener to intercept the cancel event
            dialog.current.addEventListener('cancel', handleCancelEvent);
        } else {
            dialog.current.close();
            // It's a good practice to remove the event listener when it's no longer needed
            dialog.current.removeEventListener('cancel', handleCancelEvent);
        }

        // Cleanup function to remove event listener when the component unmounts or updates
        return () => {
            if(dialog.current) {
                dialog.current.removeEventListener('cancel', handleCancelEvent);
            }
        };
    }, [open]);

    return createPortal(
        <dialog ref={dialog}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;