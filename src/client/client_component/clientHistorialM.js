import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLPattern } from "../../url";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export function ComponentHistorial(rut) {
  const [historialList, sethistorialList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const search = rut;
  let searchRut = search.rut;

  const MapActivo = {
    1: "Si",
    0: "No",
  };

  const url = URLPattern();

  useEffect(() => {
    getHistorialMedico();
  }, []);


  let getHistorialMedico = async () => {
    try {
      const response = await axios.get(`${url}/api/historial-medico/`, {
        params: {
          rut_clienta: searchRut, // Aquí agregamos el parámetro de búsqueda
        },
        headers: {
          "Content-type": "application/json",
        },
      });
      const historialConDefaults = response.data.results.map((historial) => ({
        ...historial,
        tiene_alergias:
          MapActivo[historial.tiene_alergias] || "No tiene alergias", // Valor por defecto
        detalle_alergia: historial.detalle_alergia || "No hay detalles", // Valor por defecto
        tiene_enfermedades:
          MapActivo[historial.tiene_enfermedades] || "No tiene enfermedades", // Valor por defecto
        detalle_enfermedad:
          historial.detalle_enfermedad || "No hay descripción", // Valor por defecto
        tiene_cirugias:
          MapActivo[historial.tiene_cirugias] || "No tiene cirugias", // Valor por defecto
        detalle_cirugia: historial.detalle_cirugia || "No hay detalles", // Valor por defecto
      }));
      sethistorialList(historialConDefaults);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let verdad = () => {
    if (historialList == false) {
      return (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <Link
            to={`/portal/historial-medico/${searchRut}`}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
            Crear Historial Medico
          </Link>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      {verdad()}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Historial Medico
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
                        <th>
                          <Link
                            to={`/portal/historial-medico-edit/${historial.id_historial_medico}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            Editar Historial
                          </Link>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ComponentHistorial;
