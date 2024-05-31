import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/BarraLateral.css";
import BarraLogo from "./imgs/RA_logo.png";
import Inicio from "./imgs/inicio.png";
import Perfil from "./imgs/perfil.png";
import Calendario from "./imgs/calendario.png";
import EntradaSalida from "./imgs/entradas_salidas.png";
import RegisEmpleados from "./imgs/reg_empleado.png";
import Juntas from "./imgs/ges_juntas.png";
import Invitados from "./imgs/ges_invitado.png";
import Empleados from "./imgs/ges_empleados.png";

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
          <Link to="/Administrador/Bienvenida">
            <img src={Inicio} alt="Inicio Icono" className="Iconos" id="IconoInicio" />
            <span>Inicio</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Administrador/Perfil">
            <img src={Perfil} alt="Mi Perfil Icono" className="Iconos" />
            <span>Mi Perfil</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Administrador/CalendarioJuntas">
            <img src={Calendario} alt="Calendario Icono" className="Iconos" />
            <span>Calendario de Juntas</span>
          </Link>
        </li>
        <li className={linkSeleccionado === "entradasSalidas" ? "active" : "botonBarra"}>
          <Link to="/Administrador/VisualizarES" onClick={() => manejarClicEnlace("entradasSalidas")}>
            <img src={EntradaSalida} alt="Entrada/Salida Icono" className="Iconos" />
            <span>Visualizar Entradas/Salidas</span>
          </Link>
        </li>
        <li className="encabezados">
          <strong>Administración de Empleado</strong>
        </li>
        <li className="botonBarra">
          <Link to="/Administrador/RegistrarEmpleado">
            <img src={RegisEmpleados} alt="Registrar Icono" className="Iconos" />
            <span>Registrar Empleado</span>
          </Link>
        </li>
        <li className="botonBarra">
          <Link to="/Administrador/GestionarJuntas">
            <img src={Juntas} alt="Juntas Icono" className="Iconos" />
            <span>Gestionar Juntas</span>
          </Link>
        </li>
        <li className={linkSeleccionado === "gestionarInvitados" ? "active" : "botonBarra"}>
          <Link to="/Administrador/GestionarInvitados" onClick={() => manejarClicEnlace("gestionarInvitados")}>
            <img src={Invitados} alt="Gestionar Invitados Icono" className="Iconos" />
            <span>Gestionar Invitados</span>
          </Link>
        </li>
        <li className={linkSeleccionado === "gestionarEmpleados" ? "active" : "botonBarra"}>
          <Link to="/Administrador/GestionarEmpleados" onClick={() => manejarClicEnlace("gestionarEmpleados")}>
            <img src={Empleados} alt="Gestionar Empleados Icono" className="Iconos" />
            <span>Gestionar Empleados</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}