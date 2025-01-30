import React from "react";
import cl from "./Input.module.css";

export default function Input({ value,type, props, setValue ,placeholder}) {
  return (
    <input
      {...props}
      type={type}
      placeholder={placeholder}
      className={cl.Input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
