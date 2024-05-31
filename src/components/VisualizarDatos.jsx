import React from 'react';
import { Container, Card, Form, CardBody, Row, Col, Image, Button, FloatingLabel, CardText } from "react-bootstrap";

function VisualizarDatos() {

    return (
        <>
            <Container fluid id="FormInv" className="mainContainer d-flex justify-content-center">
                <Row>
                    <Col>
                        <Row as={Col} className="d-flex justify-content-center">
                            <Card className="card-container d-flex justify-content-center">
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col xs={12} md={4}>
                                                <Image src="https://via.placeholder.com/200" alt="foto de perfil" width="200px" height="200px" className="mt-4" roundedCircle />
                                            </Col>
                                            <Col xs={12} md={8}>
                                                <Row>
                                                    <Card.Title className="text-center mb-2">Datos Personales</Card.Title>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Nombre(s)" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="nombre"
                                                                className="input"
                                                                //value={values.nombre}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Apellido Paterno" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="apaterno"
                                                                    className="input"
                                                                    //value={values.apaterno}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group as={Col}>
                                                            <FloatingLabel controlId="floatingInput" label="Apellido Materno" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="amaterno"
                                                                    className="input"
                                                                    //value={values.amaterno}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Número de Teléfono" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="telefono"
                                                                className="input"
                                                                //value={values.telefono}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <Form.Group as={Col}>
                                                    <FloatingLabel controlId="floatingInput" label="Empresa en la que trabaja" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="empresa"
                                                            className="input"
                                                            //value={values.empresa}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Form.Group as={Col}>
                                                    <FloatingLabel controlId="floatingInput" label="Documento de identidad" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="documento"
                                                            className="input"
                                                            //value={values.documento}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Card.Title className="text-center mb-2">Datos de la Junta</Card.Title>
                                            <Col xs={12} md={8}>
                                                <Row>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Anfitrión" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="anfitrion"
                                                                className="input"
                                                                //value={values.anfitrion}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Asunto" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="asunto"
                                                                className="input"
                                                                //value={values.asunto}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Sala" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="sala"
                                                                className="input"
                                                                //value={values.sala}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Fecha" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="fecha"
                                                            className="fecha"
                                                            //value={values.anfitrion}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Hora de Inicio" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="horai"
                                                            className="input"
                                                            //value={values.horai}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Hora de Fin" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="horaf"
                                                            className="input"
                                                            //value={values.horaf}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <Card.Title className="text-center mb-2">Dispositivo(s)</Card.Title>
                                                <Container style={{ maxHeight: '205px', overflowY: 'auto' }}>
                                                    <Row>
                                                        <CardText>Dispositivo 1</CardText>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Modelo" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="modelo"
                                                                    className="modelo"
                                                                    //value={values.modelo}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Número de serie" className="">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="serie"
                                                                    className="input"
                                                                    //value={values.serie}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                    <hr></hr>
                                                    <Row>
                                                        <CardText>Dispositivo 2</CardText>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Modelo" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="modelo"
                                                                    className="modelo"
                                                                    //value={values.modelo}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Número de serie" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="serie"
                                                                    className="input"
                                                                    //value={values.serie}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                </Container>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Card.Title className="text-center mb-2">Automóvil</Card.Title>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Modelo" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="amodelo"
                                                            className="input"
                                                            //value={values.amodelo}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Placa" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="placa"
                                                            className="input"
                                                            //value={values.placa}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingInput" label="Color" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="color"
                                                            className="input"
                                                            //value={values.color}
                                                            readOnly
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>
                    <Col xs={12} md={4}>
                        <Row className="justify-content-center mb-5">
                            <Form.Group as={Col}>
                                <Button variant="info" type="">Escanear QR</Button>
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center">
                            <Form.Group as={Col}>
                                <Button variant="success" type="">Registrar Entrada</Button>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="danger" type="">Registrar Salida</Button>
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default VisualizarDatos;