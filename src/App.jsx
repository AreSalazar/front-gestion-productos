import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./assets/pages/Products.jsx";
import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";
import ProductDetail from "./assets/pages/ProductDetail";
import CreateProduct from "./assets/pages/CreateProduct";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/crear" element={<CreateProduct/>}/>
        <Route path="/products/:id" element={<ProductDetail />}/>

      </Routes>

      <Footer />
    </Router>
  );
}
