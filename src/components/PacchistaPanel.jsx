import React from "react";

const PacchistaPanel = ({ onAcceptOffer, onChangeBox }) => {
    return (
        <div className="pacchista-panel">
            <button onClick={onAcceptOffer}>Accetta Offerta 💰</button>
            <button onClick={onChangeBox}>Cambia Pacco 🔄</button>
        </div>
    );
};

export default PacchistaPanel;

