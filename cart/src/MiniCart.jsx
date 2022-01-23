import React, { useState, useEffect } from "react";
import { getCart, clearCart, cart } from "./services/cart.service";
import { currency } from "home/productsService";

export default function MiniCart() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

    useEffect(() => {
    const unsubscribe =  cart.subscribe((c) => setCartItems(cart.value));
        
    return () => {
      unsubscribe()
        setCartItems([]);
    };
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
              top: "2rem",
            //   left: -250,
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
             
            </div>
          </div>
        </>
      )}
    </>
  );
}
