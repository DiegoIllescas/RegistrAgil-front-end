import { Container, Row, Col, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaJuntas from "./TablaJuntas";
import "./GestionarJuntas.css";
import "../CSS/Administrador.css";

function GestionarJuntas() {
  const [juntas, setJuntas] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const [peticionRealizada, setPeticion] = useState(true);
  const invitados = [
    { nombre: "Fernando Martinez Lopez", correo: "fermar@gmail.com" },
    { nombre: "Ignacio Flores Estrada", correo: "ign6flor@outlook.com" },
    { nombre: "Mariana Jimenes Bonilla", correo: "mari789@gmail.com" },
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getDataTable(url) {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success) {
        //console.log(json.juntas);
        setJuntas(json.juntas); 
      } else {
        console.log(json.error);
        navigate('/LogIn')
      }
    }
    getDataTable(
      "http://localhost/backend/junta.php"
    );
    setPeticion(true);
  }, []);

  return (
    <>
      <Container className="mainContainer d-flex justify-content-center">
        <div id="tablaJuntas">
          <h1 className="text-red">Gestionar Juntas</h1>
          <Form>
            <Row>
              <Form.Group
                as={Col}
                xs={{ order: "last" }}
                sm={{ span: 3, offset: 2 }}
                controlId="personasGroup"
              >
                <FloatingLabel
                  controlId="floatingPersonas"
                  label="Responsable/ Asunto"
                  className="input"
                >
                  <Form.Control
                    type="text"
                    placeholder="Ej. Junta mensual"
                    className="input"
                    aria-label="Small"
                    value={textoFiltro}
                    onChange={(e) => {
                      setTextoFiltro(e.currentTarget.value);
                      setPaginaActual(1);
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
          </Form>
          <TablaJuntas
            juntas={juntas}
            filtro={textoFiltro}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
            setPeticion={setPeticion}
          />
        </div>
      </Container>
    </>
  );
}

export default GestionarJuntas;
