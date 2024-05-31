import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BarraLateral } from "./BarraLateralAdmin";
import { BarraSuperior } from "./BarraSuperior";
import { FooterPG } from "./Footer";
import "./Layout.css";


export default function Administrador() {
  return (
    <>
      <header><BarraSuperior type="ADMINISTRADOR"/></header>
      <Container fluid>
        <Row>
          <Col><BarraLateral /></Col>
          <Col sm="9" className="Administrador"><Outlet /></Col>
        </Row>
      </Container>
      <footer><FooterPG /></footer>
    </>
  );
}