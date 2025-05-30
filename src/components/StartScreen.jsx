import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItalySVG from '../assets/italyHigh.svg?react';
import regionList from '../data/regions';
import prizeList from '../data/prizes';
import '../styles/StartScreen.css';

export default function StartScreen({ onMappingGenerated }) {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const mapRef = useRef(null);

  // Shuffle helper
  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  // Effetto psichedelico
  useEffect(() => {
    const interval = setInterval(() => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll('path[title]');
      const randomIndex = Math.floor(Math.random() * paths.length);
      const target = paths[randomIndex];
      if (!target) return;

      target.classList.add('freaky');
      setTimeout(() => {
        target.classList.remove('freaky');
      }, 2000);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleMouseOver = (e) => {
    const title = e.target.getAttribute('title');
    if (title) setHoveredRegion(title);
  };

  const handleMouseOut = () => setHoveredRegion(null);

  const handleClick = (e) => {
    const regionName = e.target.getAttribute('title');
    if (!regionName) return;

    const shuffledRegions = shuffle([...regionList]);
    const shuffledNumbers = shuffle([...Array(20)].map((_, i) => i + 1));
    const shuffledPrizes = shuffle([...prizeList]);

    const mapping = shuffledRegions.map((r, i) => {
      const region = typeof r === 'string' ? r : r.name;
      return {
        name: region,
        number: shuffledNumbers[i],
        prize: shuffledPrizes[i],
        isPlayer: region.toLowerCase() === regionName.toLowerCase(),
      };
    });

    console.log('✅ Navigazione interna: mappatura generata', {
      selectedRegion: regionName,
      mapping,
    });

    onMappingGenerated({ selectedRegion: regionName, mapping });
  };

  return (
    <div className="start-screen">
      <h1 className="start-title">🧭 Seleziona la tua Regione per iniziare!</h1>

      <div className="hover-label">
        {hoveredRegion || 'Passa sopra una regione...'}
      </div>

      <div
        className="map-wrapper"
        ref={mapRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <ItalySVG className="w-full h-auto cursor-pointer" />
      </div>
    </div>
  );
}
