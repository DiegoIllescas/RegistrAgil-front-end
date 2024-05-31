import { Container, Card, CardBody, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import { useNavigate } from "react-router-dom";

function RecoverPassword() {
    const [email, setEmail] = useState(""); 
    const [emailValido, setEmailValido] = useState(true); 
    const navigate = useNavigate();

 
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value); 
        setEmailValido(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/.test(value));
    };

    const handleCancelar = () => {
        navigate("/LogIn");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailValido) {
            const options = {
                method : 'PATCH',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({'correo' : email}) ,
                referrerPolicy: "no-referrer"
            };

            fetch("http://localhost/backend/auth.php", options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log("Success");
                    //Aqui se habilitaria un modal o ventana emergente para avisarle que se envio a su correo el siguiente paso

                    //Al aceptar o se muestra otra pantalla o se direcciona al inicio
                    navigate('/Inicio');
                }else{
                    //Aqui iria que no se pudo que lo intente mas tarde, el mensaje especifico de error se encuentra en la respuesta como: data.error
                    console.log("Failed");
                }
            });
        }
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
                    <h2>Recuperación de Contraseña</h2>
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
                                Si olvidaste tu contraseña puedes recuperarla ingresando tu correo electrónico aquí.<br />
                                Se te enviará un correo donde podrás cambiar tu contraseña.
                            </p>
                            <br></br>
                            <Form method="post" onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group as={Col}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Correo Electrónico"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="email"
                                                placeholder="Introduce tu correo electrónico"
                                                value={email}
                                                onChange={handleEmailChange}
                                                onBlur={handleEmailChange}
                                                isInvalid={!emailValido} 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {!emailValido && "Por favor ingresa un correo electrónico válido"}
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
                                            disabled={!emailValido || email === ""} 
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

export default RecoverPassword;
