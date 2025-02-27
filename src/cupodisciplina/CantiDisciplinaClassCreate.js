import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URLPattern } from '../url';

function CantiDisciplineClassCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const url = URLPattern()

  const myFormik = useFormik(
    {
      initialValues: {
        cantidad_clases: ""
      },
      // Validating Forms while entering the data
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post(`${url}/cantidad-clase-disciplina/`, values);
          navigate("/portal/cant-discipline-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }
      }

    });
  return (
    <div className='container'>
      <h3>Agrega una cantidad de cupos para Disciplinas</h3>
      <form onSubmit={myFormik.handleSubmit} id='formDisciplina'>
        <div className='row'>
          <div className="col-lg-6">
            <label>Asigna un numero de cupos por disciplina</label>
            <input name='cantidad_clases' value={myFormik.values.cantidad_clases} onChange={myFormik.handleChange} type={"text"}
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

export default CantiDisciplineClassCreate