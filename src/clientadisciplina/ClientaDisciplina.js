import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faFootball } from '@fortawesome/free-solid-svg-icons'

function ClientaDisciplina() {

  const [clientaDisciplinaList, setclientaDisciplinaList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getclientaDisciplina();
  }, []);

  let getclientaDisciplina = async () => {
    try {
      const disciplina = await axios.get("http://localhost:8000/api/clientas-disciplina/");
      setclientaDisciplinaList(disciplina.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8000/api/clientas-disciplina/${id}/`);
        getclientaDisciplina();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800"> Lista de Disciplinas por Clienta</h1>
        <Link to="/portal/clienta-disciplina-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faFootball} className="creatinguser mr-2" />
          Asociar Clienta a Disciplina
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Nombre Clienta</th>
                      <th>Rut Clienta</th>
                      <th>Nombre Disciplina</th>
                      <th>Nombre Disciplina Contratada</th>
                      <th>Duracion</th>
                      <th>Fecha Inscripcion</th>
                      <th>Fecha Termino</th>
                      <th>Estado Membresia</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientaDisciplinaList.map((ClientaDisciplina) => {
                      return (
                        <tr>
                          <td>{ClientaDisciplina.nombre_clienta}</td>
                          <td>{ClientaDisciplina.rut_clienta}</td>
                          <td>{ClientaDisciplina.nombre_disciplina}</td>
                          <td>{ClientaDisciplina.nombre_disciplina_contratada}</td>
                          <td>{ClientaDisciplina.duracion_disciplina}</td>
                          <td>{ClientaDisciplina.fecha_inscripcion}</td>
                          <td>{ClientaDisciplina.fecha_termino}</td>
                          <td>{ClientaDisciplina.estado_membresia}</td>
                          <th>
                            <Link to={`/portal/clienta-disciplina-view/${ClientaDisciplina.id_clienta_disciplina}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/clienta-disciplina-view/${ClientaDisciplina.id_clienta_disciplina}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(ClientaDisciplina.id_clienta_disciplina)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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