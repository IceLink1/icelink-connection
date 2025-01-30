import React from "react";
import "./Textarea.css";

export default function Textarea({ children, placeholder, onChange, value }) {
  return (
    <textarea
      className="Textarea"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    >
      {children}
    </textarea>
  );
}
