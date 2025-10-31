import React, { useState } from "react";
import "./Password.css";
import { createPortal } from "react-dom";

const basicBg = "/images/mog_PSG_cartoon_16x9_alt.png";
const secretBg = "/images/mogu_PSG_full_splash_ALT_pub.png";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("portal-root");
  if (!el) return null;
  return createPortal(children, el);
};

function Password() {
  const [codes, setCodes] = useState([""]);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [prizeType, setPrizeType] = useState("");
  const correctCodes = ["STOCKING", "FALLEN"];

  const handleChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value.toUpperCase();
    setCodes(newCodes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = codes[0];
    if (enteredCode === correctCodes[0]) {
      setUnlocked(true);
      setPrizeType("basic");
      setError("");
    } else if (enteredCode === correctCodes[1]) {
      setUnlocked(true);
      setPrizeType("secret");
      setError("");
    } else {
      setUnlocked(false);
      setPrizeType("");
      setError("Incorrect code. Try again!");
    }
  };

  const closeModal = () => {
    setUnlocked(false);
    setCodes([""]);
  };

  return (
    <div 
      className="unlock-container"
      style={{
        background: 'url("/images/okumono_halloween2527.png") center center / cover no-repeat'
      }}
    >
      <div className="unlock-box">
        <img
          src="/images/password_page.png"
          alt="Enter the secret phrase"
          className="password-img"
        />
        <form onSubmit={handleSubmit} className="unlock-form">
          <div className="inputs">
            <input
              type="text"
              value={codes[0]}
              onChange={(e) => handleChange(0, e.target.value)}
            />
          </div>
          <button type="submit" className="password-button">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        {unlocked && (
          <ModalPortal>
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <img
                  src={prizeType === "basic" ? basicBg : secretBg}
                  alt="Prize"
                  className="prize-image"
                />
                <p className="art-credit">art: <a href="https://x.com/KunoMD" target="_blank" rel="noopener noreferrer">kunoMD</a></p>
                <p className="success-message">Happy Moguween MogChamp!</p>
                <div className="modal-bottom-row">
                  <button
                    className="download-button"
                    onClick={() => {
                      const imageUrl = prizeType === "basic" ? basicBg : secretBg;
                      const link = document.createElement('a');
                      link.href = imageUrl;
                      link.download = prizeType === "basic" ? "mogu_PSG_basic.png" : "mogu_PSG_secret.png";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download
                  </button>
                  <button className="password-button close-button" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}
      </div>
    </div>
  );
}

export default Password;
