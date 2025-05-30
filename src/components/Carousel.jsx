import React, { useState, useEffect } from "react";
import "../styles/Carousel.css";

export default function Carousel({ mapping = [], onSelect }) {
  const totalBoxes = 20;
  const radius = 200;
  const regionRadius = 270;

  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);

  const playerRegion = mapping.find((m) => m.isPlayer)?.name;
  const regionMap = Object.fromEntries(mapping.map((m) => [m.name, m.number]));

  const handleBoxClick = (i) => {
    if (selectedBoxIndex !== null || usedIndices.includes(i)) return;

    const clickedRegion = mapping[i]?.name;
    setSelectedBoxIndex(i);
    setCurrentRegion(clickedRegion);

    setTimeout(() => {
      setDisplayNumber(regionMap[clickedRegion]);
      setTimeout(() => {
        setUsedIndices((prev) => [...prev, i]);
        setSelectedBoxIndex(null);
        setDisplayNumber(null);
        // Qui poi triggeri GameBoard o la sequenza successiva
        // onSelect();
      }, 1500);
    }, 700);
  };

  return (
    <div className="carousel-wrapper">
      <h1>Scegli un pacco</h1>
      <div className="carousel-container">
        {/* BOX REGIONI disposte in cerchio */}
        {mapping.map((region, i) => {
          const angle = (360 / totalBoxes) * i;
          const angleRad = (angle * Math.PI) / 180;
          const x = regionRadius * Math.cos(angleRad);
          const y = regionRadius * Math.sin(angleRad);

          return (
            <div
              key={`label-${i}`}
              className={`region-label ${region.isPlayer ? "player" : ""}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              {region.name}
            </div>
          );
        })}

        {/* DISC che ruota i pacchi */}
        <div className="carousel-disc">
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
                className={`carousel-box ${isFlying ? "selected" : ""}`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleBoxClick(i)}
              >
                {isFlying && displayNumber ? displayNumber : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
