import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BarraSuperior } from "..//BarraSuperior";
import { FooterPG } from "..//Footer";
import "..//CSS/DescargarQR.css";

export default function DescargarQR() {
  return (
    <>
      <header> <BarraSuperior type="INVITADO"/> </header>
      <Container fluid className="main-container">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Descargar Código QR</h1>
            <p>Haz clic en el botón de abajo para descargar tu código QR.</p>
            <Button variant="primary" className="qr-button">
              Descargar QR
            </Button>
          </Col>
        </Row>
      </Container>
      <footer> <FooterPG /> </footer>
    </>
  );
}