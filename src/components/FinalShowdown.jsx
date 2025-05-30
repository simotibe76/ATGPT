// src/components/FinalShowdown.jsx
import React, { useState, useEffect } from "react";
import "../styles/FinalShowdown.css";

export default function FinalShowdown({ playerBox, remainingBox, onRestart }) {
  const [countdown, setCountdown] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const isVictory = playerBox.prize > remainingBox.prize;

  useEffect(() => {
    if (countdown > 0) {
      const id = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(id);
    }
    setShowResult(true);
  }, [countdown]);

  return (
    <div className="final-showdown-container">
      <div className="box final-box">
        <h3>{playerBox.name}</h3>
        <p>Pacco N° {playerBox.number}</p>
        {showResult && <p className="final-prize">💰 {playerBox.prize.toLocaleString()}€</p>}
      </div>

      <div className="countdown-center">
        {!showResult ? (
          <h1 className="countdown-number">{countdown}</h1>
        ) : (
          <>
            <h2 className={isVictory ? "victory" : "defeat"}>
              {isVictory ? "🎉 Hai fatto bene a tenerlo!" : "😔 Il tuo pacco valeva meno..."}
            </h2>
            <button onClick={onRestart}>🔁 Rigioca</button>
          </>
        )}
      </div>

      <div className="box final-box">
        <h3>{remainingBox.name}</h3>
        <p>Pacco N° {remainingBox.number}</p>
        {showResult && <p className="final-prize">💰 {remainingBox.prize.toLocaleString()}€</p>}
      </div>
    </div>
  );
}
