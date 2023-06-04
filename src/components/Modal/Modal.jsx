import React, { useEffect } from 'react';

const Modal = ({ onClose, children }) => {
    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">
                {children}
            </div>
        </div>
    );
};

export default Modal;
