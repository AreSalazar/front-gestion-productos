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
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentImage, setCurrentImage] = useState(null);

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
                    image: null,
                });

                setCurrentImage(p.image);//guardar ruta de la img existente

            } catch (err) {
                setError("No se pudo cargar el producto");
            }
        };

        fetchProduct();
    }, [id]);

    //Handle para los imputs normales
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //Y handle para la imagen
    const handleFileChange = (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
        });
    };


    //EDITAR (PUT)--------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //Validaciones-------
        if (!form.name.trim()) {
            return alert("El nombre es obligatorio");
        }
        if (!form.description.trim()) {
            return alert("La descripción es obligatoria");
        }
        // Precio no negativo
        if (form.price === "" || isNaN(form.price)) {
            return alert("El precio no es válido");
        }
        if (parseFloat(form.price) < 0) {
            return alert("El precio no puede ser negativo");
        }
        // Stock entero y no negativo
        if (form.stock === "" || isNaN(form.stock)) {
            return alert("El stock no es válido");
        }
        if (!Number.isInteger(Number(form.stock))) {
            return alert("El stock debe ser un número entero");
        }
        if (parseInt(form.stock) < 0) {
            return alert("El stock no puede ser negativo");
        }
        //-------------------------

        try {
            const formData = new FormData();//FormData() permite mezclar campos de texto y archivos
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("stock", form.stock);

            if (form.image) {
                formData.append("image", form.image);
            }

            await api.post(`/products/${id}?_method=PUT`, formData);

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
                    <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea name="description" rows="3" className="form-control" value={form.description} onChange={handleChange} required></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Precio</label>
                    <input type="text" name="price" className="form-control" value={form.price}
                        onChange={(e) => {
                            const value = e.target.value;
                            //Permite solo 2 decimales
                            if (/^\d*\.?\d{0,2}$/.test(value)) {
                                setForm({ ...form, price: value });
                            }
                        }}
                        placeholder="0.00"
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Stock</label>
                    <input type="number" name="stock" className="form-control" value={form.stock}
                        onChange={(e) => {
                            const value = e.target.value;
                            //Permite solo números enteros
                            if (/^\d*$/.test(value)) {
                                setForm({ ...form, stock: value });
                            }
                        }} />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Imagen</label>
                    <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                </div>

                {currentImage && (
                    <div className="mb-3">
                        <p className="fw-semibold">Imagen:</p>
                        <img
                            src={`http://127.0.0.1:8000/storage/${currentImage}`} alt="Producto"
                            style={{ width: "200px", borderRadius: "10px", border: "1px solid #ccc" }} />
                    </div>
                )}

                <div className="d-flex gap-3 mt-3">

                    <button
                        className="btn btn-warning w-50 py-2 fw-semibold" type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar"}
                    </button>

                    <button
                        type="button" className="btn btn-secondary w-50 py-2 fw-semibold" onClick={() => navigate("/productos")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
