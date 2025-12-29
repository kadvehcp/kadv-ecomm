import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const products = useContext(ShopContext);
  return (
    <section className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-400">
      Collection
    </section>
  );
};

export default Collection;
