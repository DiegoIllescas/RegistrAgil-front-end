import React, { useState } from 'react';
import { Container, Card, Form, CardBody, Row, Col, Image, Button, FloatingLabel, CardText } from "react-bootstrap";
import QRscanner from '../QrScanner';
import "../CSS/Administrador.css";
function VisualizarDatos() {

    const [datos, setDatos] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        empresa: '',
        documento: '',
        anfitrion: '',
        asunto: '',
        sala: '',
        fecha: '',
        horai: '',
        horaf: '',
        dispositivos: [],
        amodelo: '',
        placa: '',
        color: ''
    });

    const handleDataReceived = (data) => {
        if (data.error) {
            console.error(data.error);
            return;
        }
        setDatos({
            nombre: data.invitado?.nombre || '',
            apellido_paterno: data.invitado?.apellido_paterno || '',
            apellido_materno: data.invitado?.apellido_materno || '',
            telefono: data.invitado?.telefono || '',
            empresa: data.invitado?.empresa || '',
            documento: '', //enviar documento desde back
            anfitrion: data.anfitrion ? `${data.anfitrion.nombre} ${data.anfitrion.apellido_paterno} ${data.anfitrion.apellido_materno}` : '',
            asunto: '', //enviar asunto desde back
            sala: data.junta?.sala || '',
            fecha: data.junta?.fecha || '',
            horai: data.junta?.horaInicio || '',
            horaf: '', //enviar hora fin desde back
            dispositivos: [], //Enviar Dispositivos desde back
            amodelo: data.auto?.modelo || '',
            placa: data.auto?.placa || '',
            color: data.auto?.color || '',
            foto: data.invitado?.foto || ''
        });
    };

    return (
        <>
            <Container fluid id="FormInv" className="mainContainer d-flex justify-content-center">
                <Row>
                    <Col>
                        <Row as={Col} className="d-flex justify-content-center">
                            <Card className='card-datos'>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col xs={12} md={4}>
                                                <Image src={`data:image/jpeg;base64,${datos.foto}`} alt="foto de perfil" width="200px" height="200px" className="mt-4" roundedCircle />
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
                                                                value={datos.nombre}
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
                                                                    value={datos.apellido_paterno}
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
                                                                    value={datos.apellido_materno}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Teléfono" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="telefono"
                                                                    className="input"
                                                                    value={datos.telefono}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Empresa" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="empresa"
                                                                    className="input"
                                                                    value={datos.empresa}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="Documento" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="documento"
                                                                className="input"
                                                                value={datos.documento}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <Card.Title className="text-center mb-2">Datos de la Junta</Card.Title>
                                                <Container>
                                                    <Row>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Anfitrión" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="anfitrion"
                                                                    className="input"
                                                                    value={datos.anfitrion}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Asunto" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="asunto"
                                                                    className="input"
                                                                    value={datos.asunto}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Sala" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="sala"
                                                                    className="input"
                                                                    value={datos.sala}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                            <Form.Group>
                                                                <FloatingLabel controlId="floatingInput" label="Fecha" className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="fecha"
                                                                        className="input"
                                                                        value={datos.fecha}
                                                                        readOnly
                                                                    />
                                                                </FloatingLabel>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <Form.Group>
                                                                <FloatingLabel controlId="floatingInput" label="Hora de Inicio" className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="horai"
                                                                        className="input"
                                                                        value={datos.horai}
                                                                        readOnly
                                                                    />
                                                                </FloatingLabel>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group>
                                                            <FloatingLabel controlId="floatingInput" label="Hora de Fin" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="horaf"
                                                                    className="input"
                                                                    value={datos.horaf}
                                                                    readOnly
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Row>
                                                    {datos.dispositivos.map((dispositivo, index) => (
                                                        <React.Fragment key={index}>
                                                            <hr />
                                                            <Row>
                                                                <Form.Group>
                                                                    <FloatingLabel controlId="floatingInput" label="Nombre del dispositivo" className="">
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="ndispositivo"
                                                                            className="ndispositivo"
                                                                            value={dispositivo.nombre || ''}
                                                                            readOnly
                                                                        />
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Row>
                                                            <Row>
                                                                <Form.Group as={Col}>
                                                                    <FloatingLabel controlId="floatingInput" label="Modelo" className="">
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="modelo"
                                                                            className="modelo"
                                                                            value={dispositivo.modelo || ''}
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
                                                                            value={dispositivo.serie || ''}
                                                                            readOnly
                                                                        />
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Row>
                                                            <hr></hr>
                                                        </React.Fragment>
                                                    ))}
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
                                                            value={datos.amodelo || ''}
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
                                                            value={datos.placa || ''}
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
                                                            value={datos.color || ''}
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
                            <QRscanner onDataReceived={handleDataReceived} />
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