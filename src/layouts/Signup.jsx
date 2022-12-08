import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const { email, name, password, repeatPassword } = formRef.current;
    if (password.value !== repeatPassword.value) {
      setError("Las contraseñas no coinciden");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          password: password.value,
        }),
      };
      const response = await fetch(`${API_URL}sign-up`, options);
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
      } else {
        setError(data.message);
      }
    }
  };

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <Link to="/login" className="btn btn-outline-primary">
            Iniciar sesion
          </Link>
        </div>
      </nav>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-light p-5 rounded-5 w-50">
          <div className="align-self-center">
            <h1 className="text-center">Registrarse</h1>
            <form id="form" ref={formRef} onSubmit={handleSubmit}>
              <div id="msg"></div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group mb-2">
                <label htmlFor="InputName" className="form-label">
                  Nombre
                </label>
                <input
                  type="name"
                  className="form-control bg-blue-x border-0"
                  placeholder="Ingresa tu nombre completo"
                  name="name"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="InputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-blue-x border-0"
                  placeholder="Ingresa tu email"
                  name="email"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="InputPassword" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control bg-blue-x border-0"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="InputPassword2" className="form-label">
                  Confirma tu contraseña
                </label>
                <input
                  type="password"
                  className="form-control bg-blue-x border-0"
                  placeholder="Ingresa tu contraseña nuevamente"
                  name="repeatPassword"
                  required
                />
              </div>
              <button
                type="submit"
                id="register"
                className="btn btn-primary w-100"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
