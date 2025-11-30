import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }

      } catch (error) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // filtro de búsqueda
  const filteredProducts = products.filter(p =>
  (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
  (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
  (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
);


  if (loading) {
    return <p className="text-center fs-4 mt-5">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  return (
    <div className="bg-light min-vh-100">

      {/* Banner */}
      <div className="bg-dark text-white py-5 text-center">
        <h1 className="fw-bold display-5">🛍️ Nuestros Productos</h1>
        <p className="text-secondary mt-2">
          Encuentra los mejores productos tecnológicos al mejor precio
        </p>
      </div>

      <div className="container py-5">

        {/* Buscador */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="form-control form-control-lg shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Productos */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted fs-5">
            No hay productos para mostrar
          </p>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
