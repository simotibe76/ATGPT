const DoctorGPT = {
  // 💰 Calcolo offerta monetaria
  calculateOffer(remainingValues, playerBoxValue, round, aiTrend = false) {
    const average = remainingValues.reduce((sum, val) => sum + val, 0) / remainingValues.length;
    const modifier = Math.min(1, 0.25 + round * 0.05);
    const adjustedAvg = aiTrend
      ? (average + playerBoxValue * 0.5) / 1.5
      : average;
    return Math.round((adjustedAvg * modifier) / 500) * 500;
  },

  // 🔁 Logica avanzata: offerta o cambio pacco
  generateDoctorOffer(unopenedBoxes, playerBoxValue, round, refusedOffersCount = 0) {
    const remainingValues = unopenedBoxes.map(b => b.prize);
    const offerAmount = this.calculateOffer(remainingValues, playerBoxValue, round, true);
    const average = remainingValues.reduce((sum, val) => sum + val, 0) / remainingValues.length;
    const highValues = remainingValues.filter(val => val >= 150000);
    const disproportion = playerBoxValue >= average * 1.7;

    const shouldSwap =
      round >= 5 &&
      unopenedBoxes.length <= 12 &&
      (playerBoxValue >= 50000 || disproportion || refusedOffersCount >= 2) &&
      highValues.length >= 2;

    // 🔍 DEBUG
    console.log("[SWAP CHECK] Player box:", playerBoxValue);
    console.log("[SWAP CHECK] Round:", round);
    console.log("[SWAP CHECK] Unopened:", unopenedBoxes.length);
    console.log("[SWAP CHECK] High value count:", highValues.length);
    console.log("[SWAP CHECK] Refused offers:", refusedOffersCount);
    console.log("[SWAP CHECK] ShouldSwap:", shouldSwap);

    if (shouldSwap) {
      return {
        type: "swap",
        message: `🤔 Ti propongo un cambio pacco... Sei proprio sicuro del tuo?`
      };
    }

    return {
      type: "money",
      amount: offerAmount,
      message: this.generateMessage(offerAmount),
    };
  },

  // 🗣️ Messaggi del Dottore in base all'offerta
  generateMessage(offer) {
    const low = [
      `Dai, non rischiare tutto per pochi spicci... accetta.`,
      `Ti conviene chiuderla qua... prendi e porta a casa.`,
      `Non sarà molto, ma è sicuro.`,
    ];
    const medium = [
      `Una proposta onesta... a te la scelta.`,
      `Ci sono ancora pacchi pesanti... ma non è male.`,
      `Pensa a cosa potresti farci con ${offer.toLocaleString()}€...`,
    ];
    const high = [
      `Non sottovalutare questa cifra! Sei pronto a rischiare tutto?`,
      `Con questi compri sogni veri. Rischieresti tutto?`,
      `Questa è un'offerta importante. Pensa bene.`,
    ];
    const veryHigh = [
      `Ecco il mio massimo: ${offer.toLocaleString()}€. Che ne dici?`,
      `Il pubblico trattiene il fiato... è tutto nelle tue mani.`,
      `Prendi ${offer.toLocaleString()}€ e chiudiamo qui. Affare fatto?`,
    ];

    if (offer < 1000) return low[Math.floor(Math.random() * low.length)];
    if (offer < 25000) return medium[Math.floor(Math.random() * medium.length)];
    if (offer < 80000) return high[Math.floor(Math.random() * high.length)];
    return veryHigh[Math.floor(Math.random() * veryHigh.length)];
  }
};

export default DoctorGPT;
