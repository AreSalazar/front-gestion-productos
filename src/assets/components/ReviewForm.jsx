import React, { useState } from 'react';
import api from '../services/api';
import RatingStars from './RatingStars';

export default function ReviewForm({ productId, onFinish, editingReview }) {
  const [rating, setRating] = useState(editingReview?.rating || 5);
  const [comment, setComment] = useState(editingReview?.comment || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingReview) {
        await api.put(`/reviews/${editingReview.id}`, {
          rating,
          comment
        });
      } else {
        await api.post(`/products/${productId}/reviews`, {
          rating,
          comment
        });
      }

      setComment("");
      setRating(5);

      if(onFinish) onFinish();

    } catch (error) {
      console.error(error);
      alert("Error al guardar comentario");
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h5>
          {editingReview ? "Editar comentario" : "Dejar una reseña"}
        </h5>

        <form onSubmit={handleSubmit}>

          <label>Calificación</label>
          <RatingStars value={rating} onChange={setRating} />

          <div className="mt-3">
            <textarea 
              className="form-control"
              placeholder="Escribe tu experiencia..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary mt-3 w-100">
            { editingReview ? "Actualizar" : "Enviar reseña" }
          </button>

        </form>

      </div>
    </div>
  );
}
