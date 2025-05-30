import React from "react";

const Carousel = () => {
  const total = 20;
  const radius = 150;

  const circleStyle = {
    position: "relative",
    width: "400px",
    height: "400px",
    margin: "auto",
    backgroundColor: "#e0f7ff",
    borderRadius: "50%",
    overflow: "hidden"
  };

  const rotatingDiscStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    transform: "translate(-50%, -50%) rotate(0deg)",
    transformOrigin: "center center"
  };

  const centerCrossStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "2px",
    height: "100%",
    backgroundColor: "red",
    transform: "translate(-50%, -50%)"
  };

  const horizontalCrossStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "2px",
    backgroundColor: "red",
    transform: "translate(-50%, -50%)"
  };

  const centerDotStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)"
  };

  return (
    <div style={circleStyle}>
      {/* Croce rossa */}
      <div style={centerCrossStyle}></div>
      <div style={horizontalCrossStyle}></div>
      <div style={centerDotStyle}></div>

      {/* Disco rotante */}
      <div style={rotatingDiscStyle}>
        {Array.from({ length: total }).map((_, i) => {
          const angle = (360 / total) * i;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "30px",
                height: "30px",
                backgroundColor: "blue",
                borderRadius: "50%",
                color: "white",
                textAlign: "center",
                lineHeight: "30px",
                fontSize: "14px",
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                transformOrigin: "center"
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
