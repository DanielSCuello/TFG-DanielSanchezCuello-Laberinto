import { useEffect, useState } from "react";
import "./../styles/Mensaje.css";
import { LOCALES } from "../config/locales.js";

function Mensaje({resuelto, fallado}) {
  const [mensaje, setMensaje] = useState("");

  useEffect(()=>{
    if(fallado){
      setMensaje(LOCALES.es.fallado)
    }else if(resuelto){
      setMensaje(LOCALES.es.resuelto)
    }else{
      setMensaje("")
    }
  },[fallado , resuelto])
  
  return (
    <div className="display-mensaje">
      <div className="mensaje">{mensaje}</div>
    </div>
  );
}

export default Mensaje;