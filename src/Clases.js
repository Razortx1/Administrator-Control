import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faFootball } from '@fortawesome/free-solid-svg-icons'

function Clases() {

  const [ClasesList, setClasesList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getClases();
    console.log("welcome");
  }, []);

  let getClases = async () => {
    try {
      const clases = await axios.get("http://localhost:8000/api/clases/");
      setClasesList(clases.data);
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
        getClases();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Clases-List</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faCalendarAlt} className="creatinguser mr-2" />
          Agregar Clases
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
                      <th>Nombre Clase</th>
                      <th>Id Disciplina</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Nombre Clase</th>
                      <th>Id Disciplina</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {ClasesList.map((clases) => {
                      return (
                        <tr>
                          <td>{clases.id_clase}</td>
                          <td>{clases.nombre_clase}</td>
                          <td>{clases.id_disciplina}</td>
                          <th>
                            <Link to={`/portal/discipline_list/${clases.id_clase}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/discipline_list/${clases.id_clase}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(clases.id_clase)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default Clases