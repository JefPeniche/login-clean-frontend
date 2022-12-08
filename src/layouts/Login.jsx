import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    setError("");
    const response = await fetch(`${API_URL}login`, options);
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <section>
      <div className="row g-0">
        <div className="col-lg-7">
          <div
            id="carouselCaptions"
            className="carousel slide"
            data-bs-ride="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item img-1 min-vh-100 active">
                <div className="carousel-caption">
                  <h5>Mas miles de productos en un solo click</h5>
                </div>
              </div>
              <div className="carousel-item img-2 min-vh-100">
                <div className="carousel-caption">
                  <h5>Mas miles de productos en un solo click</h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-column align-items-end min-vh-100">
          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto">
            {error && (
              <div
                id="error"
                className="alert alert-danger ocultar"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
          <div className="px-lg-5 py-lg-4 p-4 w-100 align-self-center">
            <h1 className="rb-4">Inicia sesion</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="InputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-blue-x border-0"
                  placeholder="Ingresa tu email"
                  id="InputEmail"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="InputPassword" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control bg-blue-x border-0 mb-2"
                  placeholder="Ingresa tu contraseña"
                  id="InputPassword"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesion
              </button>
            </form>
          </div>
          <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 pb-4 w-100 mt-auto">
            <p className="mb-0">
              ¿Todavia no tienes una cuenta?
              <Link to={"/signup"} className="text-decoration-none">
                Crea una ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
