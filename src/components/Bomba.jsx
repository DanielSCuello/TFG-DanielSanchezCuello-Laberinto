import { useState, useEffect } from "react";
import Modulo from "./Modulo.jsx";
import './../assets/scss/Bomba.css';

function Bomba({ onKeypadSolved }){
  const [reinicio, setReinicio] = useState(false);
  const [descubierto, setDescubierto] = useState(false);
 

  const reiniciarBomba = () => {
    setReinicio(true); 
    setTimeout(() => {
      setReinicio(false); 
    }, 100);
  };
  
  return (
    
    <div className={descubierto ?"bomba-modulo":"bomba-principal"}>
      <Modulo reinicio={reinicio} setReinicio={setReinicio} descubierto={descubierto} setDescubierto={setDescubierto} onKeypadSolved={onKeypadSolved}/>
        <div className={descubierto ?"button-container-modulo":"button-container-principal"}>
          <div className="button-modulo" onClick={reiniciarBomba}></div>
        </div>
      </div>
    );
}

export default Bomba;