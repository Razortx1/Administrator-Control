import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { URLPattern } from "../../url";
import * as Yup from 'yup'

function ClientHistorialEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

    const url = URLPattern()

    useEffect(()=>{
      if (getHistorial) {
        myFormik.setValues(getHistorial);
      }
        
    }, [])

    let getHistorial = async () => {
        try {
            const historialR = await fetch(`${url}/api/historial-medico/${params.id}/`,
              {
                method: "GET",
                headers: new Headers({ "Content-type": "application/json" }),
                mode: "cors"
              }
            )
            const historialS = await historialR.json()
            myFormik.setValues(historialS)
        } catch (error) {
            console.log(error)
        }
    }

    const myFormik = useFormik({
        initialValues:{
            tiene_alergias: "",
            detalle_alergia: "",
            tiene_cirugias: "",
            detalle_cirugia: "",
            tiene_enfermedades: "",
            detalle_enfermedad: "",
            id_clienta: ""
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await fetch(`${url}/api/historial-medico/${params.id}/`, {
                  method: 'PATCH',
                  mode: "cors",
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
              });
                setLoading(false)
                navigate(`/portal/user-view/${values.id_clienta}`);
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
    })


    return(
        <div className="container">
      <div>
        <h3 className="mb-4">Agregar nuevo historial medico</h3>
      </div>

      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>¿Tiene Alergias?</label>
            <select
              name="tiene_alergias"
              value={myFormik.values.tiene_alergias}
              onChange={myFormik.handleChange}
              className="form-control"
            >
                <option value="">------Selecciona------</option>
                <option value="1">Si</option>
                <option value="0">No</option>
            </select>
          </div>

          <div className="col-lg-6">
            <label>Detalles de la alergia</label>
            <textarea
              name="detalle_alergia"
              value={myFormik.values.detalle_alergia}
              onChange={myFormik.handleChange}
              type={"text"}
              className="form-control"
            />
          </div>

          <div className="col-lg-4">
            <label>¿Tiene alguna cirugia?</label>
            <select
              name="tiene_cirugias"
              value={myFormik.values.tiene_cirugias}
              onChange={myFormik.handleChange}
              className="form-control"
            >
                <option value="">------Selecciona------</option>
                <option value="1">Si</option>
                <option value="0">No</option>
            </select>
          </div>

          <div className="col-lg-4">
            <label>Detalle de la cirugia</label>
            <textarea
              name="detalle_cirugia"
              value={myFormik.values.detalle_cirugia}
              onChange={myFormik.handleChange}
              type={"text"}
              className="form-control"
            />
          </div>

          <div className="col-lg-4">
            <label>¿Tiene alguna enfermedad?</label>
            <select
              name="tiene_enfermedades"
              value={myFormik.values.tiene_enfermedades}
              onChange={myFormik.handleChange}
              className="form-control"
            >
                <option value="">------Selecciona------</option>
                <option value="1">Si</option>
                <option value="0">No</option>
            </select>
          </div>

          <div className="col-lg-4">
            <label>Detalle de la enfermedad</label>
            <textarea
              name="detalle_enfermedad"
              value={myFormik.values.detalle_enfermedad}
              onChange={myFormik.handleChange}
              type={"text"}
              className="form-control"
            />
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
    )

}

export default ClientHistorialEdit;