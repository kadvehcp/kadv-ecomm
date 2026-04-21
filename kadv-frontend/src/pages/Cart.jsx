import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/DisplayProducts";

const Cart = () => {
  const { products, formatPrice, cartItems, updateItemQuantity } =
    useContext(ShopContext);
  const cartData = [];

  for (const itemId in cartItems) {
    for (const itemSize in cartItems[itemId]) {
      if (cartItems[itemId][itemSize] > 0) {
        cartData.push({
          _id: itemId,
          size: itemSize,
          quantity: cartItems[itemId][itemSize],
        });
      }
    }
  }

  const hasItems = cartData.length > 0;

  return (
    <section className="border-t border-gray-400 pt-10 text-gray-500">
      <div className="text-2xl mb-4">
        <Title firstText="YOUR" secondText="CART" />
      </div>
      <div>
        {hasItems ? (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id,
            );
            return (
              productData && (
                <div
                  key={item._id + item.size}
                  className="py-5 border-t border-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-5"
                >
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
                        <h4>{item.size}</h4>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const value = Math.max(1, Number(e.target.value) || 1);
                      updateItemQuantity(item._id, item.size, value);
                    }}
                    className="border border-gray-400 max-w-16 sm:max-w-28 px-5 py-2"
                  />
                  <Trash2
                    onClick={() => updateItemQuantity(item._id, item.size, 0)}
                    className="w-4 m-2 sm:m-5 sm:w-7 cursor-pointer"
                  />
                </div>
              )
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
