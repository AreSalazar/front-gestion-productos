import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        // Soporta diferentes estructuras de respuesta
        if (response.data?.data) {
          setProduct(response.data.data);
        } else if (response.data?.product) {
          setProduct(response.data.product);
        } else {
          setProduct(response.data);
        }

      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center fs-4 mt-5">Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-center text-danger fs-5 mt-5">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Producto no encontrado</p>;
  }

  const imageUrl = product.image
    ? `http://127.0.0.1:8000/storage/${product.image}`
    : "https://via.placeholder.com/500x350?text=Producto";

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="card border-0 shadow-lg p-4 rounded-4">

            <h2 className="mb-4 fw-bold text-center">
              🛍️ Detalle del producto
            </h2>

            <div className="row g-4 align-items-center">

              {/* IMAGEN */}
              <div className="col-md-6">

                <div className="overflow-hidden rounded-4 product-detail-img">
                  <img
                    src={imageUrl}
                    className="img-fluid w-100"
                    alt={product.name}
                  />
                </div>

              </div>

              {/* INFO */}
              <div className="col-md-6 d-flex flex-column justify-content-between">

                <div>
                  <h3 className="fw-bold">{product.name}</h3>

                  <p className="text-muted mt-3">
                    {product.description}
                  </p>

                  <p className="display-6 fw-bold text-primary mt-4">
                    ${product.price}
                  </p>
                </div>

                <div className="d-flex gap-3 mt-4">

                  <button className="btn btn-success px-4 py-2 fw-semibold">
                    Añadir al carrito
                  </button>

                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-primary px-4 py-2 fw-semibold"
                  >
                    Volver
                  </button>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
