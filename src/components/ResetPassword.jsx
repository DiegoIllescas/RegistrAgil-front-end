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
    const [passwordMatch, setPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const [passwordErrors, setPasswordErrors] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    
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
                if(!data.success) {
                    //Modal o Alerta que no esta autorizado o el token expiro
                    alert(data.error);
                    navigate('/Inicio');
                }
              })
        }else{
            navigate('/Inicio');
        }
        const errores = generarMensajesError(newPassword);
        setPasswordErrors(errores);
        setPasswordMatch(confirmPassword === newPassword && errores.length === 0);
    },[]);

    useEffect(() => {
        const errores = generarMensajesError(newPassword);
        setPasswordErrors(errores);
        setPasswordMatch(confirmPassword === newPassword && errores.length === 0);
    }, [newPassword, confirmPassword]);

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

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value); 
    };

    // Manejador de cambio para el campo de confirmar contraseña
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value); 
        setConfirmPasswordError(value === newPassword ? "" : mensajesError.coincidencia);
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
                    alert("Contraseña modificada correctamente");
                    navigate('/LogIn');
                }else{
                    //Mostra modal, alerta, mySwal del error: data.error tiene el error
                    alert(data.error);
                    console.log(data.error);
                }
            });
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
                                                //Se modifica la validación para mostrar los mensajes de error
                                                isInvalid={passwordErrors.length > 0 }
                                                // isInvalid={!passwordMatch && intentoEnvio} // Marca el campo como inválido si las contraseñas no coinciden o no cumplen con las validaciones y se ha intentado enviar el formulario
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
                                                {/* Se modifica la forma de mostrar los mensajes (Se muestran los mensajes jajaja)*/}
                                                {passwordErrors.map((error, index) => (
                                                    <div key={index}>{error}</div>
                                                ))}
                                                {/* {!passwordMatch && "Las contraseñas no coinciden o no cumplen con los requisitos."} */}
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
                                                onBlur={handleConfirmPasswordChange}
                                                //Se hace lo mismo que en el campo anterior
                                                isInvalid={confirmPasswordError }
                                                // isInvalid={!passwordMatch && intentoEnvio} // Marca el campo como inválido si las contraseñas no coinciden o no cumplen con las validaciones y se ha intentado enviar el formulario
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {confirmPasswordError}
                                                {/* {!passwordMatch && "Las contraseñas no coinciden o no cumplen con los requisitos."} */}
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
                                            //Se comenta para que el botón esté siempre activo y se muestren los mensajes de error
                                            // disabled={!passwordMatch}
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
