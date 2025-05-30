// src/components/GameEndOverlay.jsx
import React, { useState } from "react";
import "../styles/GameEndOverlay.css";

export default function GameEndOverlay({ amount, playerBoxValue, onReveal, onSimulate }) {
  const [showOptions, setShowOptions] = useState(true);
  const [revealDone, setRevealDone] = useState(false);

  const handleReveal = () => {
    onReveal();
    setShowOptions(false);
    setRevealDone(true);
  };

  const handleSimulate = () => {
    onSimulate();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="game-end-overlay">
      <div className="game-end-box">
        <h2>🎉 Fine del gioco!</h2>
        <p>Hai accettato un'offerta di:</p>
        <p className="accepted-amount">
          {amount === "swap" ? "🔄 Cambio pacco" : `💶 ${amount.toLocaleString()}€`}
        </p>

        {showOptions && (
          <div className="end-options">
            <p>Cosa vuoi fare ora?</p>
            <button onClick={handleReveal}>
              🔍 Scopri cosa c'era nel tuo pacco
            </button>
            <button onClick={handleSimulate}>
              🎭 Simula la partita fino alla fine
            </button>
          </div>
        )}

        {revealDone && (
          <div className="reveal-result">
            <p>📦 Il tuo pacco conteneva:</p>
            <h3 className="box-reveal-amount">
              💰 {playerBoxValue.toLocaleString()}€
            </h3>
            <button onClick={handleRestart}>🔁 Rigioca</button>
          </div>
        )}
      </div>
    </div>
  );
}
