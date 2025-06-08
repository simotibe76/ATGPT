// src/components/LuckyRegionEnd.jsx
import React from "react";
import "../styles/LuckyRegionEnd.css";

export default function LuckyRegionEnd({ isWin, winningRegion, selectedRegion, amount, onRestart }) {
  const githubURL = "https://github.com/simotibe76/ATGPT/discussions/2";
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfNfUZFpQonGhTIXbCjpi7ft-Rn8gKAc1NC97Tdl3y7mjwdvw/viewform?usp=dialog"; // ← sostituisci con quello reale

  return (
    <div className="lucky-end-container">
      <div className="lucky-end-box">
        {isWin ? (
          <>
            <h2>🎉 Complimenti!</h2>
            <p>Hai indovinato la Regione Fortunata:</p>
            <h3 className="highlight">{winningRegion}</h3>
            <p>💰 Hai vinto: <span className="amount">{amount.toLocaleString()}€</span></p>
          </>
        ) : (
          <>
            <h2>😢 Peccato!</h2>
            <p>Hai scelto: <strong>{selectedRegion}</strong></p>
            <p>La Regione Fortunata era: <span className="highlight">{winningRegion}</span></p>
            <p>Purtroppo non hai vinto 😞</p>
          </>
        )}

        <div className="end-buttons">
          <button onClick={onRestart}>🔁 Rigioca</button>
          <button onClick={() => window.open(githubURL, "_blank")}>💬 Lascia un commento su GitHub</button>
          <button onClick={() => window.open(googleFormURL, "_blank")}>✍️ Invia un feedback</button>
        </div>
      </div>
    </div>
  );
}
