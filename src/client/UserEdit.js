import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URLPattern } from "../url";

function UserEdit() {
  const params = useParams();
  const [Estadocivil, setEstadoCivil] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const url = URLPattern()

  useEffect(() => {
    if (getUserData) {
      myFormik.setValues(getUserData);
      console.log(getUserData()); // Sincroniza los valores con los datos cargados
    }
    getEstadoCivil();
  }, []);

  const getEstadoCivil = async () => {
    try {
      const estado = await axios.get(`${url}/api/estado-civil/`);
      setEstadoCivil(estado.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  let getUserData = async () => {
    try {
      const response = await fetch(
        `${url}clientas/${params.id}/`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          mode: "cors",
        }
      );
      const user = await response.json()
      myFormik.setValues(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      rut_clienta: "",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      direccion: "",
      telefono: "",
      ocupacion: "",
      fecha_de_nacimiento: "",
      id_estado_civil: "",
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://http://ec2-18-234-61-11.compute-1.amazonaws.com/api/clientas/${params.id}/`,
          values
        );
        setLoading(false);
        navigate("/portal/user-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });
  return (
    <>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Rut de la Clienta</label>
              <input
                name="rut_clienta"
                value={myFormik.values.rut_clienta}
                onChange={myFormik.handleChange}
                type={"text"}
                className="form-control"
              />
            </div>

            <div className="col-lg-6">
            <label>Nombre de la Clienta</label>
            <input name='nombres' value={myFormik.values.nombres} onChange={myFormik.handleChange} type={"text"} className='form-control'/>
          </div>

          <div className='col-lg-4'>
            <label>Apellido Paterno</label>
            <input name='apellido_paterno' value={myFormik.values.apellido_paterno} onChange={myFormik.handleChange} type={"text"} className='form-control'/>
          </div>

          <div className='col-lg-4'>
            <label>Apellido Materno</label>
            <input name='apellido_materno' value={myFormik.values.apellido_materno} onChange={myFormik.handleChange} type={"text"} className='form-control' />
          </div>

          <div className='col-lg-4'>
            <label>Direccion</label>
            <input name='direccion' value={myFormik.values.direccion} onChange={myFormik.handleChange} type={"text"} className='form-control'/>
          </div>

          <div className='col-lg-4'>
            <label>Telefono Celular</label>
            <input name='telefono' value={myFormik.values.telefono} onChange={myFormik.handleChange} type={"text"} className='form-control' />
          </div>

          <div className='col-lg-4'>
            <label>Ocupación</label>
            <input name='ocupacion' value={myFormik.values.ocupacion} onChange={myFormik.handleChange} type={"text"} className='form-control'/>
          </div>

          <div className='col-lg-4'>
            <label>Fecha de Nacimiento</label>
            <input name='fecha_de_nacimiento' value={myFormik.values.fecha_de_nacimiento} onChange={myFormik.handleChange} type={"date"} className='form-control'/>
          </div>

            <div className="col-lg-4">
              <label>Estado Civil</label>
              <select
                name="id_estado_civil"
                value={myFormik.values.id_estado_civil}
                onChange={myFormik.handleChange}
                className={`form-control`}
              >
                <option value="">-----Selecciona------</option>
                {Estadocivil.map((civil) => {
                  return (
                    <option value={civil.id_estado_civil}>
                      {civil.tipo_estado_civil}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-4 mt-3">
              <input
                disabled={isLoading}
                type="submit"
                value={isLoading ? "Actualizando..." : "Actualizar"}
                className=" btn btn-primary"
              />
            </div>
          </div>
        </form>
        {/* {JSON.stringify(myFormik.values)} */}
      </div>
    </>
  );
}

export default UserEdit;
