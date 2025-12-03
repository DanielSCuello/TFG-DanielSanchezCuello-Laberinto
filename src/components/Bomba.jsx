import { useState ,useContext } from "react";
import Modulo from "./Modulo.jsx";
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/Bomba.css';

function Bomba({ onKeypadSolved, time }) {
  const { escapp, appSettings, Utils} = useContext(GlobalContext);
  const [reinicio, setReinicio] = useState(false);
  const [descubierto, setDescubierto] = useState(false);

  const reiniciarBomba = () => {
    setReinicio(true);
    setTimeout(() => setReinicio(false), 100);
  };

  const handleZonaClick = (e) => {
    setDescubierto(false);
  };

  return (
    <div className={descubierto ? "bomba-modulo" : (appSettings.background === "" ? "bomba-principal-background" : "bomba-principal")}>
      {descubierto && (
        <>
          <div className="bomba-modulo-back-izq"  onClick={handleZonaClick}/>
          <div className="bomba-modulo-back-der"onClick={handleZonaClick}/>
        </>
      )}
       <Modulo reinicio={reinicio} setReinicio={setReinicio} descubierto={descubierto} setDescubierto={setDescubierto} onKeypadSolved={onKeypadSolved} time={time}/>
      <div className={descubierto ? "button-container-modulo" : "button-container-principal"}>
        <div className="button-modulo" onClick={reiniciarBomba}></div>
      </div>
    </div>
  );
}

export default Bomba;
