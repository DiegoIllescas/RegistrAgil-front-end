import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CSS/JuntasPendientes.css";

export function JuntasPendientes() {
  const navigate = useNavigate();
  const juntas = [
    {
      anfitrion: "Anfitrión 1",
      asunto: "Asunto de la Junta 1",
      fecha: "2024-06-01",
      horaInicio: "10:00",
      horaFin: "11:00",
      sala: "Sala A"
    },
    {
      anfitrion: "Anfitrión 2",
      asunto: "Asunto de la Junta 2",
      fecha: "2024-06-02",
      horaInicio: "12:00",
      horaFin: "13:00",
      sala: "Sala B"
    }
  ];

  const handleConsultarQR = () => {
    navigate("/Invitado/DescargarQR");
  };

  return (
    <>
    <h2>Juntas Agendadas</h2>
    <div className="juntasPendientesContainer">
      {juntas.map((junta, index) => (
        <Card key={index} className="mb-3 junta-card">
          <Card.Body>
            <Card.Title>{junta.asunto}</Card.Title>
            <Card.Text>
              <strong>Anfitrión:</strong> {junta.anfitrion} <br />
              <strong>Fecha:</strong> {junta.fecha} <br />
              <strong>Hora de Inicio:</strong> {junta.horaInicio} <br />
              <strong>Hora de Fin:</strong> {junta.horaFin} <br />
              <strong>Sala:</strong> {junta.sala}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Button onClick={handleConsultarQR} className="btn btn-primary qr-button">
                Consultar QR
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      ))}
    </div>
    </>
  );
}
