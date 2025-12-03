import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
  if (!product) return null;

  const imageUrl = product.image
    ? `http://127.0.0.1:8000/storage/${product.image}`
    : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";

  const stock = product.stock ?? 0;

  return (
    <div className="card h-100 shadow-sm border-0 hover-shadow position-relative">

      {/* BADGE DE CATEGORÍA */}
      {product.category && (
        <span
          className="badge bg-primary position-absolute"
          style={{ top: "10px", left: "10px", zIndex: 1 }}
        >
          {product.category}
        </span>
      )}

      {/* IMAGEN */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={imageUrl}
          className="card-img-top h-100 w-100"
          style={{ objectFit: "cover", transition: "0.3s" }}
          alt={product.name}
        />
      </div>

      {/* CONTENIDO */}
      <div className="card-body d-flex flex-column justify-content-between">

        <div>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <RatingStars value={Math.round(product.reviews_avg_rating)} />

          {/* DESCRIPCIÓN */}
          <p className="card-text text-muted small">
            {product.description
              ? product.description.substring(0, 60) + "..."
              : "Sin descripción disponible"}
          </p>

          {/* STOCK */}
          <p
            className={`fw-semibold ${
              stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {stock > 0 ? `Disponible: ${stock}` : "Agotado"}
          </p>
        </div>

        <div className="mt-3">
          <h4 className="text-primary fw-bold mb-3">
            ${product.price}
          </h4>

          <div className="d-grid gap-2">
            <Link 
              to={`/products/${product.id}`} 
              state={{ product }}
              className="btn btn-primary"
            >
              Ver detalles
            </Link>


            <button
              className="btn btn-dark"
              disabled={stock <= 0}
            >
              {stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
