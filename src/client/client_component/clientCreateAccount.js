import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { URLPattern } from "../../url";

function ClientCreate() {
  const params = useParams();
  const [clientCreate, setClientCreate] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const url = URLPattern()

  useEffect(() => {
    getUser();
  }, []);

  const createUserSchema = Yup.object().shape({
    username: Yup.string().required("Debe de haber un nombre para el usuario"),
    email: Yup.string()
      .email("Correo Electronico no valido. Ejemplo: example@example.cl")
      .required("Campo requerido"),
    password: Yup.string()
      .required("La contraseña no puede estar vacia")
      .min(8, "La contraseña no debe ser menor de 8 caracteres")
      .max(16, "La contraseña tiene un minimo de 16 caracteres"),
    confirmpassword: Yup.string()
      .required("Campo requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
    clienta: Yup.string()
    .required("Campo requerido")
  });

  let getUser = async () => {
    const user = await axios.get(
      `${url}api/clientas/?search=${params.rut}`
    );
    const data = user.data.results;
    setClientCreate(data[0]);
  };
  const myFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      clienta: "",
    },
    validationSchema: createUserSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post(`${url}/api/usuarios/`, values);
        navigate("/portal/user-list");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      console.log(values);
    },
  });
  return (
    <div className="container">
      <div>
        <h3 className="mb-4">Crear nueva clienta</h3>
      </div>

      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Nombre de Usuario</label>
            <input
              name="username"
              value={myFormik.values.username}
              onChange={myFormik.handleChange}
              type={"text"}
              className="form-control"
            />
            {myFormik.touched.username && myFormik.errors.username ? (
              <div style={{ color: "red" }}>{myFormik.errors.username}</div>
            ) : null}
          </div>

          <div className="col-lg-6">
            <label>Correo Electronico</label>
            <input
              name="email"
              value={myFormik.values.email}
              onChange={myFormik.handleChange}
              type={"email"}
              className="form-control"
            />
            {myFormik.touched.email && myFormik.errors.email ? (
              <div style={{ color: "red" }}>{myFormik.errors.email}</div>
            ) : null}
          </div>

          <div className="col-lg-4">
            <label>Constraseña</label>
            <input
              name="password"
              value={myFormik.values.password}
              onChange={myFormik.handleChange}
              type={"password"}
              className="form-control"
            />
            {myFormik.touched.password && myFormik.errors.password ? (
              <div style={{ color: "red" }}>{myFormik.errors.password}</div>
            ) : null}
          </div>

          <div className="col-lg-4">
            <label>Validar Constraseña</label>
            <input
              name="confirmpassword"
              value={myFormik.values.confirmpassword}
              onChange={myFormik.handleChange}
              type={"password"}
              className="form-control"
            />
            {myFormik.touched.confirmpassword &&
            myFormik.errors.confirmpassword ? (
              <div style={{ color: "red" }}>
                {myFormik.errors.confirmpassword}
              </div>
            ) : null}
          </div>
          <div className="col-lg-4">
            <label>Clienta</label>
            <select
              name="clienta"
              value={myFormik.values.clienta}
              onChange={myFormik.handleChange}
              className="form-control"
            >
              <option value="">-------Selecciona-------</option>
              <option value={clientCreate.id_clienta}>{clientCreate.nombres}</option>
            </select>
            {myFormik.touched.clienta && myFormik.errors.clienta ? (
              <div style={{ color: "red" }}>{myFormik.errors.clienta}</div>
            ) : null}
          </div>
          <div className="col-lg-4 mt-3">
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Subiendo..." : "Crear"}
              className=" btn btn-primary"
            />
          </div>
        </div>
      </form>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default ClientCreate;
