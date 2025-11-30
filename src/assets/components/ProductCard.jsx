import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const imageUrl = product.image
    ? `http://127.0.0.1:8000/storage/${product.image}`
    : "https://via.placeholder.com/300x200?text=Producto";

  return (
    <div className="card h-100 shadow-sm border-0 hover-shadow">

      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={imageUrl}
          className="card-img-top h-100 w-100"
          style={{ objectFit: "cover" }}
          alt={product.name}
        />
      </div>

      <div className="card-body d-flex flex-column justify-content-between">

        <div>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <p className="card-text text-muted small">
            {product.description?.substring(0, 60)}...
          </p>
        </div>

        <div className="mt-3">
          <h4 className="text-primary fw-bold mb-3">
            ${product.price}
          </h4>

          <div className="d-grid gap-2">
            <Link
              to={`/products/${product.id}`}
              className="btn btn-outline-dark"
            >
              Ver detalles
            </Link>

            <button className="btn btn-dark">
              Añadir al carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
