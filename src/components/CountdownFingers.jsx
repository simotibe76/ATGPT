import React, { useEffect, useState } from "react";
import one from "../assets/fingers/1.jpeg";
import two from "../assets/fingers/2.jpeg";
import three from "../assets/fingers/3.jpeg";
import "../styles/CountdownFingers.css";

const CountdownFingers = ({ onComplete }) => {
  const [step, setStep] = useState(3); // Inizia da 3

  useEffect(() => {
    if (step > 1) {
      const timer = setTimeout(() => setStep(step - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const final = setTimeout(() => {
        onComplete(); // Dopo 1 secondo da "1", chiama il callback
      }, 1000);
      return () => clearTimeout(final);
    }
  }, [step, onComplete]);

  const getImage = () => {
    switch (step) {
      case 3: return three;
      case 2: return two;
      case 1: return one;
      default: return null;
    }
  };

  return (
    <div className="countdown-fingers">
      {getImage() && <img src={getImage()} alt={`Conto alla rovescia ${step}`} />}
    </div>
  );
};

export default CountdownFingers;
