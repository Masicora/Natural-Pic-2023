import "../assets/css/galeria.css";
import Heart from "./Heart";
import Context from "../Context";
import { useContext } from "react";

export default function Home() {
  // CONSUMO DE ESTADO CON CONTEXT;
  const { fotos, setFotos } = useContext(Context);

  // FUNCION PARA MARCAR Y DESMARCAR FAVORITOS
  const Favorito = (id) => {
    const indice = fotos.findIndex((f) => f.id === id);
    fotos[indice].favorite = !fotos[indice].favorite;
    setFotos([...fotos]);
  };

  return (
    <div className="galeria grid-columns-5 p-3">
      {/* MAPEO DE FOTOS */}
      {fotos.map((foto, i) => (
        <div
          key={i}
          onClick={() => Favorito(foto.id)}
          className="foto"
          style={{ backgroundImage: `url(${foto.src})` }}
        >
          {/* USO DEL COMPONENTE HEART QUE COLOREA LAS FOTOS FAVORITAS */}
          <Heart filled={foto.favorite} />
          <p>{foto.description}</p>
        </div>
      ))}
    </div>
  );
}
