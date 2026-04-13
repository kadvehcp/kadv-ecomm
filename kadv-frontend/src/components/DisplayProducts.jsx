import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { placeHolderImage } from "../assets/assets";

const DisplayProducts = ({
  titleFirst,
  titleSecond,
  description,
  products,
}) => {
  const isEmpty = !products?.length;

  return (
    <section className="my-10">
      <div className="text-center py-5 text-2xl sm:text-4xl">
        <Title firstText={titleFirst} secondText={titleSecond} />
        {description && (
          <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-500">
            {description}
          </p>
        )}
      </div>
      {isEmpty ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-2">
            Try adjusting filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-5">
          {products.map(({ _id, image, name, price }) => (
            <ProductItem
              key={_id}
              id={_id}
              image={image}
              name={name}
              price={price}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const Title = ({ firstText = "FIRST-TEXT", secondText = "SECOND-TEXT" }) => {
  return (
    <div className="inline-flex items-baseline gap-2 my-2 text-gray-500">
      <h2 className="flex gap-2 leading-none">
        {firstText}
        <span className="text-gray-700 font-medium">{secondText}</span>
      </h2>
      <span className="w-8 h-px sm:w-12 sm:h-0.5 self-center bg-gray-400" />
    </div>
  );
};

const ProductItem = ({ id, image, name, price }) => {
  const { formatPrice } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700">
      <div className="flex flex-col overflow-hidden">
        <img
          src={image?.[0] ?? placeHolderImage}
          alt={name}
          loading="lazy"
          className="hover:scale-105 transition-transform ease-in-out"
        />
        <span title={name} className="pt-4 text-sm truncate">
          {name}
        </span>
        <span className="font-medium text-sm">{formatPrice(price)}</span>
      </div>
    </Link>
  );
};

export { Title, ProductItem };

export default DisplayProducts;
