import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await fetch(`${API_URL}users`);
    const data = await response.json();
    if (data.success) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      loadUsers();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <h1>Home</h1>
          <button onClick={handleLogout} className="btn btn-outline-primary">
            Cerrar sesion
          </button>
        </div>
      </nav>
      <div>
        <h2 className="text-center">Bienvenido</h2>
        <div className="container d-flex flex-column ">
          <h3>Usuarios activos: </h3>
          {users.map((user) => (
            <div className="d-flex p-2 align-items-center gap-2">
              <span className="mb-0">
                <h3>{user.name}</h3>
              </span>
              <span>
                <p className="mb-0">{user.email}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
