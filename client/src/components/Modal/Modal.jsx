import React from "react";
import "./Modal.css";

export default function Modal({ isOpen, setIsOpen, children }) {
  const close = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <div className="Modal" onClick={close}>
          <div
            className="Modal__conteiner"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
//onClick={setIsOpen(!isOpen)}
