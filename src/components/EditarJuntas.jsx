import { Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputGroup from "react-bootstrap/InputGroup";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";

const MySwal = withReactContent(Swal);

async function solicitarEdicion(url, data) {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Authorization" : "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function EditarJuntas({ setPeticion, junta }) {
  function Edicion() {
    MySwal.fire({
      title: `<span class="fontSpecial">Editar junta</span>`,
      cancelButtonColor: "#a7000f",
      padding: "3em",
      width: 800,
      color: "#a7000f",
      animation: true,
      html: (
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Asunto</InputGroup.Text>
            <Form.Control
              id={"asunto" + junta.id}
              defaultValue={junta.asunto}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Fecha</InputGroup.Text>
            <Form.Control
              id={"fecha" + junta.id}
              defaultValue={junta.fecha}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Hora de Inicio</InputGroup.Text>
            <Form.Control
              id={"horarioI" + junta.id}
              defaultValue={junta.hora_inicio}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Hora de Fin</InputGroup.Text>
            <Form.Control
              id={"horarioF" + junta.id}
              defaultValue={junta.hora_fin}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Sala</InputGroup.Text>
            <Form.Control
              id={"sala" + junta.id}
              defaultValue={junta.sala}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Descripción</InputGroup.Text>
            <Form.Control
              id={"descripcion" + junta.id}
              defaultValue={junta.descripcion}
            />
          </InputGroup>
        </Form>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      reverseButtons: true,
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        try {
          solicitarEdicion(
            "http://localhost/backend/junta.php",
            {
              id_junta: junta.id,
              descripcion: document.getElementById("descripcion" + junta.id).value,
              hora_inicio: document.getElementById("horarioI" + junta.id).value,
              hora_fin: document.getElementById("horarioF" + junta.id).value,
              fecha: document.getElementById("fecha" + junta.id).value,
              sala: document.getElementById("sala" + junta.id).value,
              asunto: document.getElementById("asunto" + junta.id).value,
            }
          ).then((data) => {
            if (!data || data === null) {
              console.log("No hubo respuesta");
            }
            if (data.success) {
              setPeticion(false);
              Swal.fire({
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Cerrar",
                cancelButtonColor: "#a7000f",
                padding: "3em",
                width: 800,
                color: "#00a70f",
                animation: true,
                title: "Edicion correcta",
                text: data.message,
              });
            } else {
              Swal.fire({
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: "#a7000f",
                padding: "3em",
                width: 800,
                color: "#a7000f",
                animation: true,
                title: "Error",
                text: data.error,
              });
            }

            // JSON data parsed by `data.json()` call
          });
        } catch (error) {
          Swal.showValidationMessage(`
            Edicion fallida: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return <Icon.PencilSquare size={25} onClick={Edicion}></Icon.PencilSquare>;
}

export default EditarJuntas;
