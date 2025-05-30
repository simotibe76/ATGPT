import React, { useState } from "react";
import regionsList from "../data/regions"; // Lista delle regioni
import prizeValues from "../data/prizes"; // Lista dei premi predefiniti

console.log("🔍 StartScreen.js caricato!"); // Debug caricamento

const StartScreen = ({ onMappingGenerated }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapping, setMapping] = useState(null);
  const [gameMode, setGameMode] = useState(null); // Stato per la modalità scelta

  console.log("🔍 Rendering StartScreen - Regione:", selectedRegion, " - Modalità:", gameMode);

  const handleRegionSelect = (regionName) => {
    console.log("🔍 handleRegionSelect chiamato con:", regionName);

    // Generazione casuale dei numeri dei pacchi
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    console.log("🔍 Numeri generati per i pacchi:", numbers);

    // Mescoliamo i premi disponibili
    const shuffledPrizes = [...prizeValues].sort(() => Math.random() - 0.5);
    console.log("🔍 Premi mescolati:", shuffledPrizes);

    // Creazione della mappatura
    const generatedMapping = {};
    regionsList.forEach((region, index) => {
      generatedMapping[region.name] = {
        number: numbers[index],
        prize: shuffledPrizes[index],
        name: region.name,
      };
      console.log(`✅ Assegnazione - ${region.name}: Pacco ${numbers[index]}, Premio ${shuffledPrizes[index]}€`);
    });

    console.log("✅ Mappatura completa:", JSON.stringify(generatedMapping, null, 2));

    setMapping(generatedMapping);
    setSelectedRegion(regionName);
  };

  // Funzione per selezionare il game mode
  const handleGameModeSelect = (mode) => {
    console.log("🔹 Modalità scelta:", mode);
    setGameMode(mode);

    if (onMappingGenerated && selectedRegion && mapping) {
      console.log("🔹 Passaggio a componente padre con modalità:", mode);
      onMappingGenerated({ mapping, selectedRegion, gameMode: mode });
    }
  };

  return (
    <div className="start-screen">
      {!selectedRegion ? (
        <>
          <h2>Seleziona la tua regione:</h2>
          <div className="region-selection">
            {regionsList.map((region, index) => (
              <button 
                key={index} 
                className="start-button"
                onClick={() => handleRegionSelect(region.name)}
              >
                {region.name}
              </button>
            ))}
          </div>
        </>
      ) : !gameMode ? (
        <>
          <div className="region-summary">
            <h2>Hai selezionato: {selectedRegion}</h2>
            <p>Ora scegli la modalità di gioco:</p>
          </div>
          
          <div className="mode-selection">
            <button 
              className="start-button" 
              onClick={() => handleGameModeSelect("random")}
            >
              🎲 Modalità Random
            </button>
            <button 
              className="start-button" 
              onClick={() => handleGameModeSelect("ai")}
            >
              🧠 Modalità AI Trend
            </button>
          </div>
        </>
      ) : (
        <p>✅ Modalità "{gameMode}" selezionata! Caricamento del gioco...</p>
      )}
    </div>
  );
};

export default StartScreen;
