import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BarraLateral } from "./BarraLateralAdmin";
import { BarraSuperior } from "./BarraSuperior";
import { FooterPG } from "./Footer";
import "./Layout.css";

export default function Administrador() {

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      ////alert('Debes iniciar sesion');
      //Mostrar modal o aviso que necesita iniciar sesion
      navigate('/Inicio');
    }
  },[]);

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