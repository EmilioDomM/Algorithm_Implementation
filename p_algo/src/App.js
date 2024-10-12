import React, { useState } from "react";
import './App.css';

const App = () => {
  const [textValue1, setTextValue1] = useState(""); 
  const [textValue2, setTextValue2] = useState("");
  
  const handleFileUpload = (event, setTextValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTextValue(e.target.result); 
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container">
      {/* First Row */}
      <div className="row">
        <input
          type="file"
          accept=".txt"
          className="red-dot-button"
          onChange={(e) => handleFileUpload(e, setTextValue1)}
        />
        <input
          type="text"
          placeholder="Search"
          className="green-dot-searchbar"
        />
      </div>

      <div className="row">
        <textarea
          className="black-dot-textbox"
          placeholder="Texto"
          value={textValue1}
          onChange={(e) => setTextValue1(e.target.value)}
        />
      </div>

      {/* Second Row */}
      <div className="row">
        <input
          type="file"
          accept=".txt"
          className="red-dot-button"
          onChange={(e) => handleFileUpload(e, setTextValue2)}
        />
        <input
          type="text"
          placeholder="Search"
          className="green-dot-searchbar"
        />
      </div>

      <div className="row">
        <textarea
          className="black-dot-textbox"
          placeholder="Texto"
          value={textValue2}
          onChange={(e) => setTextValue2(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="buttons-row">
        <button className="red-dot-button">Buscar</button>
        <button className="red-dot-button">Similitud</button>
        <button className="red-dot-button">Palindromo</button>
      </div>
    </div>
  );
};

export default App;
