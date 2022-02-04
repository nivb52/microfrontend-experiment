import React, { useState, useEffect } from "react";
import { getProducts, currency } from "./services/products.service";
import { useLoggedIn } from "cart/hooks.useLogin";
import { addToCart } from "cart/cart.service"
export default function HomeContent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const loggedIn = useLoggedIn();
  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="flex">
            <div className="flex-grow text-sm font-medium">
              <a>{product.name}</a>
              <div className="flex-end text-xs">
                {currency.format(product.price)}
              </div>
              <p className="mt-2">{product.description}</p>
              {loggedIn && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product.id)}
                  id={`addtocart_${product.id}`}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
