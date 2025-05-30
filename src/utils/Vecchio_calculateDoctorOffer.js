/**
 * CalculateDoctorOffer.js
 *
 * Questo modulo gestisce le diverse logiche per le offerte del Dottore.
 *
 * Sono implementate tre tipologie di offerta:
 * 1. offerTipo1: Offerta monetaria basata sulla media dei premi rimanenti.
 * 2. offerTipo2CambioPacco: Offerta di cambio pacco (disponibile per una scelta semplice, se necessario).
 * 3. offerTipo3Scelta: Offerta tripla – il concorrente può scegliere:
 *    - Accettare l'offerta in denaro (calcolata con offerTipo1 sui box non ancora aperti),
 *    - Cambiare pacco (le opzioni di swap provengono da tutte le regioni, escluso il pacco corrente),
 *    - Rifiutare l'offerta e continuare il gioco.
 *
 * La funzione generica calculateDoctorOffer() per il test restituisce il Tipo 3.
 */

/**
 * offerTipo1
 *
 * Calcola un'offerta monetaria basata sulla media dei premi rimanenti.
 * Applica il 50% alla media e arrotonda ai 500€ più vicini.
 *
 * @param {Array} remainingPrizes - Array degli oggetti premio (dei box non ancora aperti);
 *                                  ciascun oggetto deve avere la proprietà "prize" (Number).
 * @returns {Number} - L'offerta monetaria arrotondata.
 */
export const offerTipo1 = (remainingPrizes) => {
  if (!remainingPrizes || remainingPrizes.length === 0) return 0;

  const validPrizes = remainingPrizes.filter(
    (prize) => typeof prize.prize === "number" && !isNaN(prize.prize)
  );
  const totalValue = validPrizes.reduce((sum, prize) => sum + prize.prize, 0);
  if (validPrizes.length === 0 || isNaN(totalValue)) return 0;

  const expectedValue = totalValue / validPrizes.length;
  let offerValue = expectedValue * 0.5;
  return Math.round(offerValue / 500) * 500;
};

/**
 * offerTipo2CambioPacco
 *
 * Restituisce un'offerta per cambiare pacco prendendo in considerazione tutte le regioni
 * (cioè, il full set) e filtrando solo il pacco attualmente posseduto.
 *
 * @param {Array} fullRegions - Array completo degli oggetti regione.
 * @param {Number} currentBoxNumber - Il numero del pacco attualmente assegnato.
 * @returns {Object} - { type: "CambioPacco", message: "...", availableRegions: [...] }
 */
export const offerTipo2CambioPacco = (fullRegions, currentBoxNumber) => {
  const availableRegions = fullRegions.filter(
    (region) => region.number !== currentBoxNumber
  );
  return {
    type: "CambioPacco",
    message: "Il Dottore ti offre la possibilità di cambiare pacco!",
    availableRegions: availableRegions,
  };
};

/**
 * offerTipo3Scelta
 *
 * Propone una scelta tripla:
 * - **Accetta l'offerta in denaro:** L'offerta monetaria viene calcolata utilizzando solamente i box non ancora aperti.
 * - **Cambia pacco:** Le opzioni di swap sono generate dall'intero insieme di regioni, escludendo solo il pacco corrente.
 * - **Rifiuta l’offerta:** Prosegue il gioco.
 *
 * @param {Array} remainingPrizes - Array dei box non ancora aperti (per il calcolo dell'offerta monetaria).
 * @param {Array} allRegions - Array completo degli oggetti regione (per le opzioni di swap).
 * @param {Number} currentBoxNumber - Il numero del pacco attualmente assegnato.
 * @returns {Object} - { type: "SceltaTripla", message: "...", monetaryOffer: <valore>, availableRegions: [...] }
 */
export const offerTipo3Scelta = (remainingPrizes, allRegions, currentBoxNumber) => {
  const monetaryOffer = offerTipo1(remainingPrizes);
  const availableRegions = allRegions.filter(
    (region) => region.number !== currentBoxNumber
  );
  return {
    type: "SceltaTripla",
    message: `Il Dottore ti propone: accetta ${monetaryOffer}€, oppure cambia pacco, oppure rifiuta l’offerta e prosegui.`,
    monetaryOffer,
    availableRegions,
  };
};

/**
 * calculateDoctorOffer
 *
 * Funzione generica per ottenere un'offerta dal Dottore.
 * Per testare il Tipo 3, questa funzione richiede ora tre parametri:
 * - remainingPrizes: array dei box non ancora aperti (per il calcolo dell'offerta in denaro),
 * - allRegions: l'intero array degli oggetti regione (per le opzioni di swap),
 * - currentBoxNumber: il pacco attualmente posseduto.
 *
 * @returns {Object} - L'offerta generata (Tipo 3 per il test corrente).
 */
export const calculateDoctorOffer = (remainingPrizes, allRegions, currentBoxNumber) => {
  return offerTipo3Scelta(remainingPrizes, allRegions, currentBoxNumber);
};

