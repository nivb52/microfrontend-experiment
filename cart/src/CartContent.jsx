import React, { useState, useEffect } from "react";
import { jwt } from "./services/login.service";
import { cart } from "./services/cart.service";
import { currency } from "home/products.service";


export default function CartContent() {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const unsubscribe = cart.subscribe((val) => {
      setCartItems(val);
    });

    return () => {
      unsubscribe();
      setCartItems([]);
    };
  }, []);

  return (
    <>
      {jwt.value ? 
      <div className="grid grid-cols-4 gap-5">
        {Array.isArray(cartItems) &&
          cartItems.map((item) => (
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
          Array.isArray(cartItems) &&
            cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
        )}
        </div>
        : <div> Please login to see your cart</div>
        }
    </>
  );
}