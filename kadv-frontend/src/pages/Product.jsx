import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Star } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, formatPrice } = useContext(ShopContext);
  const [productImage, setProductImage] = useState(null);
  const [size, setSize] = useState("");

  const productData = products?.find((item) => item._id === productId);
  const displayImage = productData?.image?.includes(productImage)
    ? productImage
    : productData?.image?.[0];
  if (!products?.length)
    return <div className="text-center py-10">Loading...</div>;
  if (!productData)
    return <div className="text-center py-10">Product not Found</div>;
  return (
    <section className="border-t border-gray-400 py-10 transition-opacity ease-in duration-500 opacity-100 text-gray-500">
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-10">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={`${item}-${index}`}
                onClick={() => setProductImage(item)}
                alt={productData.name}
                className={`w-[24%] sm:w-full sm:mb-4 shrink-0 cursor-pointer ${displayImage === item ? "border-4 border-gray-400" : "border-none"}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={displayImage}
              alt={productData.name}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-gray-700">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(4)].map((_, index) => (
              <Star key={index} size={16} fill="#364153" stroke="#364153" />
            ))}
            <Star size={16} />
            <span className="pl-2">(122)</span>
          </div>
          <h2 className="mt-5 text-2xl font-medium text-gray-700">
            {formatPrice(productData.price)}
          </h2>
          <p className="mt-5 md:w-4/5 text-justify">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <span className="font-medium text-gray-700">Select size:</span>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${item === size ? "border-gray-400" : "border-none"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!size}
            className={`px-7 py-4 text-sm border border-gray-400 rounded-xl font-medium ${size ? "text-gray-700 active:bg-gray-400" : "cursor-not-allowed"}`}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col mt-5 gap-1 text-sm">
            <p>100% Original Product</p>
            <p>Cash On Delivery Available</p>
            <p>Easy return and exchange policy within 7 working days</p>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="flex gap-8">
          <h1 className="py-2 text-base font-medium cursor-pointer text-gray-700">
            Description
          </h1>
          <h1 className="py-2 text-base font-medium cursor-pointer text-gray-700">
            Reviews (122)
          </h1>
        </div>
        <div className="flex flex-col gap-4 py-5 text-sm text-justify">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
            molestiae neque delectus earum quaerat corrupti incidunt,
            voluptatibus quos ipsam ratione iusto voluptatum nulla rem provident
            ipsa fugit dolor magni officiis? Veritatis excepturi aspernatur
            saepe omnis natus inventore nemo officiis laborum. Impedit maiores
            architecto ex labore sit deleniti ipsum quam facilis tempora ullam,
            expedita unde velit saepe, id, cum cumque quasi! Sit tenetur esse
            reprehenderit vero eveniet illum amet ullam eos minima assumenda
            magni praesentium saepe quidem porro quaerat inventore neque
            blanditiis laudantium veniam placeat, alias architecto ab. Eligendi,
            explicabo recusandae! Vel, eligendi dolorem? Alias quia blanditiis
            fugit, ut iste minus repellat aut autem iure veritatis laudantium
            doloribus rerum aperiam, quasi, saepe distinctio sunt nisi eveniet
            velit qui accusantium. Explicabo, necessitatibus. Qui quia, tempore
            libero deserunt perferendis excepturi ipsam voluptatibus sed natus,
            commodi, harum impedit vel? Fugiat similique esse quo consectetur
            rem enim, dolores error voluptas officia quam placeat commodi
            eligendi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem eius temporibus, vero velit neque at facere iure
            atque quo doloremque autem magnam! Fugiat alias odio unde architecto
            neque doloribus enim? Vero repellat aspernatur iusto officia, id
            optio earum reprehenderit possimus numquam nostrum et non porro
            natus magni ipsam minus. Nulla, beatae? Velit, repellendus dolores
            iusto consectetur tempore porro distinctio nemo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
