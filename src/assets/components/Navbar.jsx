import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          💻 TechPro
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto gap-3 text-center align-items-lg-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle" to="#" id="productsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                  >
                    Productos
                  </Link>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark border-0 shadow">
                    <li>
                      <Link className="dropdown-item text-light" to="/productos">
                        Ver productos
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item text-light" to="/productos/crear">
                        Agregar producto
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    Hola, {user?.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
