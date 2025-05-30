import React, { useState } from "react";
import regionsList from "../data/regions"; // Assicurati che sia un array con nomi di regioni
import prizeValues from "../data/prizes"; // Lista dei premi

const generateMapping = () => {
  const shuffledNumbers = Array.from({ length: 20 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  const shuffledPrizes = [...prizeValues].sort(() => Math.random() - 0.5);
  
  return regionsList.reduce((acc, region, index) => {
    acc[region.name] = { number: shuffledNumbers[index], prize: shuffledPrizes[index] };
    return acc;
  }, {});
};


const RegionBox = ({ onMappingGenerated }) => {
  const [mapping, setMapping] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (regionName) => {
 //console.log("🔍 handleRegionSelect chiamato con:", regionName); // TEST
    const generatedMapping = generateMapping();
    setMapping(generatedMapping);
    setSelectedRegion(regionName);

    if (onMappingGenerated) {
      onMappingGenerated({ mapping: generatedMapping, selectedRegion: regionName });
    }
  };

  return (
    <div className="region-box">
      {selectedRegion ? (
        <>
          <h2>Hai selezionato: {selectedRegion}</h2>
          {mapping[selectedRegion] && (
            <p>Il tuo pacco ha il numero: {mapping[selectedRegion].number} e il premio: {mapping[selectedRegion].prize}€</p>
          )}
          <p>Clicca per continuare...</p>
        </>
      ) : (
        <>
          <h2>Seleziona la tua regione:</h2>
          {regionsList.map((region, index) => (
            <button key={index} onClick={() => handleRegionSelect(region.name)}>
              {region.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default RegionBox;

