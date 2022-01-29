import React, { useState, useEffect, useCallback } from "react";
import { getCart, clearCart, cart } from "./services/cart.service";
import { currency } from "home/products.service";

export default function MiniCart({ style = {} }) {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const unsubscribe = cart.subscribe((c) => setCartItems(cart.value));

    return () => {
      unsubscribe();
      setCartItems([]);
    };
  }, []);

  const clearCartUi = useCallback(() => {
    clearCart()
      .catch((err) => console.log(err))
      .then(setShowCart(false));
  }, []);

  if (!cartItems) return null;
  return (
    <>
      <span onClick={() => setShowCart(!showCart)} id="showcart_span">
        <i className="ri-shopping-cart-2-fill text-2xl" id="showcart"></i>
        {cartItems.length}
      </span>

      {showCart && (
        <>
          <div
            className="absolute p-5 border-4 border-blue-800 bg-white rounded-xl text-black"
            style={{
              width: 300,
              right: "8px",
              ...style,
            }}
          >
            <div
              className="grid gap-3 text-sm"
              style={{
                gridTemplateColumns: "1fr 3fr 10fr 2fr",
              }}
            >
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div>{item.quantity}</div>
                  <img src={item.image} alt={item.name} className="max-h-6" />
                  <div>{item.name}</div>
                  <div className="text-right">
                    {currency.format(item.quantity * item.price)}
                  </div>
                </React.Fragment>
              ))}
              <div></div>
              <div></div>
              <div></div>
              {currency.format(
                cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
              )}
            </div>
            <div className="flex justify-around">
              <button
                className="bg-white border border-green-800 text-green-800 p-2 rounded-lg"
                onClick={clearCartUi}
                style={{ fontSize: "clamp(0.5rem, 0.1rem + 2vmin, 2rem)" }}
              >
                Clear Cart
              </button>
              <button
                className="text-white border border-green-800 bg-green-800 p-2 rounded-lg"
                onClick={clearCartUi}
                style={{ fontSize: "clamp(0.5rem, 0.1rem + 2vmin, 2rem)" }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
