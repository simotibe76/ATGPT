import React from "react";
import { motion } from "framer-motion";
import { PhoneIncoming, PhoneOff } from "lucide-react";
import "../styles.css";

const DoctorCall = ({ onAnswer, onDecline }) => {
  return (
    <motion.div
      className="doctor-call-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="doctor-call-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Chiamata dal Dottore...</h2>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          style={{ margin: "20px 0" }}
        >
          <PhoneIncoming size={64} color="#041633" />
        </motion.div>
        <div className="dialog-buttons">
          <button
            onClick={onAnswer}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Rispondi
          </button>
          <button
            onClick={onDecline}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Rifiuta
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorCall;

