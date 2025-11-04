import { useState, useEffect } from "react";
import './../assets/scss/Cables.css';
import Cable from "./Cable.jsx";

function Cables({ fallado,reinicio, setSolucion }) {
  const arraySol = ["roj", "azu", "ver", "ama"];
  const [orden, setOrden] = useState(1);
  const [cables, setCables] = useState([
    { color: "roj" },
    { color: "azu" },
    { color: "ver" },
    { color: "ama" },
  ]);
  const [cablesCortados, setCablesCortados] = useState([]);

  const cortarCable = (color) => {
    if (fallado) return;

    setCables((prevCables) =>
      prevCables.map((cable) => {
        if (cable.color === color && !cable.cortado) {
          const nextOrden = orden + 1;
          setOrden(nextOrden);

          setCablesCortados((prev) =>
            prev.includes(color) ? prev : [...prev, color]
          );

          return { ...cable, cortado: true };
        }
        return cable;
      })
    );
  };

  const shuffleArray = (array) =>
    array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);

  useEffect(() => {
    if (cablesCortados.length > 0) {
      const secuencia = cablesCortados.join("-");
      console.log("Secuencia actual:", secuencia);
    }
  }, [cablesCortados]);

  useEffect(() => {
    if (orden === cables.length + 1) {
      const secuenciaFinal = cablesCortados.join("-");
      setSolucion(secuenciaFinal);
      console.log("💣 Puzzle resuelto. Secuencia final:", secuenciaFinal);
    }
  }, [orden]);

  useEffect(() => {
    setCables((prevCables) =>
      prevCables.map((cable) => {
        const index = arraySol.indexOf(cable.color);
        return index !== -1
          ? { ...cable, orden: index + 1, cortado: false }
          : cable;
      })
    );
  }, []);

  useEffect(() => {
    console.log("🔁 Reiniciando módulo...");
    setCables((cables) =>
      shuffleArray(
        cables.map((cable) => ({
          ...cable,
          cortado: false,
        }))
      )
    );
    setOrden(1);
    setCablesCortados([]);
  }, [reinicio]);

  return (
    <div className="cables-container">
      {cables.map((cable) => (
        <Cable key={cable.color} color={cable.color}  cortado={cable.cortado} onCortar={() => cortarCable(cable.color)}/>
      ))}
    </div>
  );
}

export default Cables;


