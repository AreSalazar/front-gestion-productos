export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Marca */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">💻 TechPro</h4>
            <p className="text-secondary">
              Tu tienda confiable de productos tecnológicos.
            </p>
          </div>

          {/* Enlaces */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-secondary">Inicio</a></li>
              <li><a href="/productos" className="text-decoration-none text-secondary">Productos</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contacto</h5>
            <p className="text-secondary mb-1">📍 El Salvador</p>
            <p className="text-secondary mb-1">📧 techpro@gmail.com</p>
            <p className="text-secondary">📞 +503 0000 0000</p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center pb-3">
          <small className="text-secondary">
            © 2025 <strong>TechPro</strong> - Todos los derechos reservados
          </small>
        </div>
      </div>
    </footer>
  );
}
