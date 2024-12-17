import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://18.234.61.11:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate("/portal/dashboard")
      }
      else{
        setError('Credenciales erroneas')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div class="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image">
                <img
                  src="./images.png"
                  alt="Logo One Gym"
                  className="col justify-content-center"
                />
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Bienvenido de vuelta!</h1>
                  </div>
                  <form className="user" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="nombre_usuario"
                        name="username"
                        value={username}
                        onChange={(e) =>{
                            setUsername(e.target.value)
                        }}
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu nombre de usuario"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="form-control form-control-user"
                        id="contraseña"
                        onChange={(e) =>{
                            setPassword(e.target.value)
                        }}
                        placeholder="Ingresa tu contreseña"
                      />
                    </div>
                    <div>
                        {error && <label className="alert alert-danger row justify-content-center">{error}</label>}
                    </div>
                    <button
                      className="btn btn-primaty btn-user btn-block"
                      style={{ backgroundColor: "fuchsia" }}
                    >
                      Iniciar Sesion
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Te olvidaste de la contaseña?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
