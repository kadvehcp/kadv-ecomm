import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ShoppingCart } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col px-5 sm:px-8 md:px-12 lg:px-16">
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <FloatingCartButton />
      </main>
      <Footer />
    </div>
  );
};

export default App;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProductPage = () => {
  const { productId } = useParams();
  return <Product key={productId} />;
};

const FloatingCartButton = () => {
  const { cartCount } = useContext(ShopContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (pathname === "/cart") return null;
  return (
    cartCount > 0 && (
      <button
        onClick={() => navigate("/cart")}
        className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        rounded-full
        bg-black text-white
        px-5 py-4
        shadow-lg
        hover:scale-105
        transition
        cursor-pointer
      "
      >
        <ShoppingCart />
      </button>
    )
  );
};
