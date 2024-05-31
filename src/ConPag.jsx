import Logo from "./imgs/Logo.jpg";
import "./ConPag.css";
import { Container } from "react-bootstrap";

export function ConPag() {
  const datos = [
    {
      invitado: "Nombre Invitado 1",
      sala: "Sala: 2",
      encargado: "Encargado: Anuar",
      concepto: "Concepto junta: Registro",
      horaEntrada: "12:00 pm",
      horaSalida: "2:00 pm",
    },
    {
      invitado: "Nombre Invitado 2",
      sala: "Sala: 3",
      encargado: "Encargado: María",
      concepto: "Concepto junta: Reunión",
      horaEntrada: "2:00 pm",
      horaSalida: "4:30 pm",
    },
    {
      invitado: "Nombre Inivitado 3",
      sala: "Sala: 3",
      encargado: "Encargado: Christian",
      concepto: "Concepto junta: Reunión semanal",
      horaEntrada: "4:30 pm",
      horaSalida: "6:00 pm",
    },
  ];

  return (
    <>
      <Container className="">
        <div className="ContPrin">
          <h4 className="EncabezadoPrin">Visualizar Entrada/Salida</h4>
          <h4 className="EncabezadoPrin">10 de mayo 2024</h4>
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
                      src={Logo}
                      alt={`Foto de Perfil ${item.invitado}`}
                      className="FotoPerfil"
                    />
                  </div>
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
                        value={item.concepto}
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
                <div className="Hora">{item.horaEntrada}</div>
                <div className="Hora">{item.horaSalida}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
