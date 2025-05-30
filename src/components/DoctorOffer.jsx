// src/components/DoctorOffer.jsx
import React from "react";
import "../styles/DoctorOffer.css";

export default function DoctorOffer({ offer, simulate, onAccept, onRefuse }) {
  if (!offer) return null;

  // message: se simulate, testo asciutto; altrimenti includi anche offer.message
  const displayText = simulate
    ? `A questo punto il Dottore ti avrebbe offerto ${offer.amount.toLocaleString()}€.`
    : `Il Dottore ti offre ${offer.amount.toLocaleString()}€! ${offer.message}`;

  return (
    <div className="doctor-offer-modal">
      <div className="doctor-offer-box">
        <h2 className="doctor-offer-title">💰 Offerta del Dottore!</h2>
        <p className="doctor-offer-message">{displayText}</p>
        <div className="doctor-offer-buttons">
          <button className="accept" onClick={onAccept}>
            {simulate
              ? "Continua e scopri il finale"
              : "Accetta e scegli un nuovo pacco"}
          </button>
          <button className="refuse" onClick={onRefuse}>❌ Rifiuta e continua</button>
        </div>
      </div>
    </div>
  );
}

