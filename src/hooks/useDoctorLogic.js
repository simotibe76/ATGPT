// src/hooks/useDoctorLogic.js
import { useCallback } from "react";
import DoctorGPT from "../utils/DoctorGPT";

export default function useDoctorLogic({
  localMapping,
  currentPlayerBox,
  openedBoxes,
  setCurrentOffer,
  setShowDoctorOffer,
  setGameEnd,
  setOfferAccepted,
  setShowDoctorCall   // ← riceviamo anche questo
}) {
  const handleDoctorResponse = useCallback((accepted) => {
    console.log("[useDoctorLogic] handleDoctorResponse accepted:", accepted);

    // **Chiudiamo sempre l'overlay della chiamata**
    setShowDoctorCall(false);

    if (!accepted) {
      // Se rifiuta, esci e lascia il gioco libero di proseguire
      return;
    }

    // Se accetta, generiamo l'offerta con DoctorGPT
    const unopenedValues = localMapping
      .filter(r => !openedBoxes.includes(r.number))
      .map(r => r.prize);

    const amount  = DoctorGPT.calculateOffer(unopenedValues, currentPlayerBox, openedBoxes.length);
    const message = DoctorGPT.generateMessage(amount);

    console.log("[useDoctorLogic] offerta generata:", { amount, message });

    setCurrentOffer({ type: "money", amount, message });
    setShowDoctorOffer(true);
    setOfferAccepted(false); // resetto in preparazione overlay successivo
  }, [
    localMapping,
    currentPlayerBox,
    openedBoxes,
    setCurrentOffer,
    setShowDoctorOffer,
    setShowDoctorCall,
    setOfferAccepted
  ]);

  return { handleDoctorResponse };
}

