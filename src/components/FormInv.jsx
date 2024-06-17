import { Container, Card, CardBody, CardText, Row, Col, Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Administrador.css";
import BarraSuperiorForm from "./BarraSuperiorForm";
import { FooterPG } from "../Footer";

function FormInv() {
    const token = new URLSearchParams(useLocation().search).get("token");
    const navigate = useNavigate();

    const initialValues = ({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
        empresa: "",
        documento: "",
        fotografia: "",
        acompañantes: null,
        dispositivos: null,
        automovil: null
    });

    const [values, setValues] = useState(initialValues);
    const fileInputRef = useRef(null);
    const [no_acomp, setNumAcom] = useState(2);
    const [acom, setAcom] = useState(false);
    const [auto, setAuto] = useState(false);
    const [disps, setDisps] = useState(0);
    const [fotoURL, setFotoURL] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
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

          fetch("http://localhost/backend/invitacion.php", options)
          .then(response => response.json())
          .then(data => {
            if(data.success) {
                setNumAcom(parseInt(data.maxAcom));
                if(data.alreadyExist) {

                }
            }else{
                navigate('/Inicio');
            }
          })
    },[]);

    const validate = (name, value) => {
        let error = "";
        switch (name) {
            case 'nombre':
                if (!value) {
                    error = "Este campo es obligatorio";
                } else if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
                    error = "El formato del Nombre(s) es inválido";
                }
                break;
            case 'apellido_paterno':
                if (!value) {
                    error = "Este campo es obligatorio";
                } else if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
                    error = "El formato del Apellido Paterno es inválido";
                }
                break;
            case 'apellido_materno':
                if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/.test(value)) {
                    error = "El formato del Apellido Materno es inválido";
                }
                break;
            case 'telefono':
                if (!value) {
                    error = "Este campo es obligatorio";
                } else if (!/^\d+$/.test(value)) {
                    error = "El formato del Número de Teléfono es inválido";
                } else if (value.length !== 10) {
                    error = "El Número de Teléfono debe tener 10 dígitos";
                }
                break;

            case 'empresa':
            case 'documento':
            case 'fotografia':
                if (!value) {
                    error = "Este campo es obligatorio";
                }
                break;
            case 'correoAcompañante1':
                if (acom && !value) {
                    error = "Este campo es obligatorio";
                } else if (acom && value && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
                    error = "El formato del correo electrónico es inválido";
                }
                break;
            case 'correoAcompañante2':
                if (acom && value && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
                    error = "El formato del correo electrónico es inválido";
                }
                break;
            case 'modelo1':
            case 'serie1':
                if (!value && parseInt(values.dispositivos) >= 1) {
                    error = "Este campo es obligatorio";
                }
                break;
            case 'modelo2':
            case 'serie2':
                if (!value && parseInt(values.dispositivos) >= 2) {
                    error = "Este campo es obligatorio";
                }
                break;
            case 'modelo3':
            case 'serie3':
                if (!value && parseInt(values.dispositivos) == 3) {
                    error = "Este campo es obligatorio";
                }
                break;
            case 'modelo':
            case 'placa':
                if (auto && !value) {
                    error = "Este campo es obligatorio";
                }
                break;
            case 'color':
                if (auto && !value) {
                    error = "Este campo es obligatorio";
                } else if (value && /[^a-zA-Z ]/.test(value)) {
                    error = "El formato del Color del Automóvil es inválido";
                }
                break;
            default:
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
                setValues(prev => ({
                  ...prev,
                  fotografia : e.target.result.split(",")[1]
                }));
              };
              reader.readAsDataURL(value);
            } else {
              setFotoURL("");
            }
            if (e.target.files.length > 0) {
                const fotoURL = URL.createObjectURL(e.target.files[0]);
                
                setFotoURL(fotoURL);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ""
                }));
            } else {
                
                setFotoURL("");
                const error = validate(name, value);
                setErrors(prev => ({
                    ...prev,
                    [name]: error
                }));
            }
            return;
        } else {
            if(name === "modelo" || name === "placa" || name === "color") {
              setValues(prev => ({
                ...prev,
                automovil: {
                  ...prev.automovil,
                  [name] : value
                }
              }));
              return;
            }

            if(no_acomp == 2) {
              if(name === "correoAcompañante1") {
                setValues(prev => ({
                  ...prev,
                  acompañantes : prev.acompañantes.map((item, i) => (i === 0 ? {correo : value} : item))
                }));
                return;
              }else if(name === "correoAcompañante2") {
                setValues(prev => ({
                  ...prev,
                  acompañantes : prev.acompañantes.map((item, i) => (i === 1 ? {correo : value} : item))
                }));
                return;
              }
              
            }else{
              if(name === "correoAcompañante1") {
                setValues(prev => ({
                  ...prev,
                  acompañantes: [{correo : value}]
                }));
                return;
              }
            }

            if(name.startsWith("modelo") || name.startsWith("serie")){
              switch(disps){
                case 1:
                  if(name === "modelo1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : [
                        { modelo : value , serie : prev.dispositivos[0].serie}                        
                      ]
                    }));
                    return;
                  }
                  if(name === "serie1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : [
                        { modelo : prev.dispositivos[0].modelo , serie : value}                        
                      ]
                    }));
                    return;
                  }
                  break;
                case 2:
                  if(name == "modelo1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 0 ? {modelo : value, serie: prev.dispositivos[0].serie} : item))
                    }));
                    return;
                  }
                  if(name == "modelo2") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 1 ? {modelo : value, serie: prev.dispositivos[1].serie} : item))
                    }));
                    return;
                  }
                  if(name == "serie1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 0 ? {modelo : prev.dispositivos[0].modelo, serie: value} : item))
                    }));
                    return;
                  }
                  if(name == "serie2") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 1 ? {modelo : prev.dispositivos[1].modelo, serie: value} : item))
                    }));
                    return;
                  }
                  break;
                case 3:
                  if(name == "modelo1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 0 ? {modelo : value, serie: prev.dispositivos[0].serie} : item))
                    }));
                    return;
                  }
                  if(name == "modelo2") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 1 ? {modelo : value, serie: prev.dispositivos[1].serie} : item))
                    }));
                    return;
                  }
                  if(name == "modelo3") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 2 ? {modelo : value, serie: prev.dispositivos[2].serie} : item))
                    }));
                    return;
                  }
                  if(name == "serie1") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 0 ? {modelo : prev.dispositivos[0].modelo, serie: value} : item))
                    }));
                    return;
                  }
                  if(name == "serie2") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 1 ? {modelo : prev.dispositivos[1].modelo, serie: value} : item))
                    }));
                    return;
                  }
                  if(name == "serie3") {
                    setValues(prev => ({
                      ...prev,
                      dispositivos : prev.dispositivos.map((item, index) => (index == 2 ? {modelo : prev.dispositivos[2].modelo, serie: value} : item))
                    }));
                    return;
                  }
                  break;
              }
            }

            setValues(prev => ({
              ...prev,
              [name] : value
            }));
            

            if (!acom) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    correoAcompañante1: "",
                    correoAcompañante2: "",
                }));
            } else if (!auto) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    modelo: "",
                    placa: "",
                    color: "",
                }));
            } else if (name === "dispositivos") {
                const numDispositivos = parseInt(value, 3);
                setErrors(prevErrors => {
                    const newErrors = { ...prevErrors };
                    Object.keys(newErrors).forEach(key => {
                        if (key.startsWith('modelo') || key.startsWith('serie')) {
                            delete newErrors[key];
                        }
                    });
                    for (let i = 1; i <= numDispositivos; i++) {
                        newErrors[`modelo${i}`] = prevErrors[`modelo${i}`] || '';
                        newErrors[`serie${i}`] = prevErrors[`serie${i}`] || '';
                    }
                    return newErrors;
                });
            }
            else {
                const error = validate(name, value);
                setErrors(prev => ({
                    ...prev,
                    [name]: error
                }));
            }
        }
    };

    const renderDeviceFields = () => {
        let fields = [];
        for (let i = 1; i <= disps; i++) {
            fields.push(
                <div key={`dispositivo${i}`}>
                    <CardText>Dispositivo {i}</CardText>
                    <Row>
                        <Form.Group>
                            <FloatingLabel controlId="floatingInput" label={`Modelo*`} className="mb-3">
                                <Form.Control
                                    type="text"
                                    name={`modelo${i}`}
                                    className="input card-input"
                                    placeholder=""
                                    value={values.dispositivos[i-1].modelo}
                                    onChange={handleInputChange}
                                    onBlur={handleInputChange}
                                    isInvalid={errors[`modelo${i}`]}
                                    isValid={submitted && !errors[`modelo${i}`] && values.dispositivos[i-1].modelo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors[`modelo${i}`]}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <FloatingLabel controlId="floatingInput" label={`Número de serie*`} className="mb-3">
                                <Form.Control
                                    type="text"
                                    name={`serie${i}`}
                                    className="input card-input"
                                    placeholder=""
                                    value={values.dispositivos[i-1].serie}
                                    onChange={handleInputChange}
                                    onBlur={handleInputChange}
                                    isInvalid={errors[`serie${i}`]}
                                    isValid={submitted && !errors[`serie${i}`] && values.dispositivos[i-1].serie}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors[`serie${i}`]}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                </div>
            );
        }
        return fields;
    };

    const buildConfirmationMessage = () => {
        return (
            <div>
                {fotoURL && (
                    <div className="text-center mb-3">
                        <img src={fotoURL} alt="Fotografía del invitado" className="rounded-circle" style={{ width: '130px', height: '130px', objectFit: 'cover' }} />
                    </div>
                )}
                <p><strong>Nombre: </strong> {values.nombre} {values.apellido_paterno} {values.apellido_materno}</p>
                <p><strong>Teléfono: </strong> {values.telefono}</p>
                <p><strong>Empresa: </strong> {values.empresa}</p>
                <p><strong>Documento: </strong> {values.documento}</p>

                {acom && (
                    <>
                        <p><strong>Acompañantes:</strong> {values.acompañantes.length > 1  ? 2 : 1}</p>
                        <p className="ms-4">1. {values.acompañantes[0].correo}</p>
                        {values.acompañantes.length > 1  && <p className="ms-4">2. {values.acompañantes[1].correo}</p>}
                    </>
                )}

                {disps && (
                    <>
                        <p><strong>Dispositivos:</strong> {disps}</p>
                        {Array.from({ length: disps }).map((_, index) => (
                            <div key={`dispositivo${index + 1}`}>
                                <p className="ms-4"><strong>Dispositivo {index + 1}:</strong></p>
                                <p className="ms-5">Modelo: {values.dispositivos[index].modelo}</p>
                                <p className="ms-5">Serie: {values.dispositivos[index].serie}</p>
                            </div>
                        ))}
                    </>
                )}

                {auto && (
                    <>
                        <p><strong>Automóvil:</strong></p>
                        <p className="ms-4">Modelo: {values.automovil.modelo}</p>
                        <p className="ms-4">Placa: {values.automovil.placa}</p>
                        <p className="ms-4">Color: {values.automovil.color}</p>
                    </>
                )}
            </div>
        );
    };

    const handleAuto = (e) => {
        const value = e.target.value;
        setAuto(value.toLowerCase() === "true");
        if(value.toLowerCase() === "true") {
          setValues(prev => ({
            ...prev,
            automovil : {
              modelo : "",
              color: "",
              placa: ""
            }
          }));
        }else{
          setValues(prev => ({
            ...prev,
            automovil : null
          }));
        }
    };

    const handleAcom = (e) => {
      const value = e.target.value;
      setAcom(value.toLowerCase() === "true");
      if(value.toLowerCase() === "true") {
        switch (no_acomp) {
          case 1:
            setValues(prev => ({
              ...prev,
              acompañantes: [ {correo : ""}, ]
            }));
            break;
          case 2:
            setValues(prev => ({
              ...prev,
              acompañantes: [ {correo : ""}, {correo : ""}  ]
            }));
            break;
          default:
            setValues(prev => ({
              ...prev,
              acompañantes: []
            }));
        }
      }else{
        setValues(prev => ({
          ...prev,
          acompañantes: null
        }));
      }
    }

    const handleDisps = (e) => {
      const value = e.target.value;
      setDisps(parseInt(value));

      switch(parseInt(value)) {
        case 1:
          setValues(prev => ({
            ...prev,
            dispositivos : [ 
              { modelo : "", serie : ""}
             ]
          }));
          break;
        case 2:
          setValues(prev => ({
            ...prev,
            dispositivos : [ 
              { modelo : "", serie : ""},
              { modelo : "", serie : ""}
             ]
          }));
          break;
        case 3:
          setValues(prev => ({
            ...prev,
            dispositivos : [ 
              { modelo : "", serie : ""},
              { modelo : "", serie : ""},
              { modelo : "", serie : ""}
             ]
          }));
          break;
        default:
          setValues(prev => ({
            ...prev,
            dispositivos : null
          }));
          break;
      }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
/*
        const updatedErrors = Object.keys(values).reduce((acc, key) => {
            acc[key] = validate(key, values[key]);
            return acc;
        }, {});

        setErrors(updatedErrors);

        const fieldErrors = Object.entries(updatedErrors).filter(([key, value]) => value !== '');
        const hasFieldErrors = fieldErrors.length > 0;

        const requiredFields = ['nombre', 'apellido_paterno', 'apellido_materno', 'telefono', 'empresa', 'fotografia', 'documento'];
        const missingFields = requiredFields.filter(field => !values[field]);
        if (missingFields.length > 0) {
            console.error("Campos obligatorios faltantes:", missingFields);
            return;
        }

        if (hasFieldErrors) {
            console.error("Error en los campos:", Object.fromEntries(fieldErrors));
            return;
        }
*/
        if (acom && values.acompañantes.length == 0) {
            console.error("Información faltante de acompañantes");
            return;
        }

        if (auto && (!values.automovil.modelo || !values.automovil.placa || !values.automovil.color)) {
            console.error("Información faltante del automóvil");
            return;
        }

        if (disps) {
            for (let i = 1; i <= disps; i++) {
                if (!values.dispositivos[i-1].modelo || !values.dispositivos[i-1].serie) {
                    console.error("Campos faltantes de dispositivos");
                    return;
                }
            }
        }

        setShowConfirmModal(true);
    };

    const handleConfirm = async () => {
        setShowConfirmModal(false);
        
        const options = {
            method: 'PUT',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
            referrerPolicy: "no-referrer"
        };

        fetch("http://localhost/backend/Invitacion.php", options)
        .then(response => response.json())
        .then(data => {
            if(data.success){
                setModalTitle("Datos Registrados");
                setModalMessage("Tus datos se han registrado con éxito. Se ha enviado a tu correo electrónico tu usuario y contraseña para iniciar sesión y ver tu código QR de acceso.");
                
            }else{
              setModalTitle(data.error);
              setModalMessage("Ya confirmaste tu asistencia a este evento");
              
            }
        })
        
        setShowSuccessModal(true);
    };

    return (
        <>
      <BarraSuperiorForm></BarraSuperiorForm>
      <Container
        fluid
        id="FormInv"
        className="mainContainer d-flex justify-content-center m-0"
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <Row
          className="d-flex justify-content-center m-0"
          style={{ width: "60%" }}
        >
          <Card className="card-datos d-flex justify-content-center">
            <CardBody>
              <Card.Title className="mt-2 mb-4 titulo">
                Registro de Invitados
              </Card.Title>
              <Card.Text className="mb-4">
                Para completar su registro, ingrese los siguientes datos.
              </Card.Text>
              <Form method="post" noValidate onSubmit={handleSubmit}>
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Nombre(s)*"
                      className="mb-3"
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
                        isValid={submitted && !errors.nombre && values.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} lg={6}>
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
                  <Form.Group as={Col} xs={12} lg={6}>
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
                      label="Número de Teléfono*"
                      className="mb-3"
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
                </Row>
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Empresa en la que trabaja*"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="empresa"
                        className="input card-input"
                        placeholder=""
                        value={values.empresa}
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                        isInvalid={errors.empresa}
                        isValid={submitted && !errors.empresa && values.empresa}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.empresa}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Documento de identidad*"
                      className="mb-3"
                    >
                      <Form.Select
                        name="documento"
                        id="documento"
                        value={values.documento}
                        className="card-input"
                        onChange={handleInputChange}
                        isInvalid={errors.documento}
                        isValid={
                          submitted && !errors.documento && values.documento
                        }
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="Credencial para votar">Credencial para votar</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Cartilla del Servicio Militar">Cartilla del Servicio Militar</option>
                        <option value="Licencia o permiso para conducir">Licencia o permiso para conducir</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.documento}
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
                        ref={fileInputRef}
                        onChange={handleInputChange}
                        isInvalid={errors.fotografia}
                        isValid={
                          submitted && !errors.fotografia && values.fotografia
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fotografia}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                {no_acomp > 0 && (
                  <Row>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="¿Llevará acompañantes?*"
                        className="mb-3"
                      >
                        <Form.Select
                          name="acompañantes"
                          id="acompañantes"
                          className="card-input"
                          value={acom.toString()}
                          onChange={handleAcom}
                        >
                          <option value="false">No</option>
                          <option value="true">Si</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                )}
                {acom && (
                  <>
                    <Row>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Correo Electrónico del Acompañante 1*"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="correoAcompañante1"
                            className="input card-input"
                            placeholder=""
                            value={values.acompañantes[0].correo}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.correoAcompañante1}
                            isValid={
                              submitted &&
                              !errors.correoAcompañante1 &&
                              values.acompañantes[0].correo
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.correoAcompañante1}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Row>
                    {no_acomp === 2 && (
                      <Row>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Correo Electrónico del Acompañante 2*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="correoAcompañante2"
                              className="input card-input"
                              placeholder=""
                              value={values.acompañantes[1].correo}
                              onChange={handleInputChange}
                              onBlur={handleInputChange}
                              isInvalid={errors.correoAcompañante2}
                              isValid={
                                submitted &&
                                !errors.correoAcompañante2 &&
                                values.acompañantes[1].correo
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.correoAcompañante2}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>
                      </Row>
                    )}
                  </>
                )}
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Número de dispositivos que llevará*"
                      className="mb-3"
                    >
                      <Form.Select
                        name="dispositivos"
                        id="dispositivos"
                        className="card-input"
                        value={disps.toString()}
                        onChange={handleDisps}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                {renderDeviceFields()}
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="¿Llevará automóvil?*"
                      className="mb-3"
                    >
                      <Form.Select
                        name="automovil"
                        id="automovil"
                        value={auto.toString()}
                        className="card-input"
                        onChange={handleAuto}
                        onBlur={handleAuto}
                      >
                        <option value="false">No</option>
                        <option value="true">Si</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                {auto && (
                  <>
                    <Row>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Modelo*"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="modelo"
                            className="input card-input"
                            placeholder=""
                            value={values.automovil.modelo}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.modelo}
                            isValid={
                              submitted && !errors.modelo && values.automovil.modelo
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.modelo}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Placa*"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="placa"
                            className="input card-input"
                            placeholder=""
                            value={values.automovil.placa}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.placa}
                            isValid={submitted && !errors.placa && values.automovil.placa}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.placa}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Color*"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="color"
                            className="input card-input"
                            placeholder=""
                            value={values.automovil.color}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            isInvalid={errors.color}
                            isValid={submitted && !errors.color && values.automovil.color}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.color}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Row>
                  </>
                )}
                <Row className="justify-content-end mt-4">
                  <Form.Group as={Col} xs="auto">
                    <Button className="boton" type="submit">
                      Enviar
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </CardBody>
          </Card>
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
        <Modal.Body>
          {modalMessage}
          <p className="mt-3">Se ha enviado a tu correo electrónico tu usuario y contraseña para iniciar sesión y ver tu código QR de acceso.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="boton" onClick={() => {setShowSuccessModal(false); navigate('/Inicio');}}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
      <FooterPG></FooterPG>
    </>
    );
}

export default FormInv;