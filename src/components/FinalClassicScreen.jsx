import React, { useState } from "react";
import CountdownFingers from "./CountdownFingers";
import "../styles/FinalClassicScreen.css";

export default function FinalClassicScreen({ playerBox, remainingBox, onRestart }) {
  const [showCountdown, setShowCountdown] = useState(false);
  const [finalMessage, setFinalMessage] = useState(null);

  const startCountdown = () => {
    setShowCountdown(true);
  };

  const evaluateOutcome = () => {
    const playerValue = playerBox?.prize || 0;
    const otherValue = remainingBox?.prize || 0;

    if (playerValue >= otherValue) {
      setFinalMessage({
        type: "win",
        text: `🎉 Hai fatto bene a tenere il tuo pacco! Vincita: ${playerValue.toLocaleString()}€`,
      });
    } else {
      setFinalMessage({
        type: "lose",
        text: `😢 Peccato... nel pacco rimasto c'erano ${otherValue.toLocaleString()}€, tu hai vinto solo ${playerValue.toLocaleString()}€`,
      });
    }
  };

  return (
    <div className="final-classic-container">
      <div className="final-box left">
        <h3>Pacco del Giocatore</h3>
        <p>{playerBox?.name}</p>
        <p>N° {playerBox?.number}</p>
      </div>

      <div className="final-center">
        {!showCountdown && !finalMessage && (
          <button className="countdown-button" onClick={startCountdown}>
            ▶️ Avvia Conto alla Rovescia
          </button>
        )}

        {showCountdown && !finalMessage && (
          <CountdownFingers onComplete={evaluateOutcome} />
        )}

        {finalMessage && (
          <div className={`final-message ${finalMessage.type}`}>
            <p>{finalMessage.text}</p>

            <div className="final-actions">
              <button onClick={onRestart}>🔁 Rigioca</button>
              <button
                onClick={() =>
                  window.open("https://github.com/simotibe76/ATGPT/discussions/2", "_blank")
                }
              >
                📝 Lascia un commento (GitHub)
              </button>
              <button
                onClick={() =>
                  window.open("https://docs.google.com/forms/d/e/1FAIpQLSfNfUZFpQonGhTIXbCjpi7ft-Rn8gKAc1NC97Tdl3y7mjwdvw/viewform?usp=dialog", "_blank")
                }
              >
                ✍️ Feedback Anonimo
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="final-box right">
        <h3>Ultimo Pacco Rimasto</h3>
        <p>{remainingBox?.name}</p>
        <p>N° {remainingBox?.number}</p>
      </div>
    </div>
  );
}
