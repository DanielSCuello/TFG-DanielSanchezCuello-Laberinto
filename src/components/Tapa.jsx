import { useState } from "react";
import './../assets/scss/Tapa.css';

function Tapa({setDescubierto}) {
  const [animado, setAnimado] = useState(false);

  const animacionTapa = () => {
    document.getElementById("image").addEventListener("click", function() {this.classList.add("falling");});
  };
  
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function descubrirTapa (){
    setAnimado(true);
    await wait(1200);
    setDescubierto(true);
  }

  return (
    <div className="cable-blurry"><div className={`tapa${animado ? "-fall" : ""}`} onClick={() => {descubrirTapa(); animacionTapa();}} tabIndex="0" ></div></div>
  );
}

export default Tapa;