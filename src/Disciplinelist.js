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
    console.log("welcome");
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
        <h1 className="h3 mb-0 text-gray-800">Discipline-List</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faFootball} className="creatinguser mr-2" />
          Agregar Disciplina
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
                      <th>Nombre Disciplina</th>
                      <th>Descripcion Disciplina</th>
                      <th>Rango Horario</th>
                      <th>Instructor</th>
                      <th>Cantidad de Clases por Disciplina</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {disciplineList.map((disciplina) => {
                      return (
                        <tr>
                          <td>{disciplina.id_disciplina}</td>
                          <td>{disciplina.nombre_disciplina}</td>
                          <td>{disciplina.descripcion_disciplina}</td>
                          <td>{disciplina.rango_horarios}</td>
                          <td>{disciplina.id_instructor}</td>
                          <td>{disciplina.id_cantidad_clases_disciplina}</td>
                          <th>
                            <Link to={`/portal/discipline_list/${disciplina.id_disciplina}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/discipline_list/${disciplina.id_disciplina}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
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