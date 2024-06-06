import { Container, Card, CardBody, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState, useEffect } from "react";
import HeaderLogin from "./HeaderLogin";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [passwordMatch, setPasswordMatch] = useState(true); 
    const [passwordFormat, setPasswordFormat] = useState(false);
    const [user, setUser] = useState(0);
    const navigate = useNavigate();

    
    const token = new URLSearchParams(useLocation().search).get("token");

    useEffect(() => {
        if(token){
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

              fetch("http://localhost/backend/clave.php", options)
              .then(response => response.json())
              .then(data => {
                if(data.success) {
                    setUser(data.content);
                }else{
                    //Modal o Alerta de que el token expiro
                    //El error especifico se encuentra en data.error
                    navigate('/Inicio');
                }
              })
        }else{
            navigate('/Inicio');
        }
    },[]);

    // Mensajes de error para las validaciones de contraseña
    const mensajesError = {
        longitud: "La contraseña debe tener al menos 8 caracteres.",
        mayusculas: "La contraseña debe contener al menos una mayúscula.",
        minusculas: "La contraseña debe contener al menos una minúscula.",
        numeros: "La contraseña debe contener al menos un número.",
        caracteres: "La contraseña debe contener al menos un caracter especial.",
        coincidencia: "Las contraseñas no coinciden."
    };

    // Función para generar mensajes de error basados en las validaciones de contraseña
    const generarMensajesError = (password) => {
        const errores = [];
        if (password.length < 8) errores.push(mensajesError.longitud);
        if (!/(?=.*[a-z])/.test(password)) errores.push(mensajesError.minusculas);
        if (!/(?=.*[A-Z])/.test(password)) errores.push(mensajesError.mayusculas);
        if (!/(?=.*\d)/.test(password)) errores.push(mensajesError.numeros);
        if (!/(?=.*[^\da-zA-Z])/.test(password)) errores.push(mensajesError.caracteres);
        return errores;
    };

    // Manejador de cambio para el campo de nueva contraseña
    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value); 
        const errores = generarMensajesError(value);
        setPasswordMatch(value === confirmPassword)
        setPasswordFormat(errores.length === 0);
    };

    // Manejador de cambio para el campo de confirmar contraseña
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value); 
        setPasswordMatch(newPassword === value && generarMensajesError(newPassword).length === 0); // Verifica si la confirmación de la contraseña coincide con la nueva contraseña y si no hay errores
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMatch) {
            
            const options = {
                method : 'PATCH',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+ token
                },
                body : JSON.stringify({'clave' : newPassword}),
                referrerPolicy: "no-referrer"
            };

            fetch("http://localhost/backend/usuario.php", options)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    //Mostrar confirmacion con alerta, modal o mySwal

                    navigate('/LogIn');
                }else{
                    //Mostra modal, alerta, mySwal del error: data.error tiene el error
                    console.log(data.error);
                }
            });

            navigate("/LogIn");
        } else {
            console.log("Las contraseñas no coinciden o no cumplen con los requisitos.");
        }
    };


    const handleCancelar = () => {
        navigate("/Inicio");
    };

    return (
        <>
            <HeaderLogin />
            <br />
            <Container
                fluid
                id="login"
                className="mainContainer d-flex justify-content-center align-items-center"
            >
                <Row className="d-flex justify-content-center">
                    <h2>Restablecimiento de Contraseña</h2>
                </Row>
            </Container>
            <br></br>
            <Container
                fluid
                id="login"
                className="mainContainer d-flex justify-content-center"
            >
                <Row className="d-flex justify-content-center">
                    <Card className="card-container d-flex justify-content-center">
                        <CardBody>
                            <Card.Title className="text-center"></Card.Title>
                            <p className="mb-3" style={{ textAlign: "center" }}>
                                Ingresa una nueva contraseña para tu cuenta, la contraseña debe contener<br />
                                mayúsculas, minúsculas, números y caracteres, así como un número <br />
                                mínimo de tamaño de 8 valores. Confirma tu contraseña y podrás <br />
                                ingresar a tu cuenta.
                            </p>
                            <br></br>
                            <Form method="post" onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group as={Col}>
                                        <FloatingLabel
                                            controlId="newPassword"
                                            label="Nueva Contraseña"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                placeholder="Introduce tu nueva contraseña"
                                                value={newPassword}
                                                onChange={handleNewPasswordChange}
                                                onBlur={handleNewPasswordChange}
                                                isInvalid={!passwordFormat} // Marca el campo como inválido si las contraseñas no coinciden o no cumplen con las validaciones y se ha intentado enviar el formulario
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {!passwordFormat && "Las contraseña no cumple con los requisitos."}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <FloatingLabel
                                            controlId="confirmPassword"
                                            label="Confirmar Contraseña"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirma tu nueva contraseña"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                isInvalid={!passwordMatch} // Marca el campo como inválido si las contraseñas no coinciden o no cumplen con las validaciones y se ha intentado enviar el formulario
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {!passwordMatch && "Las contraseñas no coinciden"}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <br></br>
                                <Row className="justify-content-center" style={{ textAlign: "center" }}>
                                    <Form.Group as={Col} xs={6}>
                                        <Button variant="secondary" type="button" onClick={handleCancelar}>
                                            Cancelar
                                        </Button>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={6}>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={!passwordMatch || !passwordFormat}
                                        >
                                            Aceptar
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

export default ResetPassword;
