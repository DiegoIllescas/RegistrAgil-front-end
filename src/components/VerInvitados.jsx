import * as Icon from "react-bootstrap-icons";
import { Form, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function VerInvitados({ invitados }) {
  let contador = 0;
  let rows = [];
  invitados.forEach((invitado) => {
    contador++;
    rows.push(
      <tr key={contador}>
        <td>
          <Form.Check // prettier-igno
            id={"checkbox" + contador}
            label={invitado.nombre}
            reverse
            disabled
            checked={invitado.estado === "Confirmada"}
          />
        </td>
        <td>
          {invitado.correo} {" "}
        </td>

        <td>
          <Icon.EnvelopeAtFill size={25} />
        </td>
      </tr>
    );
  });
  function MostrarInvitados() {
    MySwal.fire({
      title: `<span class="fontSpecial">Lista de Invitados</span>`,
      cancelButtonColor: "#a7000f",
      padding: "3em",
      width: 800,
      color: "#a7000f",
      animation: true,
      html: (
        <Table responsive striped bordered hover className="my-1">
          <thead className="table-black">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Reenviar Correo</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        /*try {
              solicitarEdicion(
                "http://localhost:3000/modules/mesacontrol/" + invitacion.ID_PER,
                {
                  grupo: document.getElementById("grupo" + invitacion.ID_INV).value,
                  nombre: document.getElementById("nombre" + invitacion.ID_INV)
                    .value,
                  cantidad: document.getElementById("cantidad" + invitacion.ID_INV)
                    .value,
                  estado: document.getElementById("estado" + invitacion.ID_INV)
                    .value,
                }
              ).then((data) => {
                if (!data || data === null) {
                  console.log("nose");
                }
                if (data.valido === "S") {
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
                    title: "Edicion correcta",
                    text: "Se ha editado correctamente al invitado",
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
                    text: "No se pudieron insertar los datos",
                  });
                }
    
                // JSON data parsed by `data.json()` call
              });
            } catch (error) {
              Swal.showValidationMessage(`
                Request failed: ${error}
              `);
            }*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  return <Icon.PersonLinesFill size={25} onClick={MostrarInvitados} />;
}

export default VerInvitados;
