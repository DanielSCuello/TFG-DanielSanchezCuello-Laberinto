import { useEffect, useState , useContext } from "react";
import './../assets/scss/Modulo.css';
import { GlobalContext } from "./GlobalContext";
import Temporizador from "./Temporizador.jsx";
import Laberinto from "./ModuloLaberinto.jsx";

function Modulo({reinicio,setReinicio, descubierto,setDescubierto, onKeypadSolved , time}) {
  const { escapp, appSettings, Utils} = useContext(GlobalContext);
  const [fallado,setFallado] = useState(false);
  const [resuelto,setResuelto] = useState(false);
  const [solution, setSolution] = useState();

  useEffect(() => {
    if (!(String(appSettings.timer).toLowerCase() === "true")|| time >= 0) {
    setResuelto(false);
    setFallado(false);
    }
    setReinicio(false);
  }, [reinicio]);

  useEffect(() => {
    setResuelto(false);
    setFallado(false);
    setReinicio(false);
  }, []);

  useEffect(() => {
    if(typeof solution !== "string"){
      return;
    }


    Utils.log("Check solution", solution);

    escapp.submitNextPuzzle(solution, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      try {
        setTimeout(() => {
          changeBoxLight(success);
        }, 100);
      } catch(e){
        Utils.log("Error in checkNextPuzzle",e);
      }
    });
  }, [solution]);

  const changeBoxLight = (success) => {
    let audio;
    if (solution.length === 0) return;
    if(success){
       setResuelto(true);
       onKeypadSolved();
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
      {String(appSettings.timer).toLowerCase() === "true" && <Temporizador inicialSegundos={time} resuelto={resuelto} setFallado={setFallado} fallado={fallado} reinicio={reinicio} descubierto={descubierto}/>}
      <Laberinto fallado={fallado} reinicio={reinicio} setSolution={setSolution}  setDescubierto={setDescubierto} descubierto={descubierto}/>
    </div>
  );
}

export default Modulo;