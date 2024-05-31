import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/BarraLateral.css";
import BarraLogo from "./imgs/RA_logo.png";
import Inicio from "./imgs/inicio.png";
import Perfil from "./imgs/perfil.png";
import Calendario from "./imgs/calendario.png";
import CrearJunta from "./imgs/crear_junta.png";
import GestionarJuntas from "./imgs/ges_juntas.png";

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
          <Link to="/Anfitrion/Bienvenida">
            <img src={Inicio} alt="Inicio Icono" className="Iconos" id="IconoInicio"/>
            <span>Inicio</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Anfitrion/Perfil">
            <img src={Perfil} alt="Mi Perfil Icono" className="Iconos" />
            <span>Mi Perfil</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Anfitrion/CalendarioJuntas">
            <img src={Calendario} alt="Calendario Icono" className="Iconos" />
            <span>Calendario de Juntas</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Anfitrion/CrearJunta">
            <img src={CrearJunta} alt="Crear Junta Icono" className="Iconos"/>
            <span>Crear Junta</span>
          </Link>
        </li>
        <li className="encabezados">
          <strong>Administración</strong>
        </li>
        <li className="botonBarra">
          <Link to="/Anfitrion/GestionarJuntas">
            <img src={GestionarJuntas} alt="Gestionar Juntas Icono" className="Iconos"/>
            <span>Gestionar Juntas</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}