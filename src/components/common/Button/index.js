import React from "react";
import "./styles.css";
function Button({ text, onClick, disabled, width, height,bcolor }) {
  return (
    <div
      onClick={onClick}
      className="custom-btn"
      disabled={disabled}
      style={{ width: width, height: height, border:"3px solid bcolor"}}
    >
      {text}
    </div>
  );
}

export default Button;
