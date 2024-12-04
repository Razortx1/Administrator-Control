import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserView() {
  const params = useParams();
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome to userview");
  }, []);

  let getUsers = async () => {
    try {
      const user = await axios.get(`http://localhost:8000/api/clientas/${params.id}`);
      console.log(user);
      setUserList(user.data);
      // console.log(userList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  return (
    <>
      <div>UserView - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
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
                    <th>Id</th>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Direccion</th>
                    <th>Estado Civil</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Direccion</th>
                    <th>Estado Civil</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>{userList.id}</td>
                    <td> {userList.nombres} </td>
                    <td>{userList.apellido_paterno}</td>
                    <td>{userList.apellido_materno}</td>
                    <td>{userList.direccion}</td>
                    <td>{userList.id_estado_civil}</td>
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
