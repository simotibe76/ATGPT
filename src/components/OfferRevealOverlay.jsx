// src/components/OfferRevealOverlay.jsx
import React, { useEffect, useState } from "react";
import "../styles/OfferRevealOverlay.css";

export default function OfferRevealOverlay({ amount, onAccept, onRefuse }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    const padded = amount.toString().padStart(6, " ").split("");
    padded.reverse().forEach((digit, index) => {
      setTimeout(() => {
        setDigits((prev) => {
          const copy = [...prev];
          copy[5 - index] = digit;
          return copy;
        });
      }, index * 700);
    });
  }, [amount]);

  return (
    <div className="offer-reveal-overlay">
      <div className="offer-box">
        <h2>✉️ Offerta del Dottore</h2>
        <div className="digit-row">
          {digits.map((d, i) => (
            <div key={i} className="digit-box">
              {d}
            </div>
          ))}
        </div>
        <div className="offer-buttons">
          <button onClick={onAccept}>✅ Accetta</button>
          <button onClick={onRefuse}>❌ Rifiuta</button>
        </div>
      </div>
    </div>
  );
}
