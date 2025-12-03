import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

import Products from "./assets/pages/Products.jsx";
import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";
import ProductDetail from "./assets/pages/ProductDetail";
import CreateProduct from "./assets/pages/CreateProduct";
import EditProduct from "./assets/pages/EditProduct";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";

function Layout() {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register'];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {showLayout && <Navbar />}
      <Routes>
        {/* Rutas publicas */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Rutas protegidas */}
        <Route path="/" element={<Navigate to="/productos" replace />} />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/crear"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/editar/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}
