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
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //handle para inputs normales
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handle para las imágenes
    //imagen para guardar file y generar preview
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        //Validaciones para imagen
        const maxSizeMB = 4;
        if (file.size/1024/1024> maxSizeMB) {
            setError(`La imagen debe ser menor a ${maxSizeMB} MB`);
            return;
        }
        if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
            setError("Formato de imagen no permitido (png, jpg, jpeg, webp)");
            return;
        }

        setError("");
        setImage(file);
        setPreview(URL.createObjectURL(file)); //preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();//FormData() permite mezclar campos de texto y archivos
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            if (image) {
                formData.append("image", image); //NOMBRE del campo = 'image'
            }

            //No se establece "Content-Type" global ya que aquí se deja que axios lo maneje
            const response = await api.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            //response{ status: 'success', data: product }
            alert("Producto agregado correctamente!");
            navigate("/productos");
        } catch (err) {
            console.error(err);
            // Si el backend devuelve errores de validación, se encuentran en err.response.data
            if (err.response?.data) {
                setError(err.response.data.message || "Error al añadir el producto");
            } else {
                setError("Error al añadir el producto");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <h2 className="mb-4 text-center fw-bold">Añadir Producto</h2>

            {error && <p className="text-danger text-center mb-3 fw-semibold">{error}</p>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4">
                {/*Nombre*/}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre</label>
                    <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>

                {/*Descripción*/}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange} required></textarea>
                </div>

                {/*Precio*/}
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

                {/*Stock*/}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Stock</label>
                    <input type="number" name="stock" className="form-control" value={form.stock}
                        onChange={(e) => {
                            const value = e.target.value;
                            //Permite solo números enteros
                            if (/^\d*$/.test(value)) {
                                setForm({ ...form, stock: value });
                            }
                        }}
                        required />
                </div>

                {/*Imagen*/}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Imagen</label>
                    <input type="file" accept="image/*" className="form-control" onChange={handleImage} />
                    {preview && (
                        <div className="mt-3">
                            <p className="small text-muted">Preview:</p>
                            <div style={{ width: 300, height: 200, overflow: "hidden", borderRadius: 8 }}>
                                <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="d-flex gap-3 mt-3">
                    <button className="btn btn-dark w-50 py-2 fw-semibold" type="submit" disabled={loading}>
                        {loading ? "Creando..." : "Añadir"}
                    </button>

                    <button type="button" className="btn btn-secondary w-50 py-2 fw-semibold" onClick={() => navigate("/productos")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
