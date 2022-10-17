import { Button, Dialog, DialogContentText } from "@mui/material";
import * as React from "react";
import Avatar1 from "../../assets/imgs/avatar-1.jpg";
import Avatar2 from "../../assets/imgs/avatar-2.jpg";
import Avatar3 from "../../assets/imgs/avatar-3.jpg";
import LoginDialog from "./components/login/login_dialog";
import SignUpDialog from "./components/sign_up/sign_up_dialog";
import "./landing_page.css";

const LandingPage = () => {
  const [ openLoginDialog, setOpenLoginDialog ] = React.useState(false);
  const [ openSignUpDialog, setOpenSignUpDialog ] = React.useState(false);

  const handleLoginOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  const handleSignUpOpen = () => {
    setOpenSignUpDialog(true);
  };

  const handleSignUpClose = () => {
    setOpenSignUpDialog(false);
  };


  return (
    <>
      <div>
        <nav
          className="navbar custom-navbar navbar-expand-md navbar-light fixed-top"
          data-spy="affix"
          data-offset-top="10"
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="assets/imgs/logo.svg" alt="" />
            </a>
            <button
              className="navbar-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#servicios">
                    Nuestros Servicios
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#nosotros">
                    Nosotros
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testimonios">
                    Testimonios
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contacto">
                    Contacto
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={handleLoginOpen}
                    className="ml-4 nav-link btn btn-primary btn-sm rounded"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={handleSignUpOpen}
                    className="ml-4 nav-link btn btn-secondary btn-sm rounded"
                  >
                    Registrar                 
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="header">
          <div className="overlay">
            <h1 className="subtitle">tus proyectos son importantes</h1>
            <h1 className="title">Construya facil</h1>
          </div>
          <div className="shape">
            <svg viewBox="0 0 1500 200">
              <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
            </svg>
          </div>
          <div className="mouse-icon">
            <div className="wheel"></div>
          </div>
        </header>
        {/* Servicios section */}
        <section id="servicios" className="section pt-0">
          <div className="container">
            <h6 className="section-title text-center">Nuestros servicios</h6>
            <h6 className="section-subtitle text-center mb-5 pb-3">
              Hacé tus proyectos de manera eficiente.
            </h6>
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <small className="text-primary font-weight-bold">01</small>
                    <h5 className="card-title mt-3">Creacior proyectos</h5>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, cquasi cupiditate voluptate
                      debitis saepe dolorem totam dolor repudiandae quo nihil,
                      repellendus nesciunt ab fuga quae, minima reprehenderit
                      sequi fugit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <small className="text-primary font-weight-bold">02</small>
                    <h5 className="card-title mt-3">
                      Administracion de proyectos
                    </h5>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, cquasi cupiditate voluptate
                      debitis saepe dolorem totam dolor repudiandae quo nihil,
                      repellendus nesciunt ab fuga quae, minima reprehenderit
                      sequi fugit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <small className="text-primary font-weight-bold">03</small>
                    <h5 className="card-title mt-3">Control de empleados</h5>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, cquasi cupiditate voluptate
                      debitis saepe dolorem totam dolor repudiandae quo nihil,
                      repellendus nesciunt ab fuga quae, minima reprehenderit
                      sequi fugit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End Servicios section */}

        {/* Nosotros Section */}
        <section className="section" id="nosotros">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-6 pr-md-5 mb-4 mb-md-0">
                <h6 className="section-title mb-0">Nosotros</h6>
                <h6 className="section-subtitle mb-4">Lideres en el pais</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptate molestiae temporibus et tenetur unde quasi, cum nemo
                  quo, molestias architecto alias voluptatibus corrupti corporis
                  earum. Necessitatibus maxime modi ipsam, quod!
                </p>
                <img
                  src="assets/imgs/about.jpg"
                  alt=""
                  className="w-100 mt-3 shadow-sm"
                />
              </div>
              <div className="col-md-6 pl-md-5">
                <div className="row">
                  <div className="col-6">
                    <img
                      src="assets/imgs/about-1.jpg"
                      alt=""
                      className="w-100 shadow-sm"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="assets/imgs/about-2.jpg"
                      alt=""
                      className="w-100 shadow-sm"
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nemo iusto quidem laborum atque, sapiente ipsa excepturi
                      fuga cum sed in assumenda eos quasi harum culpa laboriosam
                      nulla, incidunt quae. Voluptatum.
                    </p>
                    <p>
                      <b>
                        Aliquid fuga sunt velit, temporibus molestias ab. Ipsa
                        nesciunt totam, aliquid dignissimos.
                      </b>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nesciunt ut a dolorem, consectetur, eos suscipit
                      consequatur magnam est dolore obcaecati adipisci expedita,
                      vero, iste ducimus qui numquam animi facilis officia?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End OF Nosotros Section */}

        {/* Testimonios Section */}
        <section className="section" id="testimonios">
          <div className="container">
            <h6 className="section-title text-center mb-0">Testimonios</h6>
            <h6 className="section-subtitle mb-5 text-center">
              Lo que dicen nuestros clientes            </h6>
            <div className="row">
              <div className="col-md-4 my-3 my-md-0">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center mb-3">
                      <img className="mr-3" src={Avatar1} alt="" />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">John Doe</h6>
                        <small className="text-muted mb-0">
                          Business Analyst
                        </small>
                      </div>
                    </div>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus enim modi, id dicta reiciendis itaque.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-3 my-md-0">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center mb-3">
                      <img className="mr-3" src={Avatar2} alt="" />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">Maria Garcia</h6>
                        <small className="text-muted mb-0">
                          Insurance Agent
                        </small>
                      </div>
                    </div>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus enim modi, id dicta reiciendis itaque.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-3 my-md-0">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center mb-3">
                      <img className="mr-3" src={Avatar3} alt="" />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">Mason Miller</h6>
                        <small className="text-muted mb-0">
                          Residential Appraiser
                        </small>
                      </div>
                    </div>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus enim modi, id dicta reiciendis itaque.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Testimonios Section */}

        {/* Contacto Section */}
        <section id="contacto" className="section has-img-bg pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 my-3">
                <h6 className="mb-0">Telefono</h6>
                <p className="mb-4">+ 123-456-7890</p>
                <p></p>
              </div>
              <div className="col-md-4 my-3">
                <h6 className="mb-0">Direccion</h6>
                <p className="mb-4">Avellaneda</p>
                <p></p>
              </div>
              <div className="col-md-4 my-3">
                <h6 className="mb-0">Email</h6>
                <p className="mb-0">info@max.com</p>
                <p></p>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
        <Dialog open={openLoginDialog} onClose={handleLoginClose} maxWidth="lg" >
          {<LoginDialog />}
        </Dialog>
        <Dialog open={openSignUpDialog} onClose={handleSignUpClose} maxWidth="lg" >
          {<SignUpDialog />}
        </Dialog>
      </div>
    </>
  );
};

export default LandingPage;
