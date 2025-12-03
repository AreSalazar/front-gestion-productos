import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [topProduct, setTopProduct] = useState([null]);// Nuevo estado para producto mejor valorado

    useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");

        let rawProducts = [];
        if (Array.isArray(response.data)) rawProducts = response.data;
        else if (Array.isArray(response.data.data)) rawProducts = response.data.data;
        else if (Array.isArray(response.data.products)) rawProducts = response.data.products;

        // Agregar average_rating a cada producto
        const productsWithRating = await Promise.all(
          rawProducts.map(async (product) => {
            try {
              const avg = await api.get(`/products/${product.id}/reviews/average`);
              return { ...product, average_rating: avg.data.average_rating || 0 };
            } catch {
              return { ...product, average_rating: 0 };
            }
          })
        );

        setProducts(productsWithRating);

        // Encontrar producto mejor valorado
        if (productsWithRating.length > 0) {
          const best = productsWithRating.reduce((prev, curr) =>
            (curr.average_rating ?? 0) > (prev.average_rating ?? 0) ? curr : prev
          );
          setTopProduct(best);
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

  if (loading) return <p className="text-center fs-4 mt-5">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

 return (
    <div className="bg-light min-vh-100">

      {/* Banner */}
      <div className="bg-dark text-white py-5 text-center">
        <h1 className="fw-bold display-5">🛍️ Nuestros Productos</h1>
        <p className="text-secondary mt-2">
          Encuentra los mejores productos tecnológicos al mejor precio
        </p>
      </div>

      {/* Buscador */}
      <div className="container mt-4">
        <div className="row justify-content-center mb-5">
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

        {/* Producto mejor valorado */}
        {topProduct && (
          <div className="mb-5 text-center">
            <h2 className="fw-bold mb-4">⭐ Producto mejor valorado</h2>
            <div className="d-flex justify-content-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <ProductCard product={topProduct} />
              </div>
            </div>
          </div>
        )}
        

        {/* Grilla de productos */}
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