import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/DisplayProducts";

const Cart = () => {
  const { formatPrice, cartEntries, updateItemQuantity, productMap } =
    useContext(ShopContext);
  const cartData = cartEntries;

  const hasItems = cartData.length > 0;

  return (
    <section className="border-t border-gray-400 pt-10 text-gray-500">
      <div className="text-2xl mb-4">
        <Title firstText="YOUR" secondText="CART" />
      </div>
      <div>
        {hasItems ? (
          cartData.map((item) => {
            const productData = productMap[item.itemId];
            if (!productData) return null;
            return (
              <CartItem
                key={`${item.itemId}-${item.itemSize}`}
                item={item}
                productData={productData}
                updateItemQuantity={updateItemQuantity}
                formatPrice={formatPrice}
              />
            );
          })
        ) : (
          <div>
            <h3>Your cart is empty!</h3>
            <p>Try adding products to your cart for checkout.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;

const CartItem = ({ item, productData, updateItemQuantity, formatPrice }) => {
  return (
    <div className="py-5 border-t border-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-5">
      <div className="flex items-start gap-5">
        <img
          src={productData.image[0]}
          alt={`${productData.name} image`}
          className="w-20 sm:w-28"
        />
        <div>
          <h3 className="text-sm sm:text-lg font-medium text-gray-700">
            {productData.name}
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <h4>{formatPrice(productData.price)}</h4>
            <h4>{item.itemSize}</h4>
          </div>
        </div>
      </div>
      <input
        name="updateItemQuantity"
        type="number"
        min={1}
        defaultValue={item.quantity}
        onBlur={(e) => {
          const userInput = Number(e.target.value);
          const value =
            Number.isNaN(userInput) || userInput < 1
              ? item.quantity
              : userInput;
          updateItemQuantity(item.itemId, item.itemSize, value);
        }}
        className="border border-gray-400 max-w-16 sm:max-w-28 px-5 py-2"
      />
      <button
        onClick={() => updateItemQuantity(item.itemId, item.itemSize, 0)}
        className="flex items-center justify-center p-4"
      >
        <Trash2 className="cursor-pointer" />
      </button>
    </div>
  );
};

const CartTotal = () => {};
