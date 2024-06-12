import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/JuntasPendientes.css";

export function JuntasPendientes() {
  const navigate = useNavigate();
  const [juntas, setJuntas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      alert("No tienes permiso");
      navigate('/LogIn');
    }else{
    const options = {
      method : 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ token
      },
      referrerPolicy: "no-referrer"
    };
    fetch("http://localhost/backend/junta.php", options)
    .then((response) => response.json())
    .then((data) => {
      if(data.success) {
        setJuntas(data.juntas);
      }else{
        if(data.error == "Sesion expirada") {
          navigate('/LogIn')
        }
      }
    });
  }
  },[]);

  const handleConsultarQR = (e) => {
    const id = e.target.id;
    navigate("/Invitado/DescargarQR?id="+id);
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
              <strong>Hora de Inicio:</strong> {junta.hora_inicio} <br />
              <strong>Hora de Fin:</strong> {junta.hora_fin} <br />
              <strong>Sala:</strong> {junta.sala}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Button onClick={handleConsultarQR} id={junta.id} className="btn btn-primary qr-button">
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
