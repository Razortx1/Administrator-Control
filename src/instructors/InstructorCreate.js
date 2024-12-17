import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function InstructorCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik(
    {
      initialValues: {
        rut_instructor: "",
        nombres: "",
        apellido_paterno: "",
        apellido_materno: "",
        esta_activo: ""
      },
      // Validating Forms while entering the data
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://ec2-18-234-61-11.compute-1.amazonaws.com/instructores/", values);
          navigate("/portal/instructores-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }

        console.log(values);
      }

    });
  return (
    <div className='container'>
      <h3>Crear Instructores</h3>
      <form onSubmit={myFormik.handleSubmit} id='formDisciplina'>
        <div className='row'>
          <div className="col-lg-6">
            <label>Rut Instructor</label>
            <input name='rut_instructor' value={myFormik.values.rut_instructor} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Nombre del Instructor</label>
            <input name='nombres' value={myFormik.values.nombres} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Apellido Paterno</label>
            <input name='apellido_paterno' value={myFormik.values.apellido_paterno} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Apellido Materno</label>
            <input name='apellido_materno' value={myFormik.values.apellido_materno} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className='col-lg-4'>
            <label>Esta Activo</label>
            <select name='esta_activo' value={myFormik.values.esta_activo} onChange={myFormik.handleChange} className='form-control'> 
              <option value="">----Seleccionar----</option>
              <option value="1">Si</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className='col-lg-4 mt-3'>
            <input disabled={isLoading} type="submit" value={isLoading ? "Subiendo..." : "Crear"} className=' btn btn-primary' />
          </div>
        </div>
      </form>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default InstructorCreate