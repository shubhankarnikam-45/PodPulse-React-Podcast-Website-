import React, { useState } from "react";
import "./styles.css";

function FileInput({ accept, id, fileHandleFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        // when file is selected then border is white
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>

      {/* here we use the 'accept' parametr to specify the which type of file user . */}
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default FileInput;
