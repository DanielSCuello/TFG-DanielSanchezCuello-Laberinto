import { useState, useEffect } from "react";
import './../assets/scss/Temporizador.css';

function Temporizador({ inicialMinutos ,resuelto,fallado, setFallado ,reinicio , descubierto}) {
  const [minutos, setMinutos] = useState(inicialMinutos);
  const [segundos, setSegundos] = useState(0);
  const [segundos2, setSegundos2] = useState(0);
  
  useEffect(()=>{
    setMinutos(inicialMinutos);
    setSegundos(0);
    setSegundos2(0);
  },[reinicio])

  useEffect(() => {
    const intervalo = setInterval(() => {
    if(!resuelto && !fallado){
      if (minutos === 0 && segundos === 0 && segundos2 === 0) {
        setFallado(true);
        clearInterval(intervalo);
      } else if (segundos === 0 && segundos2 === 0) {
        console.log("59");
        setMinutos((prev) => prev - 1);
        setSegundos(5);
        setSegundos2(9);
      } else if(segundos2 === 0){
        console.log("0");
        setSegundos((prev) => prev - 1);
        setSegundos2(9);
      }else{
        setSegundos2((prev) => prev - 1);
      }
    }}, 1000);
    return () => clearInterval(intervalo);
  }, [minutos, segundos, segundos2]);



  return (
      <h3 className={descubierto ? "temporizador-descubierto": "temporizador"}>{minutos} : {segundos} {segundos2}</h3>
  );
}

export default Temporizador;