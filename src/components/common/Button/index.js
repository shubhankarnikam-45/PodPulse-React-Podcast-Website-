import React from "react";
import "./styles.css";
function Button({ text, onClick, disabled, width, height }) {
  return (
    <div
      onClick={onClick}
      className="custom-btn"
      disabled={disabled}
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  );
}

export default Button;
