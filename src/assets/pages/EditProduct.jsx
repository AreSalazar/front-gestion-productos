import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //Cargando el producto
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);

                const p = response.data.product || response.data.data || response.data;

                setForm({
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    stock: p.stock,
                });

            } catch (err) {
                setError("No se pudo cargar el producto");
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //EDITAR (PUT)--------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/products/${id}`, form);

            alert("Producto actualizado correctamente!");

            navigate(`/products/${id}`);

        } catch (err) {
            console.log(err);
            setError("Error al actualizar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <h2 className="mb-4 text-center fw-bold">Editar Producto</h2>

            {error && <p className="text-danger text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4">

                <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                        name="description"
                        rows="3"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Precio</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={form.stock}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex gap-3 mt-3">

                    <button
                        className="btn btn-warning w-50 py-2 fw-semibold"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary w-50 py-2 fw-semibold"
                        onClick={() => navigate("/productos")}
                    >
                        Cancelar
                    </button>

                </div>

            </form>
        </div>
    );
}
