import { useState, useEffect, useMemo } from "react";
import "./../assets/scss/Laberinto.css";
import Coordenada from "./Coordenada.jsx";

function Laberinto({ setSolution, resuelto , fallado, reinicio , descubierto , setDescubierto }) {
  const size = 4;

  const [principio] = useState({ x: 0, y: 0 });
  const [final] = useState({ x: size - 1, y: size - 1 });
  const [animado, setAnimado] = useState(false);

  const [posicionJugador, setPosicionJugador] = useState(principio);

  const [orden, setOrden] = useState("");

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function descubrirTapa() {
    console.log("Descubierto"+ descubierto)
    if (descubierto) return;
    console.log("Descubierto"+ descubierto)
    setAnimado(true);
    await wait(1200);
    setAnimado(false);
    setDescubierto(true);
  }

  const appendMove = (dir) =>
    setOrden((prev) => (prev ? `${prev}-${dir}` : dir));

  const grid = useMemo(
    () =>
      Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => ({ x, y,  label: "", }))
      ),
    [size]
  );

  useEffect(() => {
    setPosicionJugador(principio);
  }, []);

  useEffect(() => {
    setPosicionJugador(principio);
  }, [reinicio]);

  useEffect(() => {
    if ( posicionJugador && final &&  posicionJugador.x === final.x && posicionJugador.y === final.y) {
      console.log(orden);
      setSolution(orden);
    }
  }, [posicionJugador, final]);

  const canMove = !fallado && !resuelto;

  const moveDerecha = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.x >= size - 1) return prev;
      const next = { ...prev, x: prev.x + 1 };
      appendMove("der");
      return next;
    });
  };

  const moveIzquierda = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.x <= 0) return prev;
      const next = { ...prev, x: prev.x - 1 };
      appendMove("izq");
      return next;
    });
  };

  const moveArriba = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.y <= 0) return prev;
      const next = { ...prev, y: prev.y - 1 };
      appendMove("arr");
      return next;
    });
  };

  const moveAbajo = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.y >= size - 1) return prev;
      const next = { ...prev, y: prev.y + 1 };
      appendMove("aba");
      return next;
    });
  };


  return (
    <div className={"modulo-centro"}>
      <div  className={descubierto ? "tablas-container" : "tablas-container-tapa"}>
        <table className="tabla-laberinto">
          <tbody>
            {grid.map((row, y) => (
              <tr key={`row-${y}`}>
                {row.map((cell, x) => (
                  <td key={`cell-${y}-${x}`}>
                    <Coordenada coordenadaX={x} coordenadaY={y} coordenadaXJugador={posicionJugador.x} coordenadaYJugador={posicionJugador.y} final={final.x === x && final.y === y} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <table className="tabla-boton">
          <tbody>
              <td>
                <div className="boton-izquierda" onClick={moveIzquierda} />
              </td >
              <td>
                <div className="boton-arriba" onClick={moveArriba} />
              </td>
              <td>
                <div className="boton-derecha" onClick={moveDerecha} />
              </td>
              <td>
                <div className="boton-abajo" onClick={moveAbajo} />
              </td>
          </tbody>
        </table>
      </div>
      {!descubierto && (<div className={`tapa-superpuesta ${animado ? "tapa-fall" : ""}`} onClick={descubrirTapa} tabIndex="0"/>)}
    </div>
  );
}

export default Laberinto;
