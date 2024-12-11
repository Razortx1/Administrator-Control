import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserView() {
  const params = useParams();
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getUsers();
    console.log("welcome to userview");
  }, []);

  let getUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/clientas/${params.id}/`,
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
      console.log(user);
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
    </>
  );
}

export default UserView;
