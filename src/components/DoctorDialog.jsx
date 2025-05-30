import React from "react";

const DoctorDialog = ({ dialogType, offerType, offerAmount, availableBoxes, onAccept, onDecline }) => {
  return (
    <div className="doctor-dialog-overlay">
      <div className="doctor-dialog-box">
        <h2>📞 Il Dottore ti chiama!</h2>

        {dialogType === "call" && (
          <>
            <p>Il Dottore ha una proposta per te...</p>
            <div className="dialog-buttons">
              <button className="accept" onClick={() => onAccept("offer")}>✅ Accetta</button>
              <button className="decline" onClick={onDecline}>❌ Rifiuta</button>
            </div>
          </>
        )}

        {dialogType === "offer" && offerType === "money" && (
          <>
            <p>Il Dottore ti offre <strong>{offerAmount}€</strong> per il tuo pacco.</p>
            <div className="dialog-buttons">
              <button className="accept" onClick={() => onAccept(null)}>✅ Accetta</button>
              <button className="decline" onClick={onDecline}>❌ Rifiuta</button>
            </div>
          </>
        )}

        {dialogType === "offer" && offerType === "switch" && (
          <>
            <p>Il Dottore ti offre la possibilità di **cambiare il tuo pacco** con uno dei seguenti:</p>
            <ul>
              {availableBoxes.map(box => (
                <li key={box.number} onClick={() => onAccept(box.number)} className="box-choice">
                  Pacco N° {box.number} - {box.name}
                </li>
              ))}
            </ul>
            <div className="dialog-buttons">
              <button className="decline" onClick={onDecline}>❌ Rifiuta</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorDialog;

