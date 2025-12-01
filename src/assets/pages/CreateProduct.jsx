import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Manejo de inputs normales
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Manejo de la imagen
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/products", {
                name: form.name,
                description: form.description,
                price: form.price,
                stock: form.stock,
            });

            alert("Producto agregado correctamente!");
            navigate("/productos");

        } catch (err) {
            console.log(err);
            setError("Error al añadir el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <h2 className="mb-4 text-center fw-bold">Crear Producto</h2>

            {error && (
                <p className="text-danger text-center mb-3 fw-semibold">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4">

                {/*Label nombre */}
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

                {/*Label Descripción*/}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={form.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/*Label Precio */}
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

                {/*Label Stock */}
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



                <button
                    className="btn btn-dark w-100 py-2 mt-3 fw-semibold"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear Producto"}
                </button>
            </form>
        </div>
    );
}
