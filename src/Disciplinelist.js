import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faFootball } from '@fortawesome/free-solid-svg-icons'

function Disciplinelist() {

  const [disciplineList, setDisciplineList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getDiscipline();
  }, []);

  let getDiscipline = async () => {
    try {
      const disciplina = await axios.get("http://localhost:8000/api/disciplinas/");
      setDisciplineList(disciplina.data);
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
        getDiscipline();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Disciplinas</h1>
        <Link to="/portal/create-discipline" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faFootball} className="creatinguser mr-2" />
          Agregar Disciplina
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
                      <th>Nombre Disciplina</th>
                      <th>Descripcion Disciplina</th>
                      <th>Rango Horario</th>
                      <th>Instructor</th>
                      <th>Cantidad de Clases por Disciplina</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disciplineList.map((disciplina) => {
                      return (
                        <tr>
                          <td>{disciplina.nombre_disciplina}</td>
                          <td>{disciplina.descripcion_disciplina}</td>
                          <td>{disciplina.rango_horarios}</td>
                          <td>{disciplina.nombres_instructor}</td>
                          <td>{disciplina.cantidad_clases}</td>
                          <th>
                            <Link to={`/portal/discipline-view/${disciplina.id_disciplina}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/discipline-view/${disciplina.id_disciplina}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(disciplina.id_disciplina)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default Disciplinelist