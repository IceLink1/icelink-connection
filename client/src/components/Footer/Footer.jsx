import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__block block_first">
        <h3>Copyright © {new Date().getFullYear()}  All rights reserved</h3>
        <p>icelink39@gmail.com</p>
      </div> 
    </div>
  );
}
