import React, { useState } from "react";

const BankerPanel = ({ onMakeOffer }) => {
    const [offer, setOffer] = useState(0);

    const generateOffer = () => {
        const randomOffer = Math.floor(Math.random() * 150000) + 1000;
        setOffer(randomOffer);
        onMakeOffer(randomOffer);
    };

    return (
        <div className="banker-panel">
            <button onClick={generateOffer}>📞 Chiama il Dottore</button>
            {offer > 0 && <p>Offerta: {offer}€</p>}
        </div>
    );
};

export default BankerPanel;

