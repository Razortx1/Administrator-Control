import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ClaseView() {
  const params = useParams();
  const [claseList, setclaseList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getDisciplina();
    console.log("welcome to userview");
  }, []);

  let getDisciplina = async () => {
    try {
      const response = await fetch(
        `http://18.234.61.11:8000/api/clases/${params.id}/`,
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

      const clase = await response.json(); // Parseamos el JSON de la respuesta
      console.log(clase);
      setclaseList(clase);
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
          <h6 className="m-0 font-weight-bold text-primary">Clase</h6>
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
                    <th>Nombre Clase</th>
                    <th>Nombre de la Disciplina</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{claseList.nombre_clase}</td>
                    <td>{claseList.nombre_disciplina}</td>
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

export default ClaseView;
