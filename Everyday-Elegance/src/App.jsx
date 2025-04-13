import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import ThankYou from "./components/ThankYou";
import Products from "./components/Products";
import SearchResults from "./components/Navbar";
import ContactPage from "./components/contact-page";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/contact-page" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
