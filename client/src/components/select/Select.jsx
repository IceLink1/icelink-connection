import React from "react";
import "./Select.css";

export default function Select({ data, setState }) {
  return (
    <select className="Select" onChange={(e) => setState(e.target.value)}>
      {data.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
