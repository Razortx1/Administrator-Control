import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InstructorView() {
  const params = useParams();
  const [instructorList, setinstructorList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getInstructores();
    console.log("welcome to userview");
  }, []);

  let getInstructores = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/instructores/${params.id}/`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'cors'
});
      // Verificamos si la respuesta fue exitosa (código 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const instructor = await response.json(); // Parseamos el JSON de la respuesta
      console.log(instructor);
      setinstructorList(instructor);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>Instructor - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">InstructorView</h6>
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
                      <th>Nombres Instructor</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Activo</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                      <th>Id</th>
                      <th>Nombres Instructor</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Activo</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>{instructorList.id_instructor}</td>
                    <td>{instructorList.nombres}</td>
                    <td>{instructorList.apellido_paterno}</td>
                    <td>{instructorList.apellido_materno}</td>
                    <td>{instructorList.esta_activo}</td>
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

export default InstructorView;
