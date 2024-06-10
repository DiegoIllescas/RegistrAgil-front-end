import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./PantGestInv.css";
import Logo from "./imgs/Logo.jpg";
import { useState } from "react";

function PantGesInvi() {
  const [mostrarElemtoGesInv, setMostrarElementoGesInv] = useState(true);
  const [edicionHabilitadaGesInv, setEdicionHabilitaGesInv] = useState(false);
  const [correo, setCorreo] = useState("");
  const [invi, SetInvi] = useState([]);

  const toggleElementoGesInv = () => {
    setMostrarElementoGesInv(!mostrarElemtoGesInv);
    setEdicionHabilitaGesInv(false);
  };

  const habilitarEdicionGesInv = () => {
    setEdicionHabilitaGesInv(true);
    setMostrarElementoGesInv(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let info = [];
    console.log("Obteniendo datos");
    const response = await fetch(
      "http://localhost/backend/invitado.php",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correo,
        }),
      }
    );
    const json = await response.json();
    if (json.invitados === null) {
      console.log(json.error);
    } else {
      console.log(json.invitado);
      let invitado = json.invitado;
      info.push(
        <h3
          key={correo + "1"}
          style={{ display: mostrarElemtoGesInv ? "none" : "flex" }}
        >
          Editar Invitado
        </h3>
      );
      info.push(<h3 key={correo + "2"}>Datos Personales</h3>);
      info.push(
        <form key={correo + "3"}>
          <div className="ContDaPer">
            <div className="ContenedorDatosPer">
              <div className="col-75">
                <div className="ContNombre">
                  <div>
                    <label>Nombre(s)</label>
                    <br />
                    <input
                      defaultValue={invitado.usuario.nombre}
                      type="text"
                      className="InputNombre"
                      disabled
                    />
                  </div>
                  <div>
                    <label>Apellido Paterno</label>
                    <br />
                    <input
                      defaultValue={invitado.usuario.apellido_paterno}
                      type="text"
                      className="InputNombre"
                      disabled
                    />
                  </div>
                  <div>
                    <label>Apellido Materno</label>
                    <br />
                    <input
                      defaultValue={invitado.usuario.apellido_materno}
                      type="text"
                      className="InputNombre"
                      disabled
                    />
                  </div>
                </div>
                <div className="ContEmpID">
                  <div>
                    <label>Empresa Proveniente</label>
                    <br />
                    <input
                      defaultValue={invitado.usuario.empresa}
                      type="text"
                      className="InputEmpID"
                      disabled
                    />
                  </div>
                  <div>
                    <label>Identificación Presentada</label>
                    <br />
                    <input
                      defaultValue={invitado.identificacion}
                      type="text"
                      className="InputEmpID"
                      disabled
                    />
                  </div>
                </div>
                <div className="ContContacto">
                  <div>
                    <label>Correo Electrónico</label>
                    <br />
                    <input
                      defaultValue={correo}
                      type="email"
                      className="InputCorreo"
                      disabled
                    />
                  </div>
                  <div>
                    <label>Teléfono</label>
                    <br />
                    <input
                      defaultValue={invitado.usuario.telefono}
                      type="tel"
                      className="InputTelefono"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                </div>
              </div>
              <div className="col-25">
                <p>Fotografía</p>
                <img src={Logo} alt="Fotografia" className="Fotografia" />
              </div>
            </div>
          </div>
          <div className="ContEncabezadosInfoExtra">
            <div className="Col-33Enc">
              <h3>Dispositivo(s)</h3>
            </div>
            <div className="Col-33Enc">
              <h3>Automóvil</h3>
            </div>
            <div className="Col-33Enc">
              <h3>Acompañantes</h3>
            </div>
          </div>
          <div className="ContInfoEx">
            <div className="ContenedorInfoExtra">
              <div className="col-33">
                <div className="ContenedorDis">
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Modelo</label>
                    <input
                      defaultValue={invitado.equipo.modelo}
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Número de Serie</label>
                    <input
                      defaultValue={invitado.equipo.NoSerie}
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                </div>
              </div>
              <div className="col-33">
                <div className="ContenedorAuto">
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Modelo</label>
                    <input
                      defaultValue={invitado.vehiculo.modelo}
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Placa</label>
                    <input
                      defaultValue={invitado.vehiculo.placa}
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Color</label>
                    <input
                      defaultValue={invitado.vehiculo.color}
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                </div>
              </div>
              <div className="col-33">
                <div className="ContenedorAcom">
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Nombre</label>
                    <input
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled
                    />
                  </div>
                  <div className="FormGroup UltInput">
                    <label className="LabelInfoExtra">Correo</label>
                    <input
                      type="email"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                  <div className="FormGroup">
                    <label className="LabelInfoExtra">Nombre</label>
                    <input
                      type="text"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled
                    />
                  </div>
                  <div className="FormGroup UltInput">
                    <label className="LabelInfoExtra">Correo</label>
                    <input
                      type="email"
                      placeholder=""
                      className="InputInfoExtra"
                      disabled={!edicionHabilitadaGesInv}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btnBI izq Espacio"
            onClick={toggleElementoGesInv}
            style={{ display: mostrarElemtoGesInv ? "none" : "flex" }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btnBI der Espacio"
            style={{ display: mostrarElemtoGesInv ? "flex" : "none" }}
            onClick={habilitarEdicionGesInv}
          >
            Editar
          </button>
          <button
            type="submit"
            className="btnBI der Espacio"
            style={{ display: mostrarElemtoGesInv ? "none" : "flex" }}
          >
            Confirmar
          </button>
        </form>
      );
      SetInvi(info);
    }
  };

  return (
    <>
      <Container className="mainContainer d-flex justify-content-center">
        <div className="ContenedorGesInv">
          <h3 style={{ display: mostrarElemtoGesInv ? "flex" : "none" }}>
            Gestionar Invitados
          </h3>
          <div
            className="ContGesInv"
            style={{ display: mostrarElemtoGesInv ? "flex" : "none" }}
          >
            <div className="ContenedorBusquedaInvitados">
              <p className="EncabezadoBusInv">
                Introduzca el correo del invitado*
              </p>
              <form className="FormBusInv" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="InputBuscarInvitado"
                />
                <br></br>
                <div className="ContenedorBotones">
                  <button type="reset" className="btnBI izq">
                    Cancelar
                  </button>
                  <button type="submit" className="btnBI der">
                    Aceptar
                  </button>
                </div>
              </form>
            </div>
          </div>
          {invi}
        </div>
      </Container>
    </>
  );
}

export default PantGesInvi;
