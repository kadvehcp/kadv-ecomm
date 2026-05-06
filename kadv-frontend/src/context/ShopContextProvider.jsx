import { useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
import { ShopContext } from "./ShopContext";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const productMap = Object.freeze(
  Object.fromEntries(products.map((p) => [p._id, p])),
);

const ShopContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, itemSize) => {
    if (!itemSize) {
      if (!toast.isActive("size-error"))
        toast.error("Product size not selected", { toastId: "size-error" });
      return;
    }
    setCartItems((prev) => {
      const nextCart = { ...prev };
      nextCart[itemId] = { ...(nextCart[itemId] || {}) };
      nextCart[itemId][itemSize] = (nextCart[itemId][itemSize] || 0) + 1;

      return nextCart;
    });
  };

  const updateItemQuantity = (itemId, itemSize, quantity) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const currentQuantity = prev[itemId]?.[itemSize] || 0;
      if (currentQuantity === quantity) return prev;

      const nextCart = { ...prev };
      nextCart[itemId] = { ...nextCart[itemId] };
      if (quantity <= 0) {
        delete nextCart[itemId][itemSize];
        if (Object.keys(nextCart[itemId]).length === 0) {
          delete nextCart[itemId];
        }
      } else {
        nextCart[itemId][itemSize] = quantity;
      }
      return nextCart;
    });
  };

  const cartEntries = (() => {
    const entries = [];
    for (const itemId in cartItems) {
      for (const itemSize in cartItems[itemId]) {
        const quantity = cartItems[itemId][itemSize];
        if (quantity > 0) entries.push({ itemId, itemSize, quantity });
      }
    }

    return entries;
  })();

  const cartCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const formatPrice = (amount) => formatter.format(amount);

  const cartAmount = cartEntries.reduce((total, item) => {
    const product = productMap[item.itemId];
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        formatPrice,
        deliveryFee: 10,
        searchValue,
        setSearchValue,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        cartCount,
        updateItemQuantity,
        cartAmount,
        productMap,
        cartEntries,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
