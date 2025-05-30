import React from "react";
import "../styles/LuckyRegionEnd.css";

export default function LuckyRegionEnd({ isWin, winningRegion, selectedRegion, amount, onRestart }) {
  return (
    <div className="lucky-region-end-container">
      {isWin ? (
        <>
          <h2>🎉 Complimenti! Hai indovinato la Regione Fortunata!</h2>
          <p>✅ Era proprio <strong>{winningRegion}</strong></p>
          <div className="victory-amount">🏆 Hai vinto {amount.toLocaleString()}€!</div>
          <p>🔥 Fuochi d’artificio e frecce tricolori in arrivo!</p>
        </>
      ) : (
        <>
          <h2>😢 Niente da fare...</h2>
          <p>La tua scelta <strong>{selectedRegion}</strong> era sbagliata.</p>
          <p>💥 La Regione Fortunata era <strong>{winningRegion}</strong></p>
          <div className="loss-amount">Hai vinto 0€</div>
        </>
      )}
      <button onClick={onRestart}>🔁 Rigioca</button>
    </div>
  );
}
