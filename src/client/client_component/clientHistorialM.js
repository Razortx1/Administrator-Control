import React, { useEffect, useState } from "react";
import axios from "axios";

export function ComponentHistorial(rut) {
  const [historialList, sethistorialList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const search = rut
  let searchRut = search.rut

  useEffect(() => {
    getHistorialMedico();
  }, []);

  let getHistorialMedico = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/historial-medico/",
        {
          params: {
            rut_clienta: searchRut, // Aquí agregamos el parámetro de búsqueda
          },
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const historialConDefaults = response.data.results.map((historial) => ({
        ...historial,
        tiene_alergias: historial.tiene_alergias || "No tiene alergias", // Valor por defecto
        detalle_alergia: historial.detalle_alergia || "No hay detalles", // Valor por defecto
        tiene_enfermedades: historial.tiene_enfermedades || "No tiene enfermedades", // Valor por defecto
        detalle_enfermedad: historial.detalle_enfermedad || "No hay descripción", // Valor por defecto
        tiene_cirugias: historial.tiene_cirugias || "No tiene cirugías", // Valor por defecto
        detalle_cirugia: historial.detalle_cirugia || "No hay detalles", // Valor por defecto
      }));
      sethistorialList(historialConDefaults);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Historial Medico</h6>
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
                  <th>¿Tiene Alergias?</th>
                  <th>Detalle de la alergia</th>
                  <th>¿Tiene enfermedades?</th>
                  <th>Detalle Enfermedad</th>
                  <th>¿Tiene Cirugias?</th>
                  <th>Detalle Cirugia</th>
                </tr>
              </thead>
              <tbody>
                {historialList.map((historial) => {
                  return (
                    <tr>
                      <td>{historial.tiene_alergias}</td>
                      <td>{historial.detalle_alergia}</td>
                      <td>{historial.tiene_enfermedades}</td>
                      <td>{historial.detalle_enfermedad}</td>
                      <td>{historial.tiene_cirugias}</td>
                      <td>{historial.detalle_cirugia}</td>
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
export default ComponentHistorial;
