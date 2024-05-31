import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Row, Col, Image, FloatingLabel } from "react-bootstrap";
import "../CSS/Administrador.css";

function UserProfile() {
  const [user, setUser] = useState({ nombre: "", apellido_paterno: "", apellido_materno: "", correo: "", fotografia: "" });

  const navigate = useNavigate();

  useEffect (() => {
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
  },[]);

  return (
    <>
      <Container fluid id="perfil" className="mainContainer d-flex justify-content-center">
        <Row className="d-flex justify-content-center" style={{ width: '80%'}}>
          <div>
            <Card.Title className="mb-4 titulo">Detalles del Perfil</Card.Title>
            <Card className="card-datos d-flex justify-content-center">
              <Card.Body>
                <Form>
                  <Row>
                    <Col xs={12} md={4}>
                      <Container className="text-center">
                        <Image
                          src={"data:image/jpg;base64,"+ user.fotografia}
                          alt="foto de perfil"
                          width="200px"
                          height="200px"
                          roundedCircle
                          className="mt-5 card-foto"
                        />
                      </Container>
                    </Col>
                    <Col xs={12} md={8}>
                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Nombre(s)"
                            className="mt-3 mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="nombre"
                              className="input card-input"
                              value={user.nombre}
                              readOnly
                            />
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Apellido Paterno"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="apaterno"
                              className="input card-input"
                              value={user.apellido_paterno}
                              readOnly
                            />
                          </FloatingLabel>
                        </Form.Group>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Apellido Materno"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="amaterno"
                              className="input card-input"
                              value={user.apellido_materno}
                              readOnly
                            />
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Correo Electrónico"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="correo"
                              className="input card-input"
                              value={user.correo}
                              readOnly
                            />
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default UserProfile;