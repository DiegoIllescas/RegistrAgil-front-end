import { useState, useEffect } from "react";
import "./PantGesEmp.css";
import Logo from "./imgs/Logo.jpg";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function PantGesEmp() {
  const [mostrarElemento, setMostrarElemento] = useState(true);
  const [show, setshow] = useState(false);
  const [edicionHabilitada, setEdicionHabilita] = useState(false);
  const [correo, setCorreo] = useState("");
  const [emp, SetEmp] = useState([]);
  const [peticionRealizada, SetPeticion] = useState(true);
  const [empleado, SetEmpleado] = useState({});
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const handleToggleChange = () => {
    if(isPasswordEnabled) {
      document.getElementById("newPassword").setAttribute("value", "no-checked");
      setIsPasswordEnabled(false);
    }else{
      document.getElementById("newPassword").setAttribute("value", "checked");
      setIsPasswordEnabled(true);
    }
    setIsPasswordEnabled(!isPasswordEnabled);
  };
  const [edicionEmpleado, SetEdicionEmpleado] = useState({});
  const [recienBorrado, SetRecienBorrado] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    habilitarInfo();
  }, [empleado, edicionHabilitada, show]);

  useEffect(() => {
    if (!peticionRealizada) {
      SetEmpleado({});
      //console.log("Se actualiza la info");
      async function getDataTable(url) {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Bearer '+ token
          },
          body: JSON.stringify({
            correo: correo
          })
        });
        const json = await response.json();
        if (json === undefined) {
          console.log(json.error);
          SetEmpleado({});
        } else if (json.error !== undefined) {
          console.log(json.error);
          SetEmpleado({});
          if (!recienBorrado) {
            MySwal.fire({
              title: `<span>Empleado no encontrado</span>`,
              animation: true,
              html: <p>El correo introducido no fue encontrado</p>,
            });
          } else {
            SetRecienBorrado(false);
          }
        } else {
          //console.log("Consulta exitosa");
          //console.log(json);
          SetEmpleado(json.content);
        }
      }
      getDataTable(
        "http://localhost/backend/empleado.php"
      );
      SetPeticion(true);
    }
  }, [peticionRealizada]);

  const toggleElemento = () => {
    setMostrarElemento(!mostrarElemento);
    setEdicionHabilita(false);
  };

  const habilitarEdicion = () => {
    setEdicionHabilita(true);
    setMostrarElemento(false);
    let copia = Object.assign({}, empleado);
    SetEdicionEmpleado(copia);
  };

  function habilitarInfo() {
    //console.log("Habilitando info");
    let info = [];
    if (empleado.fotografia !== null && empleado.fotografia !== undefined) {
      //console.log(empleado);
      //console.log(empleado.fotografia);
      info.push(
        <h3
          key={empleado.correo + "1"}
          style={{ display: mostrarElemento ? "none" : "flex" }}
        >
          Editar Empleado
        </h3>
      );
      info.push(<h3 key={empleado.correo + "2"}>Datos del Empleado</h3>);
      info.push(
        <form key={empleado.correo + "3"} onSubmit={editarEmpleado}>
          <div className="ContDaPer">
            <div className="ContenedorDatosEmp">
              <div className="ContenedorNombreEmp">
                <div>
                  <label>Nombre(s)</label>
                  <br />
                  <input
                    defaultValue={empleado.nombre}
                    type="text"
                    className="InputNombre"
                    disabled
                  />
                </div>
                <div>
                  <label>Apellido Paterno</label>
                  <br />
                  <input
                    defaultValue={empleado.apellido_paterno}
                    type="text"
                    className="InputNombre"
                    disabled
                  />
                </div>
                <div>
                  <label>Apellido Materno</label>
                  <br />
                  <input
                    defaultValue={empleado.apellido_materno}
                    type="text"
                    className="InputNombre"
                    disabled
                  />
                </div>
              </div>
              <div className="ContenedorDatosExtra">
                <div className="Col-75">
                  <div className="ContDir">
                    <div>
                      <label>Dirección</label>
                      <br />
                      <input
                        defaultValue={empleado.direccion}
                        type="text"
                        className="InputDir"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="ContEmpContacto">
                    <div>
                      <label>Correo Electrónico</label>
                      <br />
                      <input
                        defaultValue={empleado.correo}
                        type="email"
                        className="InputEmpContactoCorreo"
                        disabled
                        id={"correo" + empleado.correo}
                      />
                    </div>
                    <div>
                      <label>Teléfono</label>
                      <br />
                      <input
                        defaultValue={empleado.telefono}
                        type="tel"
                        className="InputEmpContactoTelefono"
                        disabled={!edicionHabilitada}
                        id={"telefono" + empleado.correo}
                      />
                    </div>
                  </div>
                  <div className="ContEmpPuesto">
                    <div>
                      <label>Departamento</label>
                      <br />
                      <input
                        defaultValue={empleado.departamento}
                        type="text"
                        className="InputDep"
                        disabled={!edicionHabilitada}
                        id={"departamento" + empleado.correo}
                      />
                    </div>
                    <div>
                      <label>Permisos</label>
                      <br />
                      <input
                        defaultValue={empleado.permisos}
                        type="tel"
                        className="InputPermisos"
                        disabled={!edicionHabilitada}
                        id={"permisos" + empleado.correo}
                      />
                    </div>
                  </div>
                </div>
                <div className="Col-25">
                  <p>Fotografía</p>
                  <img
                    src={`data:image/jpeg;base64, ` + empleado.fotografia}
                    alt="Fotografia empleado"
                    className="Fotografia"
                  />
                </div>
              </div>
              <div className="ContenedorNuevaCont">
                <div className="Col">
                  <div className="labelNC">
                    <p>Nueva Contraseña</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" id="newPassword"/>
                      <span className="slider round" onClick={handleToggleChange} ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btnBE izqEmp Espacio"
            onClick={() => setshow(true)}
            style={{ display: mostrarElemento ? "flex" : "none" }}
          >
            Dar de baja
          </button>
          <button
            type="button"
            className="btnBE izqEmp Espacio"
            onClick={toggleElemento}
            style={{ display: mostrarElemento ? "none" : "flex" }}
          >
            Cancelar
          </button>

          <Modal
            show={show}
            onHide={() => setshow(false)}
            dialogClassname="modal-90w"
            aria-labelledby="Dar-de-Baja"
          >
            <Modal.Body>
              <div className="ContMod">
                <p className="EncabezadoModal">
                  Se dará de baja al siguiente empleado
                </p>
                <div className="ContenedorModal">
                  <div className="colModal-40">
                    <img
                      src={`data:image/jpeg;base64, ` + empleado.fotografia}
                      alt="Fotografia empleado"
                      className="Fotografia"
                    />
                  </div>
                  <div className="colModal-60">
                    <div className="FormGroupModal">
                      <input
                        type="text"
                        className="InputNombreModal"
                        disabled
                        defaultValue={
                          empleado.nombre +
                          " " +
                          empleado.apellido_paterno +
                          " " +
                          empleado.apellido_materno
                        }
                      />
                    </div>
                    <div className="FormGroupModal">
                      <input
                        type="email"
                        className="InputCorreoModal"
                        disabled
                        defaultValue={empleado.correo}
                      />
                    </div>
                  </div>
                </div>
                <div className="ContenedorBotonesEmpMod">
                  <button
                    type="button"
                    className="btnBE izqEmp EspacioModal"
                    onClick={() => setshow(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={eliminarEmpleado}
                    className="btnBE derEmp EspacioModal"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <button
            type="button"
            className="btnBE derEmp Espacio"
            onClick={habilitarEdicion}
            style={{ display: mostrarElemento ? "flex" : "none" }}
          >
            Editar
          </button>
          <button
            type="submit"
            className="btnBE derEmp Espacio"
            style={{ display: mostrarElemento ? "none" : "flex" }}
          >
            Confirmar
          </button>
        </form>
      );
      SetEmp(info);
    } else {
      //console.log("No entra al empleado");
      SetEmp([]);
    }
  }

  const handleSubmit = async (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    SetPeticion(false);
  };

  const editarEmpleado = async (e) => {
    e.preventDefault();
    edicionEmpleado.telefono = document.getElementById(
      "telefono" + empleado.correo
    ).value;
    edicionEmpleado.permisos = document.getElementById(
      "permisos" + empleado.correo
    ).value;
    edicionEmpleado.departamento = document.getElementById(
      "departamento" + empleado.correo
    ).value;
    
    const setPass = document.getElementById("newPassword").value == "checked" ? true: false;
    console.log(document.getElementById("newPassword").value + "es de "+ setPass);

    const response = await fetch(
      "http://localhost/backend/empleado.php",
      {
        method: "PUT",
        mode: "cors",
        credentials: 'same-origin',
        body: JSON.stringify({
          correo: empleado.correo,
          telefono: edicionEmpleado.telefono,
          departamento: edicionEmpleado.departamento,
          permisos: edicionEmpleado.permisos == "Anfitrión" ? 4 : 3,
          newPassword: setPass
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+ token
        },
        referrerPolicy: "no-referrer"
      }
    );
    
    const json = await response.json();
    if (json === undefined) {
      console.log(json.error);
    } else if (json.error !== undefined) {
      MySwal.fire({
        title: `<span>Error de edicion</span>`,
        animation: true,
        html: <p>Hubo un error de edicion: {json.error}</p>,
      });
    } else {
      MySwal.fire({
        title: `<span>Edicion Correcta</span>`,
        animation: true,
        html: <p>El empleado se ha editado correctamente</p>,
      });
      console.log(json);

      toggleElemento();
      SetPeticion(false);
    }
  };

  const eliminarEmpleado = async (e) => {
    //.log("Eliminando datos");
    const response = await fetch(
      "http://localhost/backend/empleado.php",
      {
        method: "DELETE",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json",
          'Authorization' : 'Bearer '+ token
        },
        body: JSON.stringify({correo : empleado.correo}),
        referrerPolicy: "no-referrer"
      }
    );
    const json = await response.json();
    if (json === undefined) {
      console.log(json.error);
    } else if (json.error !== undefined) {
      console.log(json.error);
      MySwal.fire({
        title: `<span>Error de eliminacion</span>`,
        animation: true,
        html: <p>Hubo un error de eliminacion: {json.error}</p>,
      });
    } else {
      SetRecienBorrado(true);
      setshow(false);
      SetPeticion(false);
      MySwal.fire({
        title: `<span>Edicion Correcta</span>`,
        animation: true,
        html: <p>El empleado se ha eliminado correctamente</p>,
      });
    }
  };
  return (
    <>
      <Container className="mainContainer d-flex justify-content-center">
        <div className="ContenedorGesEmp">
          <h3 style={{ display: mostrarElemento ? "flex" : "none" }}>
            Gestionar Empleados
          </h3>
          <div
            className="ContGesEmp"
            style={{ display: mostrarElemento ? "flex" : "none" }}
          >
            <div className="ContenedorBusquedaEmp">
              <p className="EncabezadoBusEmp">
                Introduzca el correo del empleado*
              </p>
              <form className="FormBusEmp" onSubmit={handleSubmit}>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  type="text"
                  className="InputBuscarEmp"
                />
                <br></br>
                <div className="ContenedorBotonesEmp">
                  <button type="reset" className="btnBE izqEmp">
                    Cancelar
                  </button>
                  <button type="submit" className="btnBE derEmp">
                    Aceptar
                  </button>
                </div>
              </form>
            </div>
          </div>
          {emp}
        </div>
      </Container>
    </>
  );
}

export default PantGesEmp;
