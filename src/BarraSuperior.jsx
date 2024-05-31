import Logo from "./imgs/RAC_logo.jpg";
import { Link } from "react-router-dom";
import "./CSS/BarraSuperior.css";

export function BarraSuperior(props) {
    const title = props.type;
    const handleCloseSession = () => {
      localStorage.removeItem("permisos");
      localStorage.removeItem("token");
    }
  return (
    <ul className="BarraSuperior">
      <li className="Bloque Izquierda">
        <Link to={"Bienvenida"}>
          <img src={Logo} alt="Logo RegistrAgil" className="Logo" />
        </Link>
      </li>
      <li className="Bloque Centro">{title}</li>
      <li className="Bloque Derecha">
        <Link to="/Inicio" onClick={handleCloseSession} className="pt-2 pb-2 ps-1 pe-1">Cerrar Sesión</Link>
      </li>
    </ul>
  );
}