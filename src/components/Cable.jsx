import { useState, useEffect } from "react";
import './../assets/scss/Cables.css';

function Cable({ color, cortado, onCortar }) {
  const [girado, setGirado] = useState(false);

  useEffect(() => {
    const aleatorio = Math.random() < 0.5;
    setGirado(aleatorio);
  }, []);

  return (
    <div className={cortado ? `cable-cor-${color}` : `cable-${color}`} onClick={!cortado ? onCortar : null} style={{  transform: girado ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", }}
    ></div>
  );
}

export default Cable;
