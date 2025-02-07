import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URLPattern } from '../url';

function DisciplinaCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const url = URLPattern()

  const myFormik = useFormik(
    {
      initialValues: {
        nombre_disciplina: "",
        descripcion_disciplina: "",
        rango_horarios: "",
        id_instructor: "",
        id_cantidad_clases_disciplina: ""
      },
      // Validating Forms while entering the data
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post(`${url}api/disciplinas`, values);
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
      <h3>Crear Disciplina</h3>
      <form onSubmit={myFormik.handleSubmit} id='formDisciplina'>
        <div className='row'>
          <div className="col-lg-6">
            <label>Nombre Disciplina</label>
            <input name='username' value={myFormik.values.nombre_disciplina} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Rango de Horario</label>
            <input name='username' value={myFormik.values.rango_horarios} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Instructor</label>
            <input name='id_instructor' value={myFormik.values.id_instructor} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className="col-lg-6">
            <label>Cantidad de Clases por Disciplina</label>
            <input name='id_cantidad_clases_disciplina' value={myFormik.values.id_cantidad_clases_disciplina} onChange={myFormik.handleChange} type={"text"}
              className={`form-control`} />
          </div>

          <div className='col-lg-4 mt-3'>
            <input disabled={isLoading} type="submit" value={isLoading ? "Subiendo..." : "Crear"} className=' btn btn-primary' />
          </div>
        </div>
      </form>
      <div className="col-lg-6">
            <label>Descripcion de la Disciplina</label>
            <textarea name='descripcion_disciplina' value={myFormik.values.descripcion_disciplina} onChange={myFormik.handleChange}
              className={`form-control`} form='formDisciplina' required/>
          </div>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default DisciplinaCreate