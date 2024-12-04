import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faFootball } from '@fortawesome/free-solid-svg-icons'

function ClientaDisciplina() {

  const [clientaClasesList, setclientaClasesList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getclientaClases();
    console.log("welcome");
  }, []);

  let getclientaClases = async () => {
    try {
      const disciplina = await axios.get("http://localhost:8000/api/clientas-disciplina/");
      setclientaClasesList(disciplina.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`${id}`);
        getclientaClases();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800"> Clienta-Discipline-List</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faFootball} className="creatinguser mr-2" />
          Asociar Clienta a Disciplina
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre Disciplina</th>
                      <th>Descripcion Disciplina</th>
                      <th>Rango Horario</th>
                      <th>Instructor</th>
                      <th>Cantidad de Clases por Disciplina</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Id Clienta</th>
                      <th>Id Disciplina</th>
                      <th>Nombre Disciplina</th>
                      <th>Nombre Disciplina Contratada</th>
                      <th>Duracion</th>
                      <th>Fecha Inscripcion</th>
                      <th>Fecha Termino</th>
                      <th>Estado Membresia</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {clientaClasesList.map((clientaClases) => {
                      return (
                        <tr>
                          <td>{clientaClases.id_clienta_disciplina}</td>
                          <td>{clientaClases.clientas_id_clienta}</td>
                          <td>{clientaClases.disciplinas_id_disciplina}</td>
                          <td>{clientaClases.nombre_disciplina}</td>
                          <td>{clientaClases.nombre_disciplina_contratada}</td>
                          <td>{clientaClases.duracion_disciplina}</td>
                          <td>{clientaClases.fecha_inscripcion}</td>
                          <td>{clientaClases.fecha_termino}</td>
                          <td>{clientaClases.estado_membresia}</td>
                          <th>
                            <Link to={`/portal/clienta-disciplina-view/${clientaClases.id_clienta_disciplina}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/clienta-disciplina-view/${clientaClases.id_clienta_disciplina}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(clientaClases.id_clienta_disciplina)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default ClientaDisciplina