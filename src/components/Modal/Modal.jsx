import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.code === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const eventListener = (e) => handleKeyDown(e);
    window.addEventListener("keydown", eventListener);
    return () => {
      window.removeEventListener("keydown", eventListener);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
      {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
