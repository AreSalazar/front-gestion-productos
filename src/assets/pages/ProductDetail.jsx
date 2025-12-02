import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

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
      axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error cargando producto:", err));
    }
  }, [id, product]);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${id}`);
    const savedComments = localStorage.getItem(`comments_${id}`);

    if (savedRating) setRating(parseInt(savedRating));
    if (savedComments) setCommentsList(JSON.parse(savedComments));
  }, [id]);

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${id}`, value);
  };

  const handleAddComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      user: currentUser.name,
      user_id: currentUser.id,
      text: comment,
      date: new Date().toLocaleDateString()
    };

    const newComments = [newComment, ...commentsList];
    setCommentsList(newComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
    setComment("");
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      `¿Seguro que quieres eliminar este comentario?\n\n"${commentsList[index].text}"`
    );

    if (!confirmDelete) return;

    const updated = commentsList.filter((_, i) => i !== index);
    setCommentsList(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    const currentText = commentsList[index].text;

    const newText = window.prompt(
      `Estás editando este comentario:\n\n"${currentText}"\n\nEscribe el nuevo texto abajo:`,
      currentText
    );

    if (!newText) return;

    const updated = [...commentsList];
    updated[index].text = newText;
    setCommentsList(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
  };

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

          {/* ESTRELLAS */}
          <div className="mb-4">
            <h5>Califica este producto</h5>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color:
                    (hover || rating) >= star ? "#ffc107" : "#e4e5e9"
                }}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
            <span className="ms-2 text-muted">({rating}/5)</span>
          </div>

          {/* AGREGAR COMENTARIO */}
          <div className="mb-4">
            <h5>Escribir opinión</h5>

            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Escribe tu comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="btn btn-primary w-100"
              onClick={handleAddComment}
            >
              Publicar comentario
            </button>
          </div>

          {/* LISTA DE COMENTARIOS */}
          {commentsList.length > 0 && (
            <div className="mt-4">
              <h5 className="fw-bold">
                Opiniones de clientes ({commentsList.length})
              </h5>

              {commentsList.map((c, index) => (
                <div
                  key={index}
                  className="border rounded p-3 mb-3 bg-light"
                >
                  <strong>{c.user}</strong>
                  <small className="text-muted d-block">
                    {c.date}
                  </small>

                  <p className="mt-2 mb-2">{c.text}</p>

                  {c.user_id === currentUser.id && (
                    <div>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button className="btn btn-dark w-100 mt-4">
            Añadir al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
