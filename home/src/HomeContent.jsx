import React, { useState, useEffect } from "react";
import { getProducts, currency } from "./services/products";
export default function HomeContent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
