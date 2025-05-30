import React, { useEffect, useState, useRef } from "react";
import ItalySVG from "../assets/italyHigh.svg?react";
import "../styles/LuckyRegionScreen.css";
import LuckyRegionEnd from "./LuckyRegionEnd";

const regionList = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
  "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
];

export default function LuckyRegionScreen({ onRegionSelect }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [firstFail, setFirstFail] = useState(false);
  const [secondTry, setSecondTry] = useState(false);
  const [secondChoice, setSecondChoice] = useState(null);
  const [eliminatedRegions, setEliminatedRegions] = useState([]);
  const winnerRef = useRef(null);
  const mapRef = useRef(null);

  const startSecondTry = () => {
    setFirstFail(false);
    setSecondTry(true);
  };

  useEffect(() => {
    if (!winnerRef.current) {
      const randomRegion = regionList[Math.floor(Math.random() * regionList.length)];
      winnerRef.current = randomRegion;
      console.log("🎯 REGIONE FORTUNATA:", randomRegion);
    }
  }, []);

  useEffect(() => {
    if (firstFail || secondTry) return;
    const interval = setInterval(() => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll("path[title]");
      const idx = Math.floor(Math.random() * paths.length);
      const target = paths[idx];
      if (!target) return;
      target.classList.add("freaky");
      setTimeout(() => target.classList.remove("freaky"), 2000);
    }, 1200);
    return () => clearInterval(interval);
  }, [firstFail, secondTry]);

  useEffect(() => {
    if (!secondTry || eliminatedRegions.length > 0) return;
    const pool = regionList.filter(r => r !== winnerRef.current);
    const pick = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    pick.forEach((region, i) => {
      setTimeout(() => setEliminatedRegions(prev => [...prev, region]), 1000 * i);
    });
  }, [secondTry, eliminatedRegions]);

  const handleMouseOver = e => {
    const title = e.target.getAttribute("title");
    if (title) setHoveredRegion(title);
  };
  const handleMouseOut = () => setHoveredRegion(null);

  const handleClick = e => {
    const title = e.target.getAttribute("title");
    if (!title) return;

    if (!playerChoice) {
      setPlayerChoice(title);
      if (title === winnerRef.current) {
        setTimeout(() => setSecondChoice("WIN100K"), 300);
      } else {
        setTimeout(() => setFirstFail(true), 300);
      }
    } else if (secondTry && !secondChoice && !eliminatedRegions.includes(title)) {
      setSecondChoice(title);
    }
  };

  if (firstFail) {
    return (
      <div className="lucky-region-retry">
        <h2>😢 Mi dispiace, non era quella!</h2>
        <p>Vuoi riprovare per 50.000€?</p>
        <button onClick={startSecondTry}>
          Riprova per 50.000€
        </button>
      </div>
    );
  }

  if (secondChoice === "WIN100K") {
    return (
      <LuckyRegionEnd
        isWin={true}
        winningRegion={winnerRef.current}
        selectedRegion={playerChoice}
        amount={100000}
        onRestart={() => window.location.reload()}
      />
    );
  }

  if (secondChoice) {
    const win = secondChoice === winnerRef.current;
    const prize = win ? 50000 : 0;
    return (
      <LuckyRegionEnd
        isWin={win}
        winningRegion={winnerRef.current}
        selectedRegion={secondChoice}
        amount={prize}
        onRestart={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="lucky-region-container">
      <h2>Seleziona la tua Regione Fortunata</h2>
      <div
        className="map-wrapper"
        ref={mapRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <ItalySVG className="w-full h-auto cursor-pointer" />
        <style>{`
          ${eliminatedRegions
            .map(region => `#${region.replace(/\s/g, "")} { fill: #a8325a !important; pointer-events: none; }`)
            .join("\n")}
        `}</style>
      </div>
      {hoveredRegion && <div className="hover-label">{hoveredRegion}</div>}
    </div>
  );
}
