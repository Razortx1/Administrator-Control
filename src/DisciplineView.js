import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DisciplinaView() {
  const params = useParams();
  const [disciplinaList, setdisciplinaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getDisciplina();
    console.log("welcome to userview");
  }, []);

  let getDisciplina = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/disciplinas/${params.id}/`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'cors'
});
      // Verificamos si la respuesta fue exitosa (código 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const disciplina = await response.json(); // Parseamos el JSON de la respuesta
      console.log(disciplina);
      setdisciplinaList(disciplina);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>Disciplina - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DisciplinaView</h6>
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
                      <th>Id</th>
                      <th>Nombre Disciplina</th>
                      <th>Descripcion Disciplina</th>
                      <th>Rango Horario</th>
                      <th>Instructor</th>
                      <th>Cantidad de Clases por Disciplina</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Nombre Disciplina</th>
                      <th>Descripcion Disciplina</th>
                      <th>Rango Horario</th>
                      <th>Instructor</th>
                      <th>Cantidad de Clases por Disciplina</th>
                    </tr>
                  </tfoot>
                <tbody>
                  <tr>
                    <td>{disciplinaList.id_disciplina}</td>
                    <td>{disciplinaList.nombre_disciplina}</td>
                    <td>{disciplinaList.descripcion_disciplina}</td>
                    <td>{disciplinaList.rango_horarios}</td>
                    <td>{disciplinaList.id_instructor}</td>
                    <td>{disciplinaList.id_cantidad_clases_disciplina}</td>
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

export default DisciplinaView;
