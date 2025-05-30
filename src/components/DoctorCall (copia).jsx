// /src/components/DoctorCall.js
import React, { useEffect, useRef } from "react";

const DoctorCall = ({ onAccept, onDecline }) => {
  const audioRef = useRef(null);

  // Avvia la suoneria quando il popup appare
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  // Interrompe il suono quando il giocatore risponde o rifiuta
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="doctor-call-overlay">
      <div className="doctor-call-box">
        <div className="doctor-call-header">
          <h2>📞 Chiamata in arrivo...</h2>
          <p>Il Dottore sta chiamando!</p>
        </div>

        <div className="doctor-avatar">
          <img src="/images/doctor-avatar.png" alt="Il Dottore" />
        </div>

        <div className="call-buttons">
          <button className="accept" onClick={() => { stopAudio(); onAccept(); }}>
            🟢 Rispondi
          </button>
          <button className="decline" onClick={() => { stopAudio(); onDecline(); }}>
            🔴 Rifiuta
          </button>
        </div>

        {/* Audio della chiamata */}
        <audio ref={audioRef} src="/sounds/doctor-call.mp3" loop />
      </div>
    </div>
  );
};

export default DoctorCall;