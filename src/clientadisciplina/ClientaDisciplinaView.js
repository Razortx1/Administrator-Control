import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ClientaDisciplinaView() {
  const params = useParams();
  const [ClientaDisciplinaList, setClientaDisciplinaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getClientaDisciplina();
    console.log("welcome to userview");
  }, []);

  let getClientaDisciplina = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/clientas-disciplina/${params.id}/`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          mode: "cors",
        }
      );
      // Verificamos si la respuesta fue exitosa (código 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const disciplina = await response.json(); // Parseamos el JSON de la respuesta
      console.log(disciplina);
      setClientaDisciplinaList(disciplina);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            ClientaDisciplinaView
          </h6>
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
                    <th>Nombre Clienta</th>
                    <th>Rut Clienta</th>
                    <th>Nombre Disciplina</th>
                    <th>Nombre Disciplina Contratada</th>
                    <th>Duracion</th>
                    <th>Fecha Inscripcion</th>
                    <th>Fecha Termino</th>
                    <th>Estado Membresia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ClientaDisciplinaList.nombre_clienta}</td>
                    <td>{ClientaDisciplinaList.rut_clienta}</td>
                    <td>{ClientaDisciplinaList.nombre_disciplina}</td>
                    <td>{ClientaDisciplinaList.nombre_disciplina_contratada}</td>
                    <td>{ClientaDisciplinaList.duracion_disciplina}</td>
                    <td>{ClientaDisciplinaList.fecha_inscripcion}</td>
                    <td>{ClientaDisciplinaList.fecha_termino}</td>
                    <td>{ClientaDisciplinaList.estado_membresia}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientaDisciplinaView;
