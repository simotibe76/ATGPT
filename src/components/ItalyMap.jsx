import React, { useState } from "react";
import { ReactComponent as ItalySVG } from "../assets/italyHigh.svg";

function ItalyMap({ onRegionClick }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleRegionEvent = (e, action) => {
    const regionName = e.target.getAttribute("title");
    if (regionName) {
      if (action === "click") onRegionClick(regionName);
      if (action === "hover") setHoveredRegion(regionName);
      if (action === "leave") setHoveredRegion(null);
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <ItalySVG
        className="w-full h-auto cursor-pointer"
        onClick={(e) => handleRegionEvent(e, "click")}
        onMouseOver={(e) => handleRegionEvent(e, "hover")}
        onMouseOut={(e) => handleRegionEvent(e, "leave")}
      />
      {hoveredRegion && (
        <div
          className="tooltip"
          style={{ top: tooltipPos.y, left: tooltipPos.x, position: "fixed" }}
        >
          {hoveredRegion}
        </div>
      )}
    </div>
  );
}

export default ItalyMap;

