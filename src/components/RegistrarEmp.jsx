import { Container, Card, CardBody, Row, Col, Image, Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "../CSS/Administrador.css";

function RegEmp() {
  const [values, setValues] = useState({
    correo: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    direccion: "",
    departamento: "",
    permisos: "",
    fotografia: "",
  });

  const [fotoURL, setFotoURL] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const token = localStorage.getItem("token");

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (!value) {
          error = "Este campo es obligatorio";
        } else if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
          error = "El formato del Nombre(s) es inválido";
        }
        break;
      case "apellido_paterno":
        if (!value) {
          error = "Este campo es obligatorio";
        } else if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
          error = "El formato del Apellido Paterno es inválido";
        }
        break;
      case "apellido_materno":
        if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
          error = "El formato del Apellido Materno es inválido";
        }
        break;
      case "telefono":
        if (!value) {
          error = "Este campo es obligatorio";
        } else if (!/^\d+$/.test(value)) {
          error = "El formato del Teléfono es inválido";
        } else if (value.length !== 10) {
          error = "El número de Teléfono debe tener 10 dígitos";
        }
        break;
      case "correo":
        if (!value) {
          error = "Este campo es obligatorio";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
        ) {
          error = "El formato del correo electrónico es inválido";
        }
        break;
      case "direccion":
        if(!value) {
          error = "Este campo es obligatorio";
        }
      case "departamento":
      case "permisos":
        if(value == 0) {
          error = "Este campo es obligatorio";
        }
      case "fotografia":
        if (!value) {
          error = "Este campo es obligatorio";
        }
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

    if (type === "file") {
      if (value) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFotoURL(e.target.result.split(",")[1]);
        };
        reader.readAsDataURL(value);
      } else {
        setFotoURL("");
      }
    } 

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const buildConfirmationMessage = () => {
    return (
      <div>
        <p><strong>Nombre: </strong> {values.nombre} {values.apellido_paterno} {values.apellido_materno}</p>
        <p><strong>Teléfono: </strong> {values.telefono}</p>
        <p><strong>Correo Electrónico: </strong> {values.correo}</p>
        <p><strong>Dirección: </strong> {values.direccion}</p>
        <p><strong>Departamento: </strong> {values.departamento}</p>
        <p><strong>Permisos: </strong> {values.permisos == 4 ? "Anfitrión" : "Recepcionista"}</p>
      </div >
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const updatedErrors = Object.keys(values).reduce((acc, key) => {
      acc[key] = validate(key, values[key]);
      return acc;
    }, {});

    setErrors(updatedErrors);

    const fieldErrors = Object.entries(errors).filter(
      ([key, value]) => value !== ""
    );
    const hasFieldErrors = fieldErrors.length > 0;

    const requiredFields = [
      "nombre",
      "apellido_paterno",
      "apellido_materno",
      "telefono",
      "correo",
      "direccion",
      "permisos",
      "fotografia",
    ];
    const missingFields = requiredFields.filter((field) => !values[field]);
    if (missingFields.length > 0) {
      console.error("Campos obligatorios faltantes:", missingFields);
      return;
    }

    if (hasFieldErrors) {
      console.error("Error en los campos:", Object.fromEntries(fieldErrors));
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    values.fotografia = fotoURL;

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

    fetch("http://localhost/backend/empleado.php", options)
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        setModalTitle("Datos Registrados");
        setModalMessage("El empleado se ha registrado con éxito.");
        setShowSuccessModal(true);
      }else{
        console.error(data.error);
        setModalTitle("Datos No Registrados");
        setModalMessage("Ocurrió un error al enviar los datos.");
        setShowSuccessModal(true);
      }
    });
  };

  return (
    <>
      <Container fluid id="FormInv" className="mainContainer d-flex justify-content-center">
        <Row className="d-flex justify-content-center" style={{ width: '80%' }}>
          <div>
            <Card.Title className="mb-4 titulo">
              Registrar Empleado
            </Card.Title>
            <Card className="card-datos d-flex justify-content-center">
              <CardBody>
                <Form metod="post" noValidate onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={4}>
                      <Container className="text-center mt-3">
                        <Image src={
                          fotoURL ? "data:image/jpg;base64,"+fotoURL : "https://via.placeholder.com/200"
                        } alt="Fotografía del Empleado" className="rounded-circle card-foto" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                      </Container>
                    </Col>
                    <Col xs={12} md={8}>
                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Nombre(s)*"
                            className="mt-3 mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="nombre"
                              className="input card-input"
                              value={values.nombre}
                              placeholder=""
                              onChange={handleInputChange}
                              onBlur={handleInputChange}
                              isInvalid={errors.nombre}
                              isValid={
                                submitted && !errors.nombre && values.nombre
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.nombre}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col} xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Apellido Paterno*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="apellido_paterno"
                              className="input card-input"
                              placeholder=""
                              value={values.apellido_paterno}
                              onChange={handleInputChange}
                              onBlur={handleInputChange}
                              isInvalid={errors.apellido_paterno}
                              isValid={
                                submitted && !errors.apellido_paterno && values.apellido_paterno
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.apellido_paterno}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Apellido Materno"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="apellido_materno"
                              className="input card-input"
                              placeholder=""
                              value={values.apellido_materno}
                              onChange={handleInputChange}
                              onBlur={handleInputChange}
                              isInvalid={errors.apellido_materno}
                              isValid={
                                submitted && !errors.apellido_materno && values.apellido_materno
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.apellido_materno}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Fotografía*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="file"
                              name="fotografia"
                              className="card-input"
                              accept=".jpg, .png" // Aceptar solo imágenes JPG y PNG
                              onChange={handleInputChange}
                              isInvalid={errors.fotografia}
                              isValid={submitted && !errors.fotografia && values.fotografia}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.fotografia}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Número de Teléfono*"
                          className="mt-1 mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="telefono"
                            className="input card-input"
                            placeholder=""
                            value={values.telefono}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.telefono}
                            isValid={
                              submitted && !errors.telefono && values.telefono
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.telefono}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Correo Electrónico*"
                          className="mt-1 mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="correo"
                            className="input card-input"
                            placeholder=""
                            value={values.correo}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.correo}
                            isValid={
                              submitted && !errors.correo && values.correo
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.correo}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Dirección*"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          name="direccion"
                          className="input card-input"
                          placeholder=""
                          value={values.direccion}
                          onChange={handleInputChange}
                          onBlur={handleInputChange}
                          isInvalid={errors.direccion}
                          isValid={
                            submitted && !errors.direccion && values.direccion
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.direccion}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Departamento*"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="departamento"
                            className="input card-input"
                            placeholder=""
                            value={values.departamento}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.departamento}
                            isValid={submitted && !errors.departamento && values.departamento}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.departamento}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Permisos*"
                          className="mb-3"
                        >
                          <Form.Select
                            name="permisos"
                            id="permisos"
                            className="card-input"
                            value={values.permisos}
                            onChange={handleInputChange}
                            isInvalid={errors.permisos}
                            isValid={
                              submitted && !errors.permisos && values.permisos
                            }
                          >
                            <option value="" disabled>
                              Seleccione una opción
                            </option>
                            <option value="0">Ninguno</option>
                            <option value="4">Anfitrión</option>
                            <option value="3">Recepcionista</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.permisos}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-end mt-4">
                    <Form.Group as={Col} xs="auto">
                      <Button className="boton" type="submit">
                        Registrar
                      </Button>
                    </Form.Group>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

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
          <Button className="boton" onClick={() => setShowSuccessModal(false)} type="">
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegEmp;