import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CantidadClaseDisciplinaView() {
  const params = useParams();
  const [candisciplineclassList, setcandisciplineclassList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getcantidadClaseDisciplina();
  }, []);

  const token = localStorage.getItem('authToken');

  let navigate = useNavigate();
  if (!token){
    navigate("/")
  }

  let getcantidadClaseDisciplina = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cantidad-clase-disciplina/${params.id}/`, {
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
      setcandisciplineclassList(disciplina);
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
          <h6 className="m-0 font-weight-bold text-primary">Cupos por Disciplina</h6>
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
                    <th>Cantidad de Clases por Disciplina</th>
                    </tr>
                  </thead>
                <tbody>
                  <tr>
                    <td>{candisciplineclassList.cantidad_clases}</td>
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

export default CantidadClaseDisciplinaView;
