import "./ConPag.css";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

export function ConPag() {

  const [fecha, setFecha] = useState("01/01/2024");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    //Establecer fecha a la pagina
    setFecha(new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}));
    const token = localStorage.getItem("token");

    const options = {
      method : 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ token
      },
      referrerPolicy: "no-referrer"
    };

    fetch("http://localhost/backend/entsal.php", options)
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        setDatos(data.datos);
      }else{
        console.log(data.error);
      }
    });

  },[]);
  
  const [mostrarModalViES, setMostrarModalViES] = useState(false);

  const ModalViESCerrar = () => setMostrarModalViES(false);
  const ModalViESAbrir = () => setMostrarModalViES(true);

  return (
    <>
      <Container className="">
        <div className="ContPrin">
          <h4 className="EncabezadoPrin">Visualizar Entrada/Salida</h4>
          <h4 className="EncabezadoPrin">{fecha}</h4>
          <div className="ContenedorEncabezados">
            <div>
              <h4>Invitado</h4>
            </div>
            <div>
              <h4>Hora de Entrada</h4>
            </div>
            <div>
              <h4>Hora de Salida</h4>
            </div>
          </div>
          <div className="Contenedor">
            {datos.map((item, index) => (
              <div className="ContenedorViEntrSal" key={index}>
                <div className="CartaConFoto">
                  <div className="col-50-foto">
                    <img
                      src={`data:image/jpeg;base64,` + item.fotografia}
                      alt={`Foto de Perfil ${index}`}
                      className="FotoPerfil"
                      onClick={ModalViESAbrir}
                    />
                  </div>
                  <Modal show={mostrarModalViES} onHide={ModalViESCerrar}>
                  <Modal.Body>
                    <div className="ContenedorModalViES">
                      <p className="EncabezadoModalViES">Invitado</p>
                      <div className="ContenedorDatosViES">
                        <div className="ContenedorImagenModal">
                          <img
                            src={`data:image/jpeg;base64, ` + item.fotografia}
                            alt="Foto de Perfil"
                            className="FotoPerfil"
                          />
                          <p className="NombreInvModal">{item.invitado}</p>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Teléfono</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="tel"
                              id={`TelefonoInv_${index}`}
                              name={`TelefonoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={ item.telefono }
                            />
                          </div>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Correo</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="email"
                              id={`EmailInv_${index}`}
                              name={`EmailInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.correo}
                            />
                          </div>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViEs">
                            <label className="ModalLabelViES">
                              Dispositivo
                            </label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="text"
                              id={`ModeloDispositivoInv_${index}`}
                              name={`ModeloDispositivoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.ModeloDispositivo}
                            />
                            <br />
                            <input
                              type="text"
                              id={`NoSerieDispositivoInv_${index}`}
                              name={`NoSerieDispositivoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.NoSerieDispositivo}
                              style={{ marginTop: "15px" }}
                            />
                          </div>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Automovil</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="text"
                              id={`ModeloAutoInv_${index}`}
                              name={`ModeloAutoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.modeloAuto ? item.modeloAuto : "No lleva"}
                            />
                            <br />                            
                            <input
                              type="text"
                              id={`ColorAutoInv_${index}`}
                              name={`ColorAutoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.colorAuto ? item.colorAuto : "No lleva"}
                              style={{ marginTop: "15px" }}
                            />
                            <br />                            
                            <input
                              type="text"
                              id={`PlacaAutoInv_${index}`}
                              name={`PlacaAutoInv_${index}`}
                              className="InputsModalViES"
                              disabled
                              value={item.placaAuto ? item.placaAuto : "No lleva"}
                              style={{ marginTop: "15px" }}
                            />
                          </div>
                          
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Sala</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="text"
                              id={`Sala_${index}`}
                              name={`Sala_${index}`}
                              className="Inputs"
                              value={item.sala}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Anfitrión</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="text"
                              id={`Encargado_${index}`}
                              name={`Encargado_${index}`}
                              className="Inputs"
                              value={item.encargado}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="ContenedorInputViES">
                          <div className="Col-25ViES">
                            <label className="ModalLabelViES">Asunto</label>
                          </div>
                          <div className="Col-75ViES">
                            <input
                              type="text"
                              id={`AsuntoJunta_${index}`}
                              name={`AsuntoJunta_${index}`}
                              className="Inputs"
                              value={item.asunto}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  </Modal>

                  <div className="col-50">
                    <form>
                      <label className="Labels">Nombre</label>
                      <input
                        type="text"
                        id={`NombreInv_${index}`}
                        name={`NombreInv_${index}`}
                        className="Inputs"
                        value={item.invitado}
                        disabled
                      />
                      <br />
                      <label className="Labels">Asunto de Junta</label>
                      <input
                        type="text"
                        id={`AsuntoJunta_${index}`}
                        name={`AsuntoJunta_${index}`}
                        className="Inputs"
                        value={item.asunto}
                        disabled
                      />
                      <br /> <label className="Labels">Encargado</label>
                      <input
                        type="text"
                        id={`Encargado_${index}`}
                        name={`Encargado_${index}`}
                        className="Inputs"
                        value={item.encargado}
                        disabled
                      />
                      <br />
                      <label className="Labels">Sala</label>
                      <input
                        type="text"
                        id={`Sala_${index}`}
                        name={`Sala_${index}`}
                        className="Inputs"
                        value={item.sala}
                        disabled
                      />
                      <br />
                    </form>
                  </div>
                </div>
                <div className="Hora">{item.entrada}</div>
                <div className="Hora">{item.salida}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
