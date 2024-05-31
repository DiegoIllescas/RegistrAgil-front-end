import React from "react";
import {
  Button,
  Container,
  Card,
  Form,
  CardBody,
  Row,
  Col,
  Image,
  FloatingLabel,
} from "react-bootstrap";

import QRscanner from './QrScanner'



export function PGRecepcionista() {
    const user = {
        nombre: "Ana",
        nombre1: "Ivan",
        apaterno: "Medina",
        amaterno: "Angeles",
        telefono: "5500000000",
        correo: "ana@gmail.com",
        correo1: "ivan@gmail.com",
        direccion: "Calle Sidra 123, Edo Mex",
        departamento: "Marketing",
        permisos: "invitado",
        fotografia: "https://via.placeholder.com/150",
        modelo: "2321323",
        numero: "454523543",
      };
    
      return (
        <>
          <Container
            fluid
            id="perfil"
            className="mainContainer d-flex justify-content-center"
          >
            <Row className="d-flex justify-content-center">
                <Col sm="5">
                <QRscanner />

                <Card className="card-container d-flex justify-content-center">
                        <CardBody>
                        <Card.Title className="text-center mb-2">
                            Dispositivos
                        </Card.Title>
                        <Form>
                            <Container className=" mb-2">
                            </Container>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Modelo"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    className="input"
                                    value={user.modelo}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col}>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Numero de serie"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="apaterno"
                                    className="input"
                                    value={user.numero}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                        </Form>
                        </CardBody>
                    </Card>



                    <Card className="card-container d-flex justify-content-center">
                        <CardBody>
                        <Card.Title className="text-center mb-2">
                            Acompañantes
                        </Card.Title>
                        <Form>
                            <Container className=" mb-2">
                            </Container>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Nombre"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    className="input"
                                    value={user.nombre1}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col}>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Correo"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="apaterno"
                                    className="input"
                                    value={user.correo1}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                        </Form>
                        </CardBody>
                    </Card>

                </Col>
                <Col sm="7">
                        <Card className="card-container d-flex justify-content-center">
                        <CardBody>
                        <Card.Title className="text-center mb-2">
                            Datos de Invitado
                        </Card.Title>
                        <Form>
                            <Container className=" mb-4">
                            <Row className="justify-content-center">
                                <Col xs={6} md={4}>
                                <Image
                                    src={user.fotografia}
                                    alt="foto de perfil"
                                    width="150px"
                                    height="150px"
                                    roundedCircle
                                />
                                </Col>
                            </Row>
                            </Container>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Nombre(s)"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    className="input"
                                    value={user.nombre}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col}>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Apellido Paterno"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="apaterno"
                                    className="input"
                                    value={user.apaterno}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Apellido Materno"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="amaterno"
                                    className="input"
                                    value={user.amaterno}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Número de Teléfono"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    className="input"
                                    value={user.telefono}
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
                                    className="input"
                                    value={user.correo}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Dirección"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    className="input"
                                    value={user.direccion}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Departamento"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="departamento"
                                    className="input"
                                    value={user.departamento}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Razón de la Visita"
                                className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    name="permisos"
                                    className="input"
                                    value={user.permisos}
                                    readOnly
                                />
                                </FloatingLabel>
                            </Form.Group>
                            </Row>
                        </Form>
                        </CardBody>
                        <Button variant="primary">Registrar Entrada</Button>{' '}
                    </Card>

                </Col>
              
            </Row>

          </Container>
        </>
      );
    }
