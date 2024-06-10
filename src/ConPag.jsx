import "./ConPag.css";
import { Container } from "react-bootstrap";
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
                      src={`data:image/jpg;base64,${item.fotografia}`}
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
                <div className="Hora" >{item.entrada ? item.entrada : "No ha registrado entrada"}</div>
                <div className="Hora">{item.salida ? item.salida: "No ha registrado salida"}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
