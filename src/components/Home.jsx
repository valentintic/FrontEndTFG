import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { AuthContext } from "../auth/context/AuthContext";
import { Navbar } from "./layout/Navbar";
import './Home.css';

const Home = () => {
  const { login } = useContext(AuthContext);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 500 },
  });

  return (
    <>
      <animated.div style={springProps} className="d-flex flex-column min-vh-100 home-background">
        <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-4 text-white mt-5">Bienvenido a AlmFit</h1>
          <p className="lead text-white mt-3">
            ¡Tu aplicación para gestionar alimentos y usuarios de forma eficiente!
          </p>
          {login.isAuth ? (
            <p className="lead text-white mt-3">
              Bienvenido, {login.user?.username}!
            </p>
          ) : (
            <>
              <p className="lead text-white mt-3">
                Inicia sesión para continuar.
              </p>
              <div className="mt-3">
                <Link to="/login" className="btn btn-primary btn-lg mr-2">
                  Iniciar sesión
                </Link>
              </div>
            </>
          )}

          <div className="mt-5">
            {login.isAuth && (
              <>
                {login.isAdmin && (
                  <Link to="/users" className="btn btn-secondary btn-lg mr-2">
                    Ir a Usuarios
                  </Link>
                )}
                <Link to="/alimentos" className="btn btn-secondary btn-lg mx-2">
                  Ir a Alimentos
                </Link>
                <Link to="/consumos" className="btn btn-secondary btn-lg mx-2">
                  Ir a Consumos Diarios
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src="https://imgs.search.brave.com/Qa0hcDxE7I7eoLpOgFQJl_Zi4aqzVqhgExCy_IMqmgU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/MTQxMjA1MC9lcy9m/b3RvL2FsaW1lbnRv/cy1jb24tYWx0by1j/b250ZW5pZG8tZGUt/Z3Jhc2FzLW9tZWdh/LTMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWhzOG5Nb2wt/ZFd1QVR6bEhCbnkt/SEl3VTRqaGR3ZWZs/YkxkQ19Pb1huLWc9"
                  className="card-img-top"
                  alt="Alimentos"
                />
                <div className="card-body text-dark border">
                  <h5 className="card-title">Gestión de Alimentos</h5>
                  <p className="card-text">
                    Administra todos los alimentos de manera fácil y rápida.
                    Puedes agregar, editar o eliminar alimentos.
                  </p>
                  <Link to="/alimentos" className="btn btn-primary">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src="https://imgs.search.brave.com/vB1eDvAjCgV8ZPxdWv3pDIycChG6XQMtTsCXdmW2cdA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/NjkzNzU4MS9lcy9m/b3RvL2VtcHJlc2Fy/aW8taGFibGFuZG8t/ZW4tZWwtdGVsJUMz/JUE5Zm9uby1jZWx1/bGFyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ycm96a2Fs/bzlIWVBaTUxPMjBB/dWNHamNnaVY5UlRa/eldlWm5rMlJlTV9j/PQ"
                  className="card-img-top"
                  alt="Usuarios"
                />
                <div className="card-body text-dark position-relative">
                  <h5 className="card-title">Gestión de Usuarios</h5>
                  <p className="card-text">
                    Gestiona los usuarios que tienen acceso a la aplicación.
                    Agrega nuevos usuarios, edita información o elimínalos.
                  </p>
                  {login.isAdmin ? (
                    <Link to="/users" className="btn btn-primary">
                      Ver más
                    </Link>
                  ) : (
                    <div className="overlay">Disponible solo para admin</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm position-relative">
                <img
                  src="https://img.freepik.com/foto-gratis/estrategia-competencia-cuota-mercado-papel-perforado-grafico_53876-16463.jpg?size=626&ext=jpg"
                  className="card-img-top"
                  alt="Reportes"
                />
                <div className="card-body text-dark">
                  <h5 className="card-title">Reportes</h5>
                  <p className="card-text">
                    Genera reportes detallados sobre el uso de la aplicación y
                    el rendimiento de los usuarios.
                  </p>
                  <div className="overlay">Disponible pronto...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-dark py-3 mt-auto">
          <div className="container text-center">
            <p className="mb-0 text-white">
              © 2024 AlmFit. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </animated.div>
    </>
  );
};

export default Home;
