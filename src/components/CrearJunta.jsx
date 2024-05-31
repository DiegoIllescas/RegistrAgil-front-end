import { Container, Card, CardBody, Row, Col, Button, Form, FloatingLabel, Image, Modal } from "react-bootstrap";
import Eliminar from "../imgs/eliminar.png";
import Agregar from "../imgs/agregar.png";
import React, { useState } from 'react';
import "../CSS/Administrador.css";

function CrearJunta() {

    const token = localStorage.getItem("token");

    const [values, setValues] = useState({
        asunto: "",
        sala: "",
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        invitados: [],
        descripcion: "",
        direccion: "",
    });

    const [newInvitado, setNewInvitado] = useState({
        correo: "",
        acompañantes: 0
    });
    const today = new Date().toISOString().split('T')[0];
    const requiredFields = ['asunto', 'sala', 'fecha', 'hora_inicio', 'hora_fin', 'descripcion', 'direccion'];
    const [submitted, setSubmitted] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const [errors, setErrors] = useState({
        asunto: "",
        sala: "",
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        descripcion: "",
        direccion: "",
        newInvitado: {
            correo: "",
            acompañantes: ""
        }
    });

    const validate = (name, value) => {
        let error = "";
        switch (name) {
            case 'correo':
                if (value && ! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
                    error = "El formato del correo electrónico es inválido";
                }
                break;
            case 'asunto':
            case 'sala':
            case 'fecha':
            case 'hora_inicio':
            case 'hora_fin':
            case 'descripcion':
            case 'direccion':
                if (!value) {
                    error = "Este campo es obligatorio";
                }
                break;
        }
        return error;
    };

    const handleInputChange = (e, index = null) => {
        const { name, value } = e.target;
        let error = validate(name, value);

        if (index !== null) {
            const newInvitados = values.invitados.map((invitado, i) => i === index ? { ...invitado, [name]: value } : invitado);
            const newErrors = errors.invitados.map((error, i) => i === index ? { ...error, [name]: validate(name, value) } : error);
            setValues({ ...values, invitados: newInvitados });
            setErrors({ ...errors, invitados: newErrors });
        } else {
            setValues(prev => ({ ...prev, [name]: value }));
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleNewInvitadoChange = (e) => {
        const { name, value } = e.target;
        let error = validate(name, value);
        setNewInvitado(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, newInvitado: { ...prev.newInvitado, [name]: error } }));
    };

    const addInvitado = () => {
        const correoError = validate('correo', newInvitado.correo);
        if (correoError) {
            setErrors(prev => ({ ...prev, newInvitado: { ...prev.newInvitado, correo: correoError } }));
            return;
        }
        setValues(prev => ({
            ...prev,
            invitados: [...prev.invitados, newInvitado]
        }));
        setNewInvitado({ correo: "", acompañantes: 0 });
        setErrors(prev => ({ ...prev, newInvitado: { correo: "", acompañantes: "" } }));
    };

    const removeInvitado = index => {
        const newInvitados = values.invitados.filter((_, i) => i !== index);
        setValues({ ...values, invitados: newInvitados });
    };

    const buildConfirmationMessage = () => {
        return (
            <div>
                <p>
                    <strong>Asunto de la Junta: </strong> {values.asunto}
                </p>
                <p>
                    <strong>Sala de Juntas: </strong> {values.sala}
                </p>
                <p>
                    <strong>Fecha: </strong> {values.fecha}
                </p>
                <p>
                    <strong>Hora de Inicio: </strong> {values.hora_inicio}
                </p>
                <p>
                    <strong>Hora de Fin: </strong> {values.hora_fin}
                </p>
                <p>
                    <strong>Dirección: </strong> {values.direccion}
                </p>
                <p>
                    <strong>Descripción: </strong> {values.descripcion}
                </p>
                <p>
                    <strong>Invitados: </strong> {values.invitados.length}
                </p>
                    {values.invitados.map((invitado, index) => (
                        <p key={index} className="ms-4">
                            {index+1}. {invitado.correo} - {invitado.acompañantes > 0 ? `${invitado.acompañantes} acompañante${invitado.acompañantes > 1 ? 's' : ''}` : 'sin acompañantes'}
                        </p>
                    ))}
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const updatedErrors = { ...errors };
        requiredFields.forEach(field => {
            updatedErrors[field] = validate(field, values[field]);
        });

        let newInvitadoError = validate('correo', newInvitado.correo);
        if (newInvitado.correo && !newInvitadoError) {
            newInvitadoError = "Agregar Invitado";
        }

        if (newInvitadoError) {
            setErrors(prev => ({ ...prev, newInvitado: { ...prev.newInvitado, correo: newInvitadoError } }));
            console.error("Error en el correo del nuevo invitado:", newInvitadoError);
            return;
        }

        setErrors(updatedErrors);

        const missingFields = requiredFields.filter(field => !values[field]);
        if (missingFields.length > 0) {
            console.error("Campos obligatorios faltantes:", missingFields);
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirm = async () => {

        const options = {
            method : 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
            body: JSON.stringify(values),
            referrerPolicy: "no-referrer"
        };
        

        fetch("http://localhost/backend/junta.php", options)
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                setShowConfirmModal(false);
                setModalTitle("Datos Registrados");
                setModalMessage("La junta se ha creado con éxito.");
                setShowSuccessModal(true);
            }else {
                setShowConfirmModal(false);
                setModalTitle("No se ha podido crear");
                setModalMessage("Error: "+data.error);
                setShowSuccessModal(true);
            }
        })
    };

    return (
        <>
            <Container fluid id="CrearJunta" className="mainContainer d-flex justify-content-center">
                <Row className="d-flex justify-content-center mb-5" style={{ width: '80%' }}>
                    <div>
                        <Card.Title className="mt-5 mb-4 titulo">
                            Crear Junta
                        </Card.Title>
                        <Card className="card-datos d-flex justify-content-center">

                            <CardBody>
                                <Form metod="post" noValidate onSubmit={handleSubmit}>
                                    <Row>
                                        <Form.Group>
                                            <FloatingLabel controlId="floatingInput" label="Asunto de la Junta*" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="asunto"
                                                    className="input card-input"
                                                    placeholder=""
                                                    value={values.asunto}
                                                    onChange={handleInputChange}
                                                    onBlur={handleInputChange}
                                                    isInvalid={errors.asunto}
                                                    isValid={submitted && !errors.asunto && values.asunto}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.asunto}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <FloatingLabel controlId="floatingInput" label="Sala de Juntas*" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="sala"
                                                    className="input card-input"
                                                    placeholder=""
                                                    value={values.sala}
                                                    onChange={handleInputChange}
                                                    onBlur={handleInputChange}
                                                    isInvalid={errors.sala}
                                                    isValid={submitted && !errors.sala && values.sala}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.sala}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <FloatingLabel controlId="floatingInput" label="Fecha de la junta*" className="mb-3">
                                                <Form.Control
                                                    type="date"
                                                    name="fecha"
                                                    className="input card-input"
                                                    value={values.fecha}
                                                    min={today}
                                                    onChange={handleInputChange}
                                                    isInvalid={errors.fecha}
                                                    isValid={submitted && !errors.fecha && values.fecha}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.fecha}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Hora de inicio*" className="mb-3">
                                                <Form.Control
                                                    type="time"
                                                    name="hora_inicio"
                                                    className="input card-input"
                                                    value={values.hora_inicio}
                                                    onChange={handleInputChange}
                                                    isInvalid={errors.hora_inicio}
                                                    isValid={submitted && !errors.hora_inicio && values.hora_inicio}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.hora_inicio}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Hora de fin*" className="mb-3">
                                                <Form.Control
                                                    type="time"
                                                    name="hora_fin"
                                                    className="input card-input"
                                                    value={values.hora_fin}
                                                    onChange={handleInputChange}
                                                    isInvalid={errors.hora_fin}
                                                    isValid={submitted && !errors.hora_fin && values.hora_fin}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.hora_fin}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <FloatingLabel controlId="floatingInput" label="Dirección*" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="direccion"
                                                    className="input card-input"
                                                    placeholder=""
                                                    value={values.direccion}
                                                    onChange={handleInputChange}
                                                    onBlur={handleInputChange}
                                                    isInvalid={errors.direccion}
                                                    isValid={submitted && !errors.direccion && values.direccion}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.direccion}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <FloatingLabel controlId="floatingInput" label="Descripción*" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="descripcion"
                                                    className="input card-input"
                                                    placeholder=""
                                                    value={values.descripcion}
                                                    onChange={handleInputChange}
                                                    onBlur={handleInputChange}
                                                    isInvalid={errors.descripcion}
                                                    isValid={submitted && !errors.descripcion && values.descripcion}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.descripcion}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group>
                                                <FloatingLabel controlId="floatingInput" label="Correo Electrónico del Invitado*" className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        name="correo"
                                                        className="input card-input"
                                                        placeholder=""
                                                        value={newInvitado.correo}
                                                        onChange={handleNewInvitadoChange}
                                                        onBlur={handleNewInvitadoChange}
                                                        isInvalid={errors.newInvitado.correo}
                                                        isValid={!errors.newInvitado.correo && newInvitado.correo}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.newInvitado.correo}
                                                    </Form.Control.Feedback>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={9} md={4}>
                                            <Form.Group>
                                                <FloatingLabel controlId="floatingInput" label="No. acompañantes" className="mb-3">
                                                    <Form.Select
                                                        name="acompañantes"
                                                        className="card-input"
                                                        value={newInvitado.acompañantes}
                                                        onChange={handleNewInvitadoChange}
                                                    >
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3} md={2}>
                                            <Row className="justify-content-center mt-2">
                                                <Form.Group as={Col} xs="auto">
                                                    <Button className="boton" type="button" onClick={addInvitado}>
                                                        <Image src={Agregar} alt="Agregar" style={{ width: '20px' }} />
                                                    </Button>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {values.invitados.map((invitado, index) => (
                                        <div key={index}>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label={`Correo Electrónico del Invitado ${index + 1}`} className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="correo"
                                                                className="input card-input"
                                                                placeholder=""
                                                                value={invitado.correo}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={9} md={4}>
                                                    <Form.Group>
                                                        <FloatingLabel controlId="floatingInput" label="No. acompañantes" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="acompañantes"
                                                                className="input card-input"
                                                                placeholder=""
                                                                value={invitado.acompañantes}
                                                                readOnly
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={3} md={2}>
                                                    <Row className="justify-content-center mt-2">
                                                        <Form.Group as={Col} xs="auto">
                                                            <Button className="boton" type="button" onClick={() => removeInvitado(index)}>
                                                                <Image src={Eliminar} alt="Eliminar" style={{ width: '20px' }} />
                                                            </Button>
                                                        </Form.Group>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Row className="justify-content-end mt-4">
                                        <Form.Group as={Col} xs="auto">
                                            <Button className="boton" type="submit">Crear Junta</Button>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container >

            {/* Modal de confirmación */}
            <Modal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Por favor, verifica que los datos ingresados son correctos.</p>
                    {buildConfirmationMessage()}
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100 d-flex justify-content-between">
                        <Button
                            className="boton"
                            onClick={() => setShowConfirmModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button className="boton" onClick={handleConfirm}>
                            Confirmar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Modal de éxito */}
            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button className="boton" onClick={() => setShowSuccessModal(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CrearJunta;