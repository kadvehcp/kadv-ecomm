import { useContext, useRef } from "react";
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
      <div className="flex justify-end my-20">
        <div className="w-full sm:max-w-md">
          <CartTotal />
        </div>
      </div>
    </section>
  );
};

export default Cart;

const CartItem = ({ item, productData, updateItemQuantity, formatPrice }) => {
  const inputRef = useRef();
  return (
    <div className="py-5 border-t border-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] items-center justify-center gap-5">
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
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          name="updateItemQuantity"
          type="number"
          min={1}
          defaultValue={item.quantity}
          className="text-center border border-gray-400 max-w-14 sm:max-w-20 px-2.5 py-2"
        />
        <button
          onClick={() => {
            const value = Number(inputRef.current.value.trim());
            if (Number.isNaN(value) || value < 1) {
              inputRef.current.value = item.quantity;
              return;
            }
            updateItemQuantity(item.itemId, item.itemSize, value);
          }}
          className="border border-gray-400 max-w-14 sm:max-w-20 px-2.5 py-2"
        >
          Set
        </button>
      </div>
      <button
        onClick={() => updateItemQuantity(item.itemId, item.itemSize, 0)}
        className="flex items-center justify-center p-4"
      >
        <Trash2 className="cursor-pointer" />
      </button>
    </div>
  );
};

const CartTotal = () => {
  const { formatPrice, deliveryFee, cartAmount } = useContext(ShopContext);
  return (
    <section className="w-full">
      <div className="text-2xl">
        <Title firstText="CART" secondText="TOTAL" />
      </div>
      <div className="flex flex-col mt-5 gap-4 text-sm">
        <div className="flex justify-between border-b border-gray-400 py-2">
          <h4>Sub Total</h4>
          <h5>{formatPrice(cartAmount)}</h5>
        </div>

        <div className="flex justify-between border-b border-gray-400 py-2">
          <h4>Shipping Fee</h4>
          <h5>+ {formatPrice(deliveryFee)}</h5>
        </div>

        <div className="flex justify-between border-b border-gray-400 py-2">
          <h4 className="text-base font-medium">TOTAL PRICE</h4>
          <h5 className="text-base font-medium">
            {cartAmount > 0
              ? formatPrice(cartAmount + deliveryFee)
              : formatPrice(0)}
          </h5>
        </div>
      </div>
    </section>
  );
};
