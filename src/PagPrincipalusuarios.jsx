import { Row, Col } from "react-bootstrap";
import "./CSS/PagPrincipalusuarios.css";
import Usuario from "./imgs/imgpruebausuario.png";

export function PagPrinusers() {

  const User = {
    nombre: "Administrador",
    nombre1: "Recepcionista",
    nombre2: "Invitado",
  };
  return (
    <>
    <div className="mainContainer d-flex justify-content-center">
      <Row className="Organizacion">
        <Col>
          <div>
            <img src={Usuario} alt="user" className="Usuario" />
          </div>

          <h1>Bienvenido Usuario </h1>
        </Col>
      </Row>
      </div>
    </>
  );
}
