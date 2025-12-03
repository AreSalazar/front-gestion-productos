import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RatingStars from './RatingStars';

export default function ReviewList({ productId, onEdit, refreshKey }) {

  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    loadReviews();
    loadAverage();
  }, [productId, refreshKey]);

  const loadReviews = async () => {
    try {
      const res = await api.get(`/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAverage = async () => {
    try {
      const res = await api.get(`/products/${productId}/reviews/average`);
      setAverage(Number( res.data.average_rating)||0);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (id) => {
    if(!window.confirm("¿Eliminar comentario?")) return;

    try {
      await api.delete(`/reviews/${id}`);
      loadReviews();
      loadAverage();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="mt-5">

      <div className="border p-3 rounded bg-light text-center mb-4">
        <h5>Valoración general</h5>
        <RatingStars value={Math.round(average)} />
        <h4>{average}</h4>
      </div>

      <h5>Comentarios de clientes</h5>

      {reviews.length === 0 && (
        <p className="text-muted">Sin comentarios aún</p>
      )}

      {reviews.map(review => (
        <div className="card my-3 shadow-sm" key={review.id}>
          <div className="card-body">

            <RatingStars value={review.rating} />

            <p className="mt-2">{review.comment}</p>

            <small className="text-muted">
              {new Date(review.created_at).toLocaleDateString()}
            </small>

            <div className="mt-3 d-flex gap-2">
              <button 
                className="btn btn-sm btn-outline-warning"
                onClick={() => onEdit(review)}
              >
                Editar
              </button>

              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteReview(review.id)}
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}
