import { useState, useEffect } from "react";
import Tarjetajuego from "../components/TarjetaJuego";

function Library() {
  // 🔹 URL de la API
  const URL_API = "http://localhost:3000";

    // 🔹 Estados
  const [juegos, setJuegos] = useState([]);
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
   

  // 🔹 Obtener juegos al cargar la página
  useEffect(() => {
    fetch(URL_API)
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((err) => {
        console.error("Error al obtener juegos:", err);
        setJuegos([]);
      });
  }, []);

  // 🔹 Guardar un nuevo juego
  const saveGame = async (e) => {
    e.preventDefault(); // evitar recargar la página

    const nuevoJuego = {
      gameId: sessionStorage.getItem("gameId") || "anon",
      name,
      developer,
      gender,
      description,
      imageSrc,
    };

    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoJuego),
      });

      // Verificar respuesta del servidor
      const data = await res.json();
      console.log("Respuesta del servidor:", data);

      // Actualizar la lista de juegos con el nuevo juego agregado
       setJuegos((prev) => [...prev, data]);


      // Limpiar campos
      setName("");
      setDeveloper("");
      setGender("");
      setDescription("");
      setImageSrc("");
    } catch (error) {
      console.error("Error al guardar juego:", error);
    }
  };

  //eliminar un juego
const eliminarJuego = async (Id) => {
    const res = await fetch(`${URL_API}/${Id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setJuegos(juegos.filter((juego) => juego._id !== Id));
    }
    };

  return (
    <>
      <h1>🎮 Mi Biblioteca de Juegos</h1>

      <div className="form-new-edit-game">
        <form onSubmit={saveGame}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre del juego"
            required
          />
          <input
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            type="text"
            placeholder="Desarrollador"
            required
          />
          <input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
            placeholder="Género"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Descripción"
          />
          <input
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            type="text"
            placeholder="URL de la imagen"
          />
          <button type="submit">Guardar Juego</button>
        </form>
      </div>

      <div className="library-container">
        {juegos.map((juego, index) => (
          <Tarjetajuego
            key={juego._id || index}
            id={juego._id}
            gamename={juego.name}
            developer={juego.developer}
            gender={juego.gender}
            description={juego.description}
            imagesrc={juego.imageSrc}
            juego_completo={juego.juego_completo}
            onDelete={eliminarJuego}
          />
        ))}
      </div>
    </>
  );
}


export default Library;