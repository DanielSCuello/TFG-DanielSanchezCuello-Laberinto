import { useEffect, useState , useContext } from "react";
import './../assets/scss/Modulo.css';
import { GlobalContext } from "./GlobalContext";
import Temporizador from "./Temporizador.jsx";
import Cables from "./ModuloCables.jsx";
import Tapa from "./Tapa.jsx" 

function Modulo({reinicio,setReinicio, descubierto,setDescubierto, onKeypadSolved}) {
  const { escapp , Utils} = useContext(GlobalContext);
  const [fallado,setFallado] = useState(false);
  const [resuelto,setResuelto] = useState(false);
  const [solucion, setSolucion] = useState([]);

  useEffect(() => {
    setResuelto(false);
    setFallado(false);
    setReinicio(false);
  }, [reinicio]);

  useEffect(() => {
    setResuelto(false);
    setFallado(false);
    setReinicio(false);
  }, []);

  useEffect(() => {
    Utils.log("Check solution", solucion);
    escapp.submitNextPuzzle(solucion, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      try {
        setTimeout(() => {
          changeBoxLight(success);
        }, 100);
      } catch(e){
        Utils.log("Error in checkNextPuzzle",e);
      }
    });
  }, [solucion]);

  const changeBoxLight = (success) => {
    let audio;
    if (solucion.length === 0) return;
    if(success){
       setResuelto(true);
       onKeypadSolved(solucion);
       audio = document.getElementById("bomba_desactivada");
    }
    else{
      setFallado(true);
      audio = document.getElementById("solution_nok");
    }
    audio.play();
  }


  return (
    <div className={descubierto ? "modulo-descubierto":"modulo"}>
      <div className={fallado ? `luz-roj${descubierto ? "" : "-principal"}` : resuelto ? `luz-ver${descubierto ? "" : "-principal"}` : `luz-apa${descubierto ? "" : "-principal"}`}/>
      <audio id="bomba_desactivada" src="sounds/bomba_desactivada.mp3" autostart="false" preload="auto" />
      <audio id="solution_nok" src="sounds/solution_nok.mp3" autostart="false" preload="auto" />
      <Temporizador inicialMinutos={5} resuelto={resuelto} setFallado={setFallado} fallado={fallado} reinicio={reinicio} descubierto={descubierto}/>
      <div className="tapa-container">
        {descubierto ? <Cables  fallado={fallado} reinicio={reinicio} setSolucion={setSolucion}/> : <Tapa setDescubierto={setDescubierto} descubierto={descubierto}/>}
      </div>
    </div>
  );
}

export default Modulo;