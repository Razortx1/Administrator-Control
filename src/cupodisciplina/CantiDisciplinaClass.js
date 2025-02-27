import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URLPattern } from '../url'

function CantiDisciplineClass() {

  const [candisciplineList, setcanDisciplinaList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const url = URLPattern()

  useEffect(() => {
    //On Load
    getcanDiscipline();
  }, []);

  const token = localStorage.getItem('authToken');

  let navigate = useNavigate();
  if (!token){
    navigate("/")
  }

  let getcanDiscipline = async () => {
    try {
      const users = await axios.get(`${url}/api/cantidad-clase-disciplina/`);
      setcanDisciplinaList(users.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`${url}/cantidad-clase-disciplina/${id}/`);
        getcanDiscipline();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Cupos por Disciplina</h1>
        <Link to="/portal/cant-discipline-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faCalendar} className="creatinguser mr-2" />
          Agregar Clases por Disciplina
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
                      <th>Cantidad de Clases por Disciplina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candisciplineList.map((candisciplineclass) => {
                      return (
                        <tr>
                          <td>{candisciplineclass.cantidad_clases}</td>
                          <th>
                            <Link to={`/portal/cant-discipline-view/${candisciplineclass.id_cantidad_clases_disciplina}`} className='btn btn-primary btn-sm mr-1'>Revisar</Link>
                            <Link to={`/portal/cant-discipline-view/${candisciplineclass.id_cantidad_clases_disciplina}`} className='btn btn-info btn-sm mr-1'>Editar</Link>
                            <button onClick={() => handleDelete(candisciplineclass.id_cantidad_clases_disciplina)} className='btn btn-danger btn-sm mr-1'>Eliminar</button>
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

export default CantiDisciplineClass