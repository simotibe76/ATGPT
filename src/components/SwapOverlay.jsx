// src/components/SwapOverlay.jsx
import React from "react";
import "../styles/SwapOverlay.css";

export default function SwapOverlay({ boxes, onSwap }) {
  return (
    <div className="swap-overlay">
      <div className="swap-box">
        <h2>🔄 Scegli il pacco con cui vuoi fare il cambio</h2>
        <div className="swap-grid">
          {boxes.map(b => (
            <div
              key={b.number}
              className="swap-option"
              onClick={() => onSwap(b.number)}
            >
              <p>{b.name}</p>
              <p>Pacco N° {b.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
