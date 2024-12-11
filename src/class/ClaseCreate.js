import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ClaseCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik(
    {
      initialValues: {
        nombre_clase: "",
        id_disciplina: ""
      },
      // Validating Forms while entering the data
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("", values);
          navigate("/portal/user-list");
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
      <h3>Crear Clase</h3>
      <form onSubmit={myFormik.handleSubmit} id='formDisciplina'>
        <div className='row'>
          <div className="col-lg-6">
            <label>Nombre Clase</label>
            <input name='username' value={myFormik.values.nombre_clase} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Disciplina</label>
            <input name='username' value={myFormik.values.id_disciplina} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
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

export default ClaseCreate