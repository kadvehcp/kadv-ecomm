import { useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
import { ShopContext } from "./ShopContext";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const itemSize in cartItems[itemId]) {
        totalCount += cartItems[itemId][itemSize];
      }
    }
    return totalCount;
  };

  const updateItemQuantity = (itemId, itemSize, quantity) => {
    setCartItems((prev) => {
      const nextCart = { ...prev };
      if (!nextCart[itemId]) return prev;
      const currentQuantity = nextCart[itemId][itemSize] || 0;
      if (currentQuantity === quantity) return prev;

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

  const formatPrice = (amount) => formatter.format(amount);

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
        getCartCount,
        updateItemQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
