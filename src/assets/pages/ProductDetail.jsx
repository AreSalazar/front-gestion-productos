import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);


  const [editingReview, setEditingReview] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  // SI NO HAY USUARIO → ponemos uno ficticio
  let currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    currentUser = {
      id: 999,
      name: "Invitado"
    };
  }

  const imageUrl = product?.image
    ? `http://localhost:8000/storage/${product.image}`
    : "https://via.placeholder.com/500x300?text=Producto";

  useEffect(() => {
    if (!product) {
      api
        .get(`http://localhost:8000/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error cargando producto:", err));
    }
  }, [id, product]);


  if (!product)
    return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container my-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Volver
      </Link>

      <div className="row g-5">
        <div className="col-md-6">
          <img
            src={imageUrl}
            className="img-fluid rounded shadow"
            alt={product.name}
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <p className="text-success">Stock disponible: {product.stock}</p>

          <h3 className="text-primary fw-bold mb-3">
            ${product.price}
          </h3>

          {/* FORMULARIO DE RESEÑA */}
          <ReviewForm 
          productId={id} 
          editingReview={editingReview}
          onFinish={() => {
            setEditingReview(null);
            setRefreshKey(oldKey => oldKey + 1);
          }} 
          />
          {/* LISTA DE RESEÑAS */}
          <ReviewList 
          productId={id} 
          refreshKey={refreshKey}
          onEdit={(review) => setEditingReview(review)} 
          />


          <button className="btn btn-dark w-100 mt-4">
            Añadir al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
