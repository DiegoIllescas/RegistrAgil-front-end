import { Row, Col, Form, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./CSS/PagPrincipalusuarios.css";

export function PagPrinusers() {

  const [user, setUser] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    fotografia: null
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) 
      navigate('/LogIn');
    const options = {
      method : 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ token
      },
      referrerPolicy: "no-referrer"
    };
    fetch("http://localhost/backend/usuario.php", options)
    .then((response) => response.json())
    .then((data) => {
      if(data.success) {
        setUser(data.content);
      }else{
        navigate('/LogIn');
      }
    })
  }, []);

  return (
    <>
      <Container fluid id="inicio" className="mainContainer d-flex justify-content-center mt-5 ">
        <Row className="d-flex justify-content-center text-center ms-5 ms-sm-0" style={{ width: '80%' }}>
          <Col >            
            <div className="imagen-container">
              <img
                src={user.fotografia ? `data:image/jpeg;base64,${user.fotografia}` : "https://via.placeholder.com/200"}
                alt="user"
                className="Usuario rounded-circle card-foto "
                style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'cover' }}
              />
            </div>

            <h1 className="mt-4" style={{ fontFamily: "Livvic, sans-serif", fontWeight: 600}}>Bienvenid@ {user.nombre} {user.apellido_paterno}</h1>
          </Col>
        </Row>
      </Container>
    </>

  );
}
