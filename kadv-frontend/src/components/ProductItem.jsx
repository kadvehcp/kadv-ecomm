import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import placeHolderImage from "../assets/contact_img.png";

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

export default ProductItem;
