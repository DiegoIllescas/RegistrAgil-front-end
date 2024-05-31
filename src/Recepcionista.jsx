import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BarraLateral } from "./BarraLateralRecepcionista";
import { BarraSuperior } from "./BarraSuperior";
import { FooterPG } from "./Footer";
import "./Layout.css";

export default function Recepcionista() {
  return (
    <>
      <header><BarraSuperior type="RECEPCIONISTA"/></header>
      <Container fluid>
      <Row>
       <Col><BarraLateral/></Col>
       <Col sm="9" className="Recepcionista"><Outlet/></Col>
      </Row>
      </Container>
      <footer><FooterPG/></footer>
    </>
  );
}