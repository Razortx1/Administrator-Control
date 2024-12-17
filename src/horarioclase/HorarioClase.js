import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { faFootball } from '@fortawesome/free-solid-svg-icons'

function HorarioClase() {

  const [horarioClaseList, sethorarioClaseList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //On Load
    getHorarioClase();
  }, []);

  const token = localStorage.getItem('authToken');

  let navigate = useNavigate();
  if (!token){
    navigate("/")
  }

  let getHorarioClase = async () => {
    try {
      const horarioclase = await axios.get("http://18.234.61.11:8000/api/horario-clase/");
      sethorarioClaseList(horarioclase.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://18.234.61.11:8000/api/horario-clase/${id}/`);
        getHorarioClase();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista del Horario de las Clases</h1>
        <Link to="/portal/horario-clase-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faFootball} className="creatinguser mr-2" />
          Agregar Horario
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
                      <th>Nombre Clase</th>
                      <th>Fecha de la Clase</th>
                      <th>Hora de Inicio</th>
                      <th>Hora de Termino</th>
                      <th>Cupo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarioClaseList.map((horarioclase) => {
                      return (
                        <tr>
                          <td>{horarioclase.nombre_clase}</td>
                          <td>{horarioclase.fecha_clase}</td>
                          <td>{horarioclase.hora_inicio}</td>
                          <td>{horarioclase.hora_fin}</td>
                          <td>{horarioclase.cupo}</td>
                          <th>
                            <Link to={`/portal/horario-clase-view/${horarioclase.idhorarios}`} className='btn btn-primary btn-sm mr-1'>Revisar</Link>
                            <Link to={`/portal/horario-clase-view/${horarioclase.idhorarios}`} className='btn btn-info btn-sm mr-1'>Editar</Link>
                            <button onClick={() => handleDelete(horarioclase.idhorarios)} className='btn btn-danger btn-sm mr-1'>Eliminar</button>
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

export default HorarioClase