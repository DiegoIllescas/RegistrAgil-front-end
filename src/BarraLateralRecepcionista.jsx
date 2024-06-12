import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/BarraLateral.css";
import BarraLogo from "./imgs/RA_logo.png";
import Inicio from "./imgs/inicio.png";
import Perfil from "./imgs/perfil.png";
import QR from "./imgs/qr.png";
import ConsultarJuntas from "./imgs/ges_juntas.png";

export function BarraLateral() {
  const [linkSeleccionado, setLinkSeleccionado] = useState("");

  const manejarClicEnlace = (evento, id) => {
    setLinkSeleccionado(id);
  };

  return (
    <div>
      <ul className="sidenav">
        <li className="BarraLogo">
          <img src={BarraLogo} alt="RegistrAgil" />
        </li>
        <li className="encabezados">
          <strong>Navegación Principal</strong>
        </li>
        <li className="botonBarra">
          <Link to="/Recepcionista/Bienvenida">
            <img src={Inicio} alt="Inicio Icono" className="Iconos" id="IconoInicio"/>
            <span>Inicio</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Recepcionista/Perfil">
            <img src={Perfil} alt="Mi Perfil Icono" className="Iconos" />
            <span>Mi Perfil</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Recepcionista/VisualizarDatos">
            <img src={QR} alt="Visualizar Datos Icono" className="Iconos"/>
            <span>Visualizar Datos</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Recepcionista/ConsultarJuntas">
            <img src={ConsultarJuntas} alt="Consultar Juntas Icono" className="Iconos"/>
            <span>Consultar Juntas</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}