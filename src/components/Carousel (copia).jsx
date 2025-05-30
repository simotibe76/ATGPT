import React, { useState, useEffect } from "react";
import "../styles/Carousel.css";

export default function Carousel({ mapping = [], onSelect }) {
  const totalBoxes = 20;
  const radius = 240;
const [selectedAngle, setSelectedAngle] = useState(0);

  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);
  const [regionQueue, setRegionQueue] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [playerBoxIndex, setPlayerBoxIndex] = useState(null);
  const [sequenceStarted, setSequenceStarted] = useState(false);

  const playerRegion = mapping.find((m) => m.isPlayer)?.name;
  const regionMap = Object.fromEntries(mapping.map((m) => [m.name, m.number]));

  useEffect(() => {
    console.log("✅ Carousel loaded");
    console.log("🧠 Mapping:", mapping);
    console.log("🎯 PlayerRegion:", playerRegion);
  }, [mapping, playerRegion]);

  const handleBoxClick = (index) => {
    if (selectedBoxIndex !== null) return;
setSelectedAngle((360 / totalBoxes) * index);

    setPlayerBoxIndex(index);
    setSelectedBoxIndex(index);
    setCurrentRegion(playerRegion);

    setTimeout(() => {
      setDisplayNumber(regionMap[playerRegion]);
      setTimeout(() => {
        setUsedIndices((prev) => [...prev, index]);
        setDisplayNumber(null);
        setSelectedBoxIndex(null);
        startRegionSequence();
      }, 1500);
    }, 700);
  };

  const startRegionSequence = () => {
    const others = mapping.filter((m) => !m.isPlayer).map((m) => m.name);
    setRegionQueue(others);
    setSequenceStarted(true);
  };

  useEffect(() => {
    if (!sequenceStarted || regionQueue.length === 0) {
      if (sequenceStarted && regionQueue.length === 0) {
        console.log("✅ Sequenza completata.");
        setTimeout(() => onSelect(), 1000);
      }
      return;
    }

    const available = Array.from({ length: totalBoxes }, (_, i) => i).filter(
      (i) => !usedIndices.includes(i)
    );

    if (available.length === 0) {
      console.log("✅ Tutti i pacchi usati.");
      setTimeout(() => onSelect(), 1000);
      return;
    }

    const nextRegion = regionQueue[0];
    const nextBoxIndex = available[0];

    setTimeout(() => {
      setSelectedBoxIndex(nextBoxIndex);
      setCurrentRegion(nextRegion);

      setTimeout(() => {
        setDisplayNumber(regionMap[nextRegion]);

        setTimeout(() => {
          setUsedIndices((prev) => [...prev, nextBoxIndex]);
          setDisplayNumber(null);
          setSelectedBoxIndex(null);
          setRegionQueue((prev) => prev.slice(1));
        }, 500);
      }, 500);
    }, 500);
  }, [sequenceStarted, regionQueue, usedIndices]);

  return (

    <div className="carousel-wrapper">

      <h1>Scegli un pacco</h1>
      <div className="carousel-container">


        <div className="carousel-disc rotate">
          {Array.from({ length: totalBoxes }).map((_, i) => {
            if (usedIndices.includes(i)) return null;

            const angleDeg = i * (360 / totalBoxes);
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);
            const isFlying = i === selectedBoxIndex;

            return (
 <div
  key={i}
className={`carousel-box ${isFlying ? "selected fly-in" : ""}`}

  onClick={() => handleBoxClick(i)}
style={{
  left: `calc(50% + ${x}px)`,
  top: `calc(50% + ${y}px)`,
transform: isFlying
  ? `translate(-50%, -50%) rotate(${selectedAngle}deg)`
  : `translate(-50%, -50%) rotate(${angleDeg}deg)`

}}

>
  {isFlying && displayNumber ? displayNumber : ""}
</div>


            );
          })}
        </div>
                <div className="region-display">
          {currentRegion || playerRegion || "Regione"}
        </div>
      </div>
    </div>
  );
}
