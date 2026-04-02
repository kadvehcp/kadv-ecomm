import { useState } from "react";
import { products } from "../assets/assets";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatPrice = (amount) => formatter.format(amount);
  return (
    <ShopContext.Provider
      value={{
        products,
        formatPrice,
        deliveryFee: 10,
        search,
        setSearch,
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
