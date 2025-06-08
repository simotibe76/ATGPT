import React, { useState, useEffect, useMemo } from "react";
import "../styles/GameBoard.css";
import OfferOverlay from "./OfferOverlay";
import OfferRevealOverlay from "./OfferRevealOverlay";
import GameEndOverlay from "./GameEndOverlay";
import FinalClassicScreen from "./FinalClassicScreen";
import LuckyRegionScreen from "./LuckyRegionScreen";
import DoctorGPT from "../utils/DoctorGPT";
import SwapOverlay from "./SwapOverlay";

export default function GameBoard({ selectedRegion, assignedBoxNumber, regionMapping }) {
  const [localMapping, setLocalMapping] = useState(regionMapping);
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [fadingBoxes, setFadingBoxes] = useState([]);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [showDoctorCall, setShowDoctorCall] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [showOfferOverlay, setShowOfferOverlay] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [showClassicFinale, setShowClassicFinale] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [acceptedAmount, setAcceptedAmount] = useState(null);
  const [showRevealOverlay, setShowRevealOverlay] = useState(false);
  const [refusedOffersCount, setRefusedOffersCount] = useState(0);
  const [showSwapOverlay, setShowSwapOverlay] = useState(false);
  const [playerBoxNumber, setPlayerBoxNumber] = useState(assignedBoxNumber);
  const [showLuckyRegion, setShowLuckyRegion] = useState(false);

  const playerBoxValue = useMemo(() => {
    const playerBox = localMapping.find(r => r.number === playerBoxNumber);
    return playerBox ? playerBox.prize : 0;
  }, [localMapping, playerBoxNumber]);

  const handleOpenBox = (region) => {
    if (isOpeningBox || openedBoxes.includes(region.number) || showDoctorCall || gameEnd) return;
    setIsOpeningBox(true);
    const newOpened = [...openedBoxes, region.number];
    setOpenedBoxes(newOpened);

    setTimeout(() => {
      setFadingBoxes(prev => [...prev, region.number]);
      setIsOpeningBox(false);

      const newOpenedCount = newOpened.length;
      const unopenedCount = localMapping.length - newOpenedCount;
      const remainingBoxes = localMapping.filter(r => !newOpened.includes(r.number));

      // 🔥 REGIONE FORTUNATA (REVISIONATA)
      const blueBoxes = remainingBoxes.filter(r => r.prize < 5000);
      const cheapRedBoxes = remainingBoxes.filter(r => r.prize >= 5000 && r.prize <= 75000);
      const isLuckyCondition =
        (blueBoxes.length === 2 || (blueBoxes.length === 1 && cheapRedBoxes.length === 1));

      console.log("🧪 REGIONE FORTUNATA CHECK — Aperte:", newOpenedCount, "Blu:", blueBoxes.length, "RosseSoft:", cheapRedBoxes.length);

const allPrizes = remainingBoxes.map(r => r.prize);
const maxPrizeLeft = Math.max(...allPrizes);

if (
  newOpenedCount >= 16 && // 👉 attiva solo a 4 pacchi dalla fine
  isLuckyCondition &&
  maxPrizeLeft <= 20000 && // 👉 nessun premio alto rimasto
  !showOfferOverlay &&
  !showDoctorCall
) {

        console.log("🎯 Regione Fortunata ATTIVATA!");
        setCurrentOffer({
          type: 'lucky-region',
          message: 'Vuoi tentare l’ultimo tiro o andiamo alla Regione Fortunata?'
        });
        setShowOfferOverlay(true);
        return;
      }

      // 📞 Offerta standard del Dottore
      if (
        unopenedCount !== 2 &&
        (newOpenedCount === 6 || ((newOpenedCount - 6) % 3 === 0 && newOpenedCount > 6)) &&
        !showDoctorCall
      ) {
        setShowDoctorCall(true);
      }

      // 🏁 FINALE CLASSICO
      if (unopenedCount === 2) {
        setTimeout(() => setShowClassicFinale(true), 800);
      }
    }, 800);
  };

  const handleDoctorResponse = (accepted) => {
    setShowDoctorCall(false);
    if (!accepted) return;

    const unopenedBoxes = localMapping.filter(r =>
      !openedBoxes.includes(r.number) && r.number !== playerBoxNumber
    );
    const round = openedBoxes.length;
    const offer = DoctorGPT.generateDoctorOffer(
      unopenedBoxes,
      playerBoxValue,
      round,
      refusedOffersCount
    );
    setCurrentOffer(offer);
    setShowOfferOverlay(true);
  };

  const handleAcceptOffer = () => {
    if (currentOffer.type === 'lucky-region') {
      setShowOfferOverlay(false);
      setShowLuckyRegion(true);
    } else if (currentOffer.type === 'swap') {
      setShowOfferOverlay(false);
      setShowSwapOverlay(true);
    } else {
      setAcceptedAmount(currentOffer.amount);
      setOfferAccepted(true);
      setShowOfferOverlay(false);
      setGameEnd(true);
    }
  };

  const handleRefuseOffer = () => {
    setRefusedOffersCount(prev => prev + 1);
    setShowOfferOverlay(false);
  };

  const handleReveal = () => {
    setShowRevealOverlay(true);
  };

  const handleBoxSwap = (newBoxNumber) => {
    const updated = [...localMapping];
    const i1 = updated.findIndex(r => r.number === playerBoxNumber);
    const i2 = updated.findIndex(r => r.number === newBoxNumber);
    [updated[i1].prize, updated[i2].prize] = [updated[i2].prize, updated[i1].prize];
    [updated[i1].number, updated[i2].number] = [newBoxNumber, playerBoxNumber];
    setPlayerBoxNumber(newBoxNumber);
    setLocalMapping(updated);
    setAcceptedAmount('swap');
    setOfferAccepted(true);
    setShowSwapOverlay(false);
    setGameEnd(false);
  };

  // 👉 Schermata Lucky Region
  if (showLuckyRegion) {
    return <LuckyRegionScreen />;
  }

  return (
    <div className="game-board-container">
      <div className="player-info-banner">
        Regione: {selectedRegion} | Il tuo pacco: N° {playerBoxNumber}
      </div>

      {offerAccepted && acceptedAmount != null && acceptedAmount !== 'swap' && (
        <div className="offer-accepted-message">
          {isSimulating ? (
            <>
              💶 Hai già incassato: {acceptedAmount.toLocaleString()}€<br />
              🤔 Vediamo come sarebbe andata a finire...
            </>
          ) : (
            <>Gioco terminato! Hai accettato: 💶 {acceptedAmount.toLocaleString()}€</>
          )}
        </div>
      )}

      <div className="value-columns">
        <div className="value-column">
          {localMapping.filter(r => r.prize < 5000 && !fadingBoxes.includes(r.number))
            .sort((a, b) => a.prize - b.prize)
            .map(r => (
              <div key={r.number} className="value-box low">{r.prize.toLocaleString()}€</div>
            ))}
        </div>

        <div className="remaining-boxes-grid">
          {localMapping.filter(r => r.number !== playerBoxNumber && !fadingBoxes.includes(r.number))
            .map(region => (
              <div
                key={region.number}
                className={`region-box ${openedBoxes.includes(region.number) ? 'opened fade-out' : ''}`}
                onClick={() => handleOpenBox(region)}
              >
                {!openedBoxes.includes(region.number) ? (
                  <>
                    <p>{region.name}</p>
                    <p>N° {region.number}</p>
                  </>
                ) : (
                  <p className="prize-value">💰 {region.prize.toLocaleString()}€</p>
                )}
              </div>
            ))}
        </div>

        <div className="value-column">
          {localMapping.filter(r => r.prize >= 5000 && !fadingBoxes.includes(r.number))
            .sort((a, b) => a.prize - b.prize)
            .map(r => (
              <div key={r.number} className="value-box high">{r.prize.toLocaleString()}€</div>
            ))}
        </div>
      </div>

      {showRevealOverlay && (
        <div className="reveal-overlay">
          <div className="reveal-box">
            <h2>📦 Il tuo pacco conteneva:</h2>
            <p>💰 {playerBoxValue.toLocaleString()}€</p>
            <button onClick={() => window.location.reload()}>🔁 Rigioca</button>
          </div>
        </div>
      )}

      {showDoctorCall && !gameEnd && (
        <div className="doctor-call-overlay">
          <div className="doctor-call-box">
            <h2>📲 Il Dottore ti sta chiamando!</h2>
            <div className="dialog-buttons">
              <button onClick={() => handleDoctorResponse(true)}>✅ Accetta la chiamata</button>
              <button onClick={() => handleDoctorResponse(false)}>❌ Rifiuta</button>
            </div>
          </div>
        </div>
      )}

{showOfferOverlay && currentOffer && !gameEnd && (
  currentOffer.type === "money" ? (
    <OfferRevealOverlay
      amount={currentOffer.amount}
      onAccept={handleAcceptOffer}
      onRefuse={handleRefuseOffer}
    />
  ) : (
    <OfferOverlay
      offer={currentOffer}
      onAccept={handleAcceptOffer}
      onRefuse={handleRefuseOffer}
      isSimulating={isSimulating}
    />
  )
)}


      {showSwapOverlay && (
        <SwapOverlay
          boxes={localMapping.filter(
            r => !openedBoxes.includes(r.number) && r.number !== playerBoxNumber
          )}
          onSwap={handleBoxSwap}
        />
      )}

      {showClassicFinale && (() => {
        const playerBox = localMapping.find(b => b.number === playerBoxNumber);
        const remainingBox = localMapping.find(
          b => !openedBoxes.includes(b.number) && b.number !== playerBoxNumber
        );

        return (
          <FinalClassicScreen
            playerBox={playerBox}
            remainingBox={remainingBox}
            onRestart={() => window.location.reload()}
          />
        );
      })()}

      {gameEnd && offerAccepted && !showClassicFinale && (
        <GameEndOverlay
          amount={acceptedAmount}
          playerBoxValue={playerBoxValue}
          onReveal={handleReveal}
          onSimulate={() => setIsSimulating(true)}
        />
      )}
    </div>
  );
}
