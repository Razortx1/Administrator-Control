import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Userlist() {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    setUserList([])
    getUsers();
  }, []);

  const token = localStorage.getItem('authToken');

  let navigate = useNavigate();
  if (!token){
    navigate("/")
  }

  let getUsers = async (rut) => {
    try {
      if (rut) {
        const users = await axios.get(`http://18.234.61.11:8000/api/clientas/?search=${rut}`);
        setUserList(users.data);
        setLoading(false);
      }
      else{
      const users = await axios.get(`http://18.234.61.11:8000/api/clientas/?search=`);
      setUserList(users.data);
      setLoading(false);}

    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://18.234.61.11:8000/api/clientas/${id}/`);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <div className='d-sm-flex align-items-center justify-content mb-3 mt-3' style={{paddingLeft: 200, paddingRight: 200}}>
      <input type='text' className='form-control' placeholder='Ingresa rut o el nombre del cliente' onChange={(e) =>{
        getUsers(e.target.value)
      }}/>
    </div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista de Clienta</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Agregar Clienta
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
                            <Link to={`/portal/user-view/${user.id_clienta}`} className='btn btn-primary btn-sm mr-1'>Revisar</Link>
                            <Link to={`/portal/user-edit/${user.id_clienta}`} className='btn btn-info btn-sm mr-1'>Editar</Link>
                            <button onClick={() => handleDelete(user.id_clienta)} className='btn btn-danger btn-sm mr-1'>Eliminar</button>
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