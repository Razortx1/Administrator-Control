import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComponentHistorial from "./client_component/clientHistorialM";
import ComponentEmergencia from "./client_component/clientContacto";
import { URLPattern } from "../url";

function UserView() {
  const params = useParams();
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const url = URLPattern()

  useEffect(() => {
    // On Load
    getUsers();
  }, []);


  const token = localStorage.getItem('authToken');
  const rut = userList.rut_clienta

  let navigate = useNavigate();
  if (!token){
    navigate("/")
  }

  let getUsers = async () => {
    try {
      const response = await fetch(
        `${url}api/clientas/${params.id}/`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          mode: "cors",
        }
      );
      // Verificamos si la respuesta fue exitosa (código 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json(); // Parseamos el JSON de la respuesta
      setUserList(user);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Clienta</h6>
        </div>
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
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Direccion</th>
                    <th>Estado Civil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userList.rut_clienta}</td>
                    <td>{userList.nombres}</td>
                    <td>{userList.apellido_paterno}</td>
                    <td>{userList.apellido_materno}</td>
                    <td>{userList.direccion}</td>
                    <td>{userList.tipo_estado_civil}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isLoading? <div></div> : (<div>
        <ComponentHistorial rut={rut}/>
        <ComponentEmergencia rut={rut} />
      </div>)}
    </>
    
  );
}

export default UserView;
