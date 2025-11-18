import { useState } from "react";
import ModalReseñas from "./ModalReseñas";

function TarjetaJuego({ 
  gamename, 
  developer, 
  gender, 
  description, 
  imagesrc, 
  onDelete, 
  onEdit, 
  juego_completo, 
  id, 
  onUpdateCompletado 
}) {
  const [completado, setCompletado] = useState(juego_completo || false);
  const [mostrarModalReseñas, setMostrarModalReseñas] = useState(false);

  const toggleCompletado = () => {
    const nuevoEstado = !completado;
    setCompletado(nuevoEstado);
    onUpdateCompletado(id, nuevoEstado);
  };

  return (
    <>
      <div className="container-tarjeta-juego">
        <div className="imagen-tarjeta-juego">
          <img src={imagesrc} alt={`Imagen del juego ${gamename}`} />
        </div>
        <div className="informacion-tarjeta-juego">
          <h2 className="titulo-juego">Nombre: {gamename}</h2>
          <p><strong>Desarrollador:</strong> {developer}</p>
          <p><strong>Género:</strong> {gender}</p>
          <p><strong>Descripción:</strong> {description}</p>
          
          {/* Botón de completado funcional */}
          <p>
            <strong>Completado:</strong>
            <button 
              className={`boton-toggle ${completado ? 'completado' : 'incompleto'}`}
              onClick={toggleCompletado}
            >
              {completado ? "✅ Sí" : "❌ No"}
            </button>
          </p>
          
          {/* Botones de acción */}
          <div className="botones-acciones">
            <button className="boton-eliminar" onClick={() => onDelete(id)}>
              Eliminar
            </button>
            <button className="boton-editar" onClick={() => onEdit(id, gamename, developer, gender, description, imagesrc)}>
              Editar
            </button>
            <button className="boton-resenas" onClick={() => setMostrarModalReseñas(true)}>
              📝 Ver Reseñas
            </button>
          </div>
        </div>
      </div>

      {/* Modal de reseñas */}
      {mostrarModalReseñas && (
        <ModalReseñas 
          juegoId={id}
          gamename={gamename}
          onClose={() => setMostrarModalReseñas(false)}
        />
      )}
    </>
  );
}

export default TarjetaJuego;