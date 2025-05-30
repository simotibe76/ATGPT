// src/components/AcceptedOfferOverlay.jsx
import React from "react";
import "../styles/AcceptedOfferOverlay.css";

export default function AcceptedOfferOverlay({ offer, onRevealBox, onSimulate }) {
  if (!offer) return null;

  return (
    <div className="accepted-offer-overlay">
      <div className="accepted-offer-content">
        <h2>Hai accettato {offer.amount.toLocaleString()}€!</h2>
        <p>Ora puoi scegliere come concludere:</p>
        <div className="accepted-offer-buttons">
          <button onClick={onRevealBox}>Scopri cosa c’era nel tuo pacco</button>
          <button onClick={onSimulate}>Simula la partita fino alla fine</button>
        </div>
      </div>
    </div>
  );
}

