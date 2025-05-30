// ✅ FILE 3/3
// src/components/OfferOverlay.jsx

import React from "react";
import "../styles/DoctorOffer.css";

export default function OfferOverlay({ offer, onAccept, onRefuse, isSimulating = false, isSwapping = false, availableBoxes = [] }) {
  if (!offer) return null;

  const handleSwapSelection = (number) => {
    onAccept(number);
  };

  return (
    <div className="doctor-offer-modal">
      <div className="doctor-offer-box">
        <h2 className="doctor-offer-title">
          {offer.type === "swap" ? "🔄 Proposta di Cambio Pacco" : "💰 Offerta del Dottore"}
        </h2>
        <p className="doctor-offer-message">{offer.message}</p>

        {isSwapping ? (
          <div className="swap-selection">
            <p>Scegli un pacco con cui fare il cambio:</p>
            <div className="swap-box-grid">
              {availableBoxes.map(b => (
                <button key={b.number} onClick={() => handleSwapSelection(b.number)}>
                  Pacco N° {b.number}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="doctor-offer-buttons">
            {isSimulating ? (
              <button className="refuse" onClick={onRefuse}>
                👉 Prosegui la simulazione
              </button>
            ) : (
              <>
                <button className="accept" onClick={onAccept}>
                  ✅ Accetta {offer.amount?.toLocaleString()}€
                </button>
                <button className="refuse" onClick={onRefuse}>
                  ❌ Rifiuta e continua
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
