import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import EditarJuntas from "./EditarJuntas";
import BorrarJuntas from "./BorrarJuntas";
import VerInvitados from "./VerInvitados";
import { useEffect, useState } from "react";

function TablaJuntas({
  juntas,
  invitados,
  filtro,
  paginaActual,
  setPaginaActual,
  setPeticion,
}) {
  const [paginacion, setPaginacion] = useState([]);
  const [datosObtenidos, setDatosObtenidos] = useState(false);
  const [rows, setRows] = useState([]);
  const juntasMaximas = 2;

  useEffect(() => {
    console.log(juntas);
    let contador = 0;
    let control = 0;
    let pag = [];
    let filas = [];
    juntas.forEach((junta) => {
      let nombreAnfitrion =
        junta.anfitrion_nombre +
        " " +
        junta.anfitrion_apellido_paterno +
        " " +
        junta.anfitrion_apellido_materno;
      if (
        (nombreAnfitrion + " " + junta.reunion_concepto)
          .toLowerCase()
          .indexOf(filtro.toLowerCase()) === -1
      ) {
        return;
      }
      /*if (estatus != 0) {
            if (invitacion.ID_EST != estatus) {
              return;
            }
          }*/

      contador++;
      control = contador - juntasMaximas * (paginaActual - 1);
      if (control <= 0 || control > juntasMaximas) {
        return;
      }
      filas.push(
        <Container
          className="card-datos d-flex justify-content-center"
          key={contador}
        >
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={junta.reunion_fecha}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Hora de Inicio</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={junta.reunion_horaInicio}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Hora de Fin</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={junta.reunion_horaFin}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Anfitrion</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={nombreAnfitrion}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Asunto de la junta</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={junta.reunion_concepto}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Sala</Form.Label>
                    <Form.Control
                      className="input card-input"
                      value={junta.reunion_sala}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      className="input card-input"
                      as="textarea"
                      value={junta.reunion_descripcion}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>Lista de Invitados</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <VerInvitados invitados={invitados} />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>Editar Junta</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <EditarJuntas setPeticion={setPeticion} junta={junta} />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>Borrar Junta</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <BorrarJuntas setPeticion={setPeticion} junta={junta} />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    });
    /*<tr key={contador}>
            <td>{nombreAnfitrion}</td>
            <td>{junta.reunion_concepto}</td>
            <td>{junta.reunion_fecha}</td>
            <td>{junta.reunion_horaInicio}</td>
            <td>{junta.reunion_horaFin}</td>
            <td>{junta.reunion_sala}</td>
            <td>{junta.reunion_descripcion}</td>
            <td>
              <VerInvitados invitados={invitados} />
            </td>
            <td>
              <EditarJuntas setPeticion={setPeticion} junta={junta} />

              <BorrarJuntas setPeticion={setPeticion} junta={junta} />
            </td>
          </tr>*/
    setRows(filas);
    var paginasMaximas = Math.ceil(contador / juntasMaximas);
    console.log(contador);
    for (let index = 1; index <= paginasMaximas; index++) {
      console.log("Entra al for " + paginasMaximas);
      pag.push(
        <Pagination.Item
          key={index}
          active={index === paginaActual}
          onClick={() => setPaginaActual(index)}
        >
          {index}
        </Pagination.Item>
      );
    }
    setPaginacion(pag);
  }, [juntas, paginaActual]);

  return (
    <>
      {rows}

      <Container className="paginacion">
        <Row>
          <Pagination as={Col} variant="danger">
            <Pagination.First />
            <Pagination.Prev />
            {paginacion}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </Row>
      </Container>
    </>
  );
}
export default TablaJuntas;
