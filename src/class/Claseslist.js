import { faCalendarAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { faFootball } from "@fortawesome/free-solid-svg-icons";

function Clases() {
  const [ClasesList, setClasesList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    setClasesList([]);
    getClases();
  }, []);

  let getClases = async (nombre_clase) => {
    try {
      if (nombre_clase) {
        const clases = await axios.get(
          `http://18.234.61.11:8000/api/clases/?search=${nombre_clase}`
        );
        setClasesList(clases.data);
        setLoading(false);
      } else {
        const clases = await axios.get(
          `http://18.234.61.11:8000/api/clases/?search=`
        );
        setClasesList(clases.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure do you want to delete the data?"
      );
      if (confirmDelete) {
        await axios.delete(`http://18.234.61.11:8000/api/clases/${id}/`);
        getClases();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-sm-flex align-items-center justify-content mb-3 mt-3"
        style={{ paddingLeft: 200, paddingRight: 200 }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Ingresa nombre de la clase"
          onChange={(e) => {
            getClases(e.target.value);
          }}
        />
      </div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Clases</h1>
        <Link
          to="/portal/clases-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="creatinguser mr-2" />
          Agregar Clases
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ClasesList.map((clases) => {
                    return (
                      <tr>
                        <td>{clases.nombre_clase}</td>
                        <td>{clases.nombre_disciplina}</td>
                        <th>
                          <Link
                            to={`/portal/clases-view/${clases.id_clase}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            Revisar
                          </Link>
                          <Link
                            to={`/portal/clases-view/${clases.id_clase}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(clases.id_clase)}
                            className="btn btn-danger btn-sm mr-1"
                          >
                            Eliminar
                          </button>
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

export default Clases;
