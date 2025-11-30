import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./assets/pages/Products.jsx";
import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";
import ProductDetail from "./assets/pages/ProductDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/productos" element={<Products />} />
      </Routes>

      <Footer />
    </Router>
  );
}
