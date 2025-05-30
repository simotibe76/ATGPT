import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GameEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    acceptedOffer,
    playerBoxValue,
    showSimulation = false
  } = location.state || {};

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (acceptedOffer !== null && acceptedOffer !== undefined) {
      if (acceptedOffer > playerBoxValue) {
        setMessage(`Hai fatto benissimo! Hai accettato ${acceptedOffer}€ e nel tuo pacco c'erano solo ${playerBoxValue}€.`);
      } else if (acceptedOffer < playerBoxValue) {
        setMessage(`Peccato! Hai accettato ${acceptedOffer}€, ma nel tuo pacco c'erano ben ${playerBoxValue}€.`);
      } else {
        setMessage(`Hai pareggiato! Hai accettato ${acceptedOffer}€, proprio il valore del tuo pacco.`);
      }
    } else {
      setMessage(`Nel tuo pacco c'erano ${playerBoxValue}€.`);
    }
  }, [acceptedOffer, playerBoxValue]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>FINE PARTITA</h2>
        <p>{message}</p>

        {showSimulation && (
          <p style={{ fontStyle: 'italic' }}>
            (Hai scelto di simulare il resto della partita, ma la tua vincita finale rimane {acceptedOffer}€.)
          </p>
        )}

        <button onClick={() => navigate('/')}>Torna alla Home</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'center',
    maxWidth: '500px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  }
};

export default GameEnd;

