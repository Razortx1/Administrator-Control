import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HorarioClaseView() {
  const params = useParams();
  const [horarioClaseList, sethorarioClaseList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getHorarioClase();
    console.log("welcome to userview");
  }, []);

  let getHorarioClase = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/horario-clase/${params.id}/`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      // Verificamos si la respuesta fue exitosa (código 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const disciplina = await response.json(); // Parseamos el JSON de la respuesta
      console.log(disciplina);
      sethorarioClaseList(disciplina);
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
          <h6 className="m-0 font-weight-bold text-primary">Horario de la Clase</h6>
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
                    <th>Fecha de la Clase</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Termino</th>
                    <th>Cupo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{horarioClaseList.nombre_clase}</td>
                    <td>{horarioClaseList.fecha_clase}</td>
                    <td>{horarioClaseList.hora_inicio}</td>
                    <td>{horarioClaseList.hora_fin}</td>
                    <td>{horarioClaseList.cupo}</td>
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

export default HorarioClaseView;
