import { Container, Row, Col } from "react-bootstrap";
import { BarraSuperior } from "./BarraSuperior";
import { PagPrinusers } from "./PagPrincipalusuarios";
import { JuntasPendientes } from "./JuntasPendientes";
import { FooterPG } from "./Footer";
// import "./CSS/Layout.css";

export default function Invitado() {
  return (
    <>
      <header> <BarraSuperior type="INVITADO"/> </header>
      <Container fluid className="main-container">
        <Row>
          <Col md={6}>
            <JuntasPendientes />
          </Col>
          <Col md={1} className="linea-divisoria"></Col>
          <Col md={4}>
            <PagPrinusers nombre="Nombre del Usuario" />
          </Col>
        </Row>
      </Container>
      <footer> <FooterPG /> </footer>
    </>
  );
}
