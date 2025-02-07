import { faCalendarAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { URLPattern } from "../url";

function Instructores() {
  const [instructoresList, setInstructoresList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const url = URLPattern()

  const MapActivo = {
    1 : 'Activo',
    0 : 'Inactivo'
  }

  useEffect(() => {
    //On Load
    setInstructoresList([])
    getInstructores();
  }, []);

    const token = localStorage.getItem('authToken');
  
    let navigate = useNavigate();
    if (!token){
      navigate("/")
    }

  let getInstructores = async (rut) => {
    try {
      if (rut) {
        const clases = await axios.get(
          `${url}/api/instructores/?search=${rut}`
        );
        setInstructoresList(clases.data.results);
        setLoading(false);
      } else {
        const clases = await axios.get(
          `${url}/api/instructores/?search=`
        );
        setInstructoresList(clases.data.results);
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
        await axios.delete(`${url}/api/instructores/${id}/`);
        getInstructores();
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
          placeholder="Ingresa rut o el nombre del instructor"
          onChange={(e) => {
            getInstructores(e.target.value);
          }}
        />
      </div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Instructores</h1>
        <Link
          to="/portal/instructores-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faInstitution} className="creatinguser mr-2" />
          Agregar Instructores
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
                    <th>Rut</th>
                    <th>Nombres Instructor</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Activo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {instructoresList.map((instructor) => {
                    return (
                      <tr>
                        <td>{instructor.rut_instructor}</td>
                        <td>{instructor.nombres}</td>
                        <td>{instructor.apellido_paterno}</td>
                        <td>{instructor.apellido_materno}</td>
                        <td>{MapActivo[instructor.esta_activo] || 'Desconocido'}</td>
                        <th>
                          <Link
                            to={`/portal/instructor-view/${instructor.id_instructor}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            Revisar
                          </Link>
                          <Link
                            to={`/portal/instructor-view/${instructor.id_instructor}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(instructor.id_instructor)
                            }
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

export default Instructores;
