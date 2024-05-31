import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import './QRscanner.css';

function QRscanner() {
    const [scannedText, setScannedText] = useState('');
  
    const handleScan = (result) => {
        console.log(result); // Verifica que result contenga el texto escaneado
        setScannedText(result[0]?.rawValue);
      };
      
  
    return (
      <div className="scanner-container">
        <Scanner onScan={handleScan} />
        <p>Texto escaneado: {scannedText}</p>
      </div>
    );
  }
  
  export default QRscanner;