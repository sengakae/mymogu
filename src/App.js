import React, { useState } from "react";
import "./App.css";

function App() {
  const [codes, setCodes] = useState(["", "", ""]);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const correctCodes = ["123", "abc", "xyz"];

  const handleChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codes.every((val, i) => val === correctCodes[i])) {
      setUnlocked(true);
      setError("");
    } else {
      setUnlocked(false);
      setError("Incorrect codes. Try again!");
    }
  };

  return (
    <div className="unlock-container">
      <div className="unlock-box">
        <h1>Unlock the Prize</h1>

        {unlocked ? (
          <p className="success-message">Unlocked! You found the prize!</p>
        ) : (
          <form onSubmit={handleSubmit} className="unlock-form">
            <div className="inputs">
              {codes.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                  maxLength={10}
                  placeholder={`Code ${i + 1}`}
                />
              ))}
            </div>
            <button type="submit">Submit</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
