// src/components/LuckyRegionEnd.jsx
import React from "react";
import "../styles/LuckyRegionEnd.css";

export default function LuckyRegionEnd({ isWin, winningRegion, selectedRegion, amount, onRestart }) {
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
        <button className="retry-button" onClick={onRestart}>🔁 Rigioca</button>
      </div>
    </div>
  );
}
