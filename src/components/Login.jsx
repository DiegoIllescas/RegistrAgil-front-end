import { Container, Card, CardBody, Row, Col, Image, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import { FooterPG } from "../Footer";
import "../CSS/Administrador.css";
import { useNavigate } from "react-router-dom";
import IconoUsuario from "../imgs/usuario.png";
import { Link } from "react-router-dom";

function LogIn() {
  const [inicioValidado, validarForm] = useState(false);
  const [usuarioInvalido, validarUsuario] = useState(false);
  const [passInvalido, validarPass] = useState(false);
  const [correo, setCorreo] = useState("");
  const [pass, setPassword] = useState("");

  const [passText, setPassText] = useState("Por favor llena todos los campos");
  const [userText, setUserText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPassText("Por favor llena todos los campos");
      validarForm(true);
    } else {
      validarForm(false);
      const jsonData = {
        correo : correo,
        password : pass
      }

      const options = {
        method : 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData),
        referrerPolicy: "no-referrer"
      };

      fetch("http://localhost/backend/auth.php", options)
      .then(response => response.json())
      .then(data => {
        if(data.success){
          localStorage.setItem("token", data.content.token);
          localStorage.setItem("permisos", data.permisos);
          switch (data.permisos) {
            case 1:
              navigate('/Administrador');
              break;
            case 2:
              navigate('/Invitado');
              break;
            case 3:
              navigate('/Recepcionista');
              break;
            case 4:
              navigate('/Anfitrion');
              break;    
          }

        }else{
          setPassText("Usuario o Contraseña incorrectos");
          console.log(data.error);
        }
      });
    }
  };

  return (
    <>
      <HeaderLogin></HeaderLogin>
      <Container fluid id="login" className="mainContainer d-flex justify-content-center mt-5 mb-5">
        <Row className="d-flex justify-content-center mb-5">
          <Card.Title className="text-center mb-4 titulo fw-bold">Iniciar Sesión</Card.Title>
          <Card className="card-datos d-flex justify-content-center">
            <CardBody>
              <Card.Title className="text-center">
                <Image
                  src={IconoUsuario}
                  alt="Icono Usuario"
                  width="100px"
                  height="100px"
                  roundedCircle
                  className="mt-4 mb-3 card-foto"
                />
              </Card.Title>
              <Form
                method="post"
                noValidate
                validated={inicioValidado}
                onSubmit={handleSubmit}
              >
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="email"
                        placeholder=""
                        name="user"
                        className="input card-input"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        onBlur={(e) => setCorreo(e.target.value)}
                        isInvalid={usuarioInvalido}
                      />
                      <Form.Control.Feedback type="invalid">
                        {userText}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Contraseña"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="password"
                        placeholder=""
                        name="pass"
                        className="input card-input"
                        value={pass}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={passInvalido}
                      />
                      <Form.Control.Feedback type="invalid">
                        {passText}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="justify-content-center mb-2">
                  <Form.Group as={Col} xs="auto">
                    <Button className="boton" type="submit">
                      Iniciar Sesión
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="justify-content-center mb-3">
                  <Form.Group as={Col} xs="auto">
                    <Link to={"/RecoverPassword"}>¿Olvidaste tu contraseña?</Link>
                  </Form.Group>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
      <FooterPG></FooterPG>
    </>
  );
}

export default LogIn;