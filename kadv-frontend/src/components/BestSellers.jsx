import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const bestSellerProducts = products
    .filter((item) => item.bestseller)
    .slice(0, 10);

  return (
    <section className="my-5">
      <div className="text-center py-5 text-2xl sm:text-4xl">
        <Title firstText="BEST" secondText="SELLERS" />
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque unde
          quae ipsa ratione possimus.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {bestSellerProducts.map(({ _id, image, name, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};
export default BestSellers;
