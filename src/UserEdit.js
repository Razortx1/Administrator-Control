import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getUserData()
    }, [])

    let getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:8000/api/clientas/${params.id}`);
            myFormik.setValues(user.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            nombres: "",
            apellido_Paterno: "",
            apellido_Materno: "",
            direccion: "",
            estado_Civil: 0
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.nombres) {
                errors.nombres = "Debes ingresar tus nombres";
            }

            if (!values.apellido_Paterno) {
                errors.apellido_Paterno = "Debes ingresar tu apellido paterno";
            }

            if (!values.apellido_Materno) {
                errors.apellido_Materno = "Debes ingresar tu apellido paterno";
            }

            if (!values.direccion) {
                errors.direccion = "Debes dar la direccion de tu hogar";
            }

            if (!values.estado_Civil) {
                errors.estado_Civil = "Debes ingresar su estado civil";
            }
            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://localhost:8000/api/clientas/${params.id}`, values);
                setLoading(false);
                navigate("/portal/user-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>UserEdit - Id : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Nombres</label>
                            <input name='nombres' value={myFormik.values.nombres} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.nombres ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.nombres}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Apellido Paterno</label>
                            <input name='apellido_paterno' value={myFormik.values.apellido_Paterno} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.apellido_Paterno ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.apellido_Paterno}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Apellido Materno</label>
                            <input name='apellido_materno' value={myFormik.values.apellido_Materno} onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.apellido_Materno ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.apellido_Materno}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Direccion</label>
                            <input name='direccion' value={myFormik.values.direccion} onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.direccion ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.direccion}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Estado Civil</label>
                            <select name='estado_civil' value={myFormik.values.estado_Civil} onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.estado_Civil ? "is-invalid" : ""} `}>
                                <option value=''>-----Selecciona------</option>
                                <option value='1'>Casada</option>
                                <option value='2'>Soltera</option>
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.estado_Civil}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default UserEdit