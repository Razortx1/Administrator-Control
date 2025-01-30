import React, { useEffect, useState } from "react";
import axios from "axios";

export function ComponentEmergencia(rut) {
    const [emergenciaU, setEmergenciaU] = useState([]);
    const [isLoading, setLoading] = useState(true);
  
    const search = rut
    let searchRut = search.rut
  
    useEffect(() => {
      getHistorialMedico();
    }, []);
  
    let getHistorialMedico = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/contacto-emergencia/",
          {
            params: {
              rut_clienta: searchRut, // Aquí agregamos el parámetro de búsqueda
            },
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        console.log(response.data.results)
        setEmergenciaU(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Contacto de Emergencia</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" />
          ) : (
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Nombre del Contacto</th>
                    <th>Numero del Contacto</th>
                    <th>Correo Electronico del Contacto</th>
                    <th>Relacion con la clienta</th>
                  </tr>
                </thead>
                <tbody>
                  {emergenciaU.map((emergencia) => {
                    return (
                      <tr>
                        <td>{emergencia.nombre_contacto_emergencia}</td>
                        <td>{emergencia.numero_contacto_emergencia}</td>
                        <td>{emergencia.correo_contacto_emergencia}</td>
                        <td>{emergencia.tipo_contacto_emergencia}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
export default ComponentEmergencia;