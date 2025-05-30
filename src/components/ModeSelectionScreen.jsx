import React from "react";
import "../styles/ModeSelectionScreen.css";

export default function ModeSelectionScreen({ selectedRegion, onSelectMode }) {
  if (!selectedRegion) return <div>Errore: Regione non selezionata.</div>;

  return (
    <div className="mode-selection-container">
      <h2>Hai scelto: <span className="region">{selectedRegion}</span></h2>
      <p>Seleziona una modalità di gioco:</p>
      <div className="mode-buttons">
        <button onClick={() => onSelectMode("random")} className="random-mode">
          🎲 Random Mode
        </button>
        <button onClick={() => onSelectMode("ai")} className="ai-mode">
          🤖 AI Trend Mode
        </button>
      </div>
    </div>
  );
}

