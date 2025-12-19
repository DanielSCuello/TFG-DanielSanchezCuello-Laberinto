import { useState, useEffect, useMemo, useContext } from "react";
import "./../assets/scss/Laberinto.css";
import Coordenada from "./Coordenada.jsx";
import { GlobalContext } from "./GlobalContext";

const MAX_SIZE = 6;

function Laberinto({ setSolution, resuelto, fallado, reinicio, descubierto, setDescubierto }) {
  const { appSettings } = useContext(GlobalContext);

  const rawRows = Number(appSettings?.rows ?? 4);
  const rawColumns = Number(appSettings?.columns ?? 4);

  // 🔒 Clamp entre 1 y 6
  const rows = Math.min(Math.max(rawRows, 1), MAX_SIZE);
  const columns = Math.min(Math.max(rawColumns, 1), MAX_SIZE);

  const principio = useMemo(() => ({ x: 0, y: 0 }), []);
  const final = useMemo(() => ({ x: columns - 1, y: rows - 1 }), [columns, rows]);

  const [animado, setAnimado] = useState(false);
  const [posicionJugador, setPosicionJugador] = useState(principio);
  const [orden, setOrden] = useState("");

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function descubrirTapa() {
    if (descubierto) return;
    setAnimado(true);
    await wait(1200);
    setAnimado(false);
    setDescubierto(true);
  }

  const appendMove = (pos) =>
    setOrden((prev) =>
      prev ? `${prev};${pos.x},${pos.y}` : `${pos.x},${pos.y}`
  );

  const grid = useMemo(
    () =>
      Array.from({ length: rows }, (_, y) =>
        Array.from({ length: columns }, (_, x) => ({ x, y, label: "" }))
      ),
    [rows, columns]
  );

  useEffect(() => {
    setPosicionJugador(principio);
    setOrden("");
  }, [reinicio, rows, columns, principio]);

  useEffect(() => {
    if (
      posicionJugador &&
      posicionJugador.x === final.x &&
      posicionJugador.y === final.y
    ) {
      setSolution(orden);
    }
  }, [posicionJugador, final, orden, setSolution]);

  const canMove = !fallado && !resuelto;

  const moveDerecha = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.x >= columns - 1) return prev;
      const next = { ...prev, x: prev.x + 1 };
      appendMove(next); 
      return next;
    });
  };

  const moveIzquierda = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.x <= 0) return prev;
      const next = { ...prev, x: prev.x - 1 };
      appendMove(next);
      return next;
    });
  };

  const moveArriba = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.y <= 0) return prev;
      const next = { ...prev, y: prev.y - 1 };
      appendMove(next);
      return next;
    });
  };

  const moveAbajo = () => {
    setPosicionJugador((prev) => {
      if (!canMove || prev.y >= rows - 1) return prev;
      const next = { ...prev, y: prev.y + 1 };
      appendMove(next);
      return next;
    });
  };


  return (
    <div className={"modulo-centro"}>
      <div className={descubierto ? "tablas-container" : "tablas-container-tapa"}>
        <table className="tabla-laberinto">
          <tbody>
            {grid.map((row, y) => (
              <tr key={`row-${y}`}>
                {row.map((cell, x) => (
                  <td key={`cell-${y}-${x}`}>
                    <Coordenada coordenadaX={x} coordenadaY={y}  coordenadaXJugador={posicionJugador.x} coordenadaYJugador={posicionJugador.y}  final={final.x === x && final.y === y}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <table className="tabla-boton">
          <tbody>
            <td><div className="boton-izquierda" onClick={moveIzquierda} /></td>
            <td><div className="boton-arriba" onClick={moveArriba} /></td>
            <td><div className="boton-abajo" onClick={moveAbajo} /></td>
            <td><div className="boton-derecha" onClick={moveDerecha} /></td>
          </tbody>
        </table>
      </div>

      {!descubierto && (
        <div
          className={`tapa-superpuesta ${animado ? "tapa-fall" : ""}`}
          onClick={descubrirTapa}
          tabIndex="0"
        />
      )}
    </div>
  );
}

export default Laberinto;
