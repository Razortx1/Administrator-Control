import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [Estadocivil, setEstadoCivil] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();



  const getEstadoCivil = async () =>{
    try {
      const estado = await axios.get('http://18.234.61.11:8000/api/estado-civil/');
      setEstadoCivil(estado.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getEstadoCivil();
  }, [])

  const myFormik = useFormik(
    {
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
      // Validating Forms while entering the data
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://18.234.61.11:8000/clientas/", values);
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
      <div>
        <h3 className='mb-4'>Crear nueva clienta</h3>
      </div>

      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Rut de la Clienta</label>
            <input name='rut_clienta' value={myFormik.values.rut_clienta} onChange={myFormik.handleChange} type={"text"}
            className='form-control'/>
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

          <div className='col-lg-4'>
            <label>Estado Civil</label>
            <select name='id_estado_civil' value={myFormik.values.id_estado_civil} onChange={myFormik.handleChange} className='form-control'> 
              <option value="">----Selecciona----</option>
              {Estadocivil.map((civil) =>{
                return(
                  <option value={civil.id_estado_civil}>{civil.tipo_estado_civil}</option>
                )
              })}
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

export default UserCreate