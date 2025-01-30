import React from "react";
import cl from "./Button.module.css";

const Button = ({ type, onClick, children, className }) => {
  return (
    <button type={type} onClick={onClick} className={`${cl.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
