import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Userlist() {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome");
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8000/api/clientas/");
      setUserList(users.data);
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
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Usuarios</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Agregar Usuario
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
                      <th>Rut</th>
                      <th>Nombres</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Direccion</th>
                      <th>Estado Civil</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user) => {
                      return (
                        <tr>
                          <td>{user.rut_clienta}</td>
                          <td>{user.nombres}</td>
                          <td>{user.apellido_paterno}</td>
                          <td>{user.apellido_materno}</td>
                          <td>{user.direccion}</td>
                          <td>{user.tipo_estado_civil}</td>
                          <th>
                            <Link to={`/portal/user-view/${user.id_clienta}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/user-edit/${user.id_clienta}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(user.id_clienta)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default Userlist