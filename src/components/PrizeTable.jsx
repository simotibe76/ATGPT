import React from "react";
import { prizes } from "../data/prizes";


const PrizeTable = () => {
    return (
        <div className="prize-table">
            <div className="column low-values">
                <h3>💙 Valori Bassi</h3>
                {prizes.filter(p => p.value <= 500).map(p => (
                    <div key={p.id} className="prize-box blue">{p.value}€</div>
                ))}
            </div>
            <div className="column high-values">
                <h3>❤️ Valori Alti</h3>a
                {prizes.filter(p => p.value > 500).map(p => (
                    <div key={p.id} className="prize-box red">{p.value}€</div>
                ))}
            </div>
        </div>
    );
};

export default PrizeTable;

