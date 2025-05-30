import React, { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import Carousel   from "./components/Carousel.jsx";
import GameBoard  from "./components/GameBoard.jsx";
import GameEnd from "./components/GameEnd.jsx";
function App() {
  const [mappingData, setMappingData] = useState({});
  const [gameStage, setGameStage]   = useState("start");
const [finalAmount, setFinalAmount] = useState(null);

  const handleMappingGenerated = (data) => {
    setMappingData(data);
    setGameStage("carousel");
  };

  // → vai direttamente a GameBoard dopo il carosello
  const handleCarouselComplete = () => {
    setGameStage("gameboard");
  };

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen onMappingGenerated={handleMappingGenerated} />
      )}

      {gameStage === "carousel" && mappingData.mapping && (
        <Carousel
          mapping={mappingData.mapping}
          onSelect={handleCarouselComplete}
        />
      )}

{gameStage === "gameboard" && (() => {
  const { selectedRegion, mapping } = mappingData;
  if (!selectedRegion || !Array.isArray(mapping)) return null;
  const playerEntry = mapping.find(m => m.isPlayer);
  if (!playerEntry) return null;
  return (
    <GameBoard
      selectedRegion={selectedRegion}
      assignedBoxNumber={playerEntry.number}
      regionMapping={mapping}
      gameMode="doctorGPT" // 👈 Aggiunto questo!
    />
  );
})()}

    </div>
  );
}

export default App;
