import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Icon from "react-bootstrap-icons";

const MySwal = withReactContent(Swal);

async function solicitarEliminado(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function BorrarJuntas({ setPeticion, junta }) {
  function Eliminacion() {
    MySwal.fire({
      title: `<span class="fontSpecial">Borrar junta</span>`,
      showConfirmButton: true,
      cancelButtonColor: "#a7000f",
      padding: "3em",
      width: 800,
      color: "#a7000f",
      animation: true,
      html: (
        <Row>
          <Col>
            Estas seguro que deseas borrar la junta: {junta.reunion_concepto}
          </Col>
        </Row>
      ),
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          solicitarEliminado(
            "http://localhost/RegistrAgil/GestionarJuntas/Eliminar_Juntas.php",
            {
              hora_inicio: junta.reunion_horaInicio,
              fecha: junta.reunion_fecha,
              sala: junta.reunion_sala,
              correo: junta.anfitrion_correo,
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
                color: "#a7000f",
                animation: true,
                title: "Eliminacion correcta",
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
                text: "Error al eliminar la junta",
              });
            }

            // JSON data parsed by `data.json()` call
          });
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return (
    <Icon.XCircle
      color="#a7000f"
      size={25}
      onClick={Eliminacion}
    ></Icon.XCircle>
  );
}

export default BorrarJuntas;
