import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BarraLateral } from "./BarraLateralAnfitrion";
import { BarraSuperior } from "./BarraSuperior";
import { FooterPG } from "./Footer";
import "./Layout.css";

export default function Anfitrion() {
  return (
    <>
      <header><BarraSuperior type="ANFITRION"/></header>
      <Container fluid>
        <Row>
          <Col><BarraLateral /></Col>
          <Col sm="9" className="Anfitrion"><Outlet /></Col>
        </Row>
      </Container>
      <footer><FooterPG /></footer>
    </>
  );
}