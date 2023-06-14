import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Favoritos from "./views/Favoritos";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  // INCORPORACIÓN DE USESTATE PARA FOTOS EN CONTEXT
  const [fotos, setFotos] = useState([]);
  const endpoint = "./fotos.json";
  const getFotos = async () => {
    // FETCH SOLICITADO A ENDPOINT
    const respuesta = await fetch(endpoint);
    // DESTRUCTURING
    let { photos } = await respuesta.json();
    // MAPEO DE FOTOS
    photos = photos.map((foto) => ({
      src: foto.src.tiny,
      id: foto.id,
      favorite: false,
      description: foto.alt,

    }));

    setFotos(photos);
  };
  // MANTENER ACTUALIZADAS LAS FOTOS ANTE CAMBIOS
  useEffect(() => { getFotos(); }, []);

  return (
    <div className="App">
      {/* INCORPORACIÓN DEL PROVIDER AL BrowserRouter */}
      <Context.Provider value={{ fotos, setFotos }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>

    </div>
  );
}
