import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { getProductById, currency } from "home/products.service";
import placeAddToCart from "addtocart/placeAddToCart";

export default function PDPContent() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    } else setProduct(null);
  }, [id]);

  const addToCartEl = useRef(null);
  useEffect(() => {
   if (addToCartEl.current) {
     placeAddToCart(product.id, addToCartEl.current);
   }
 }, [product])



  if (!product) return null;
  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <img src={product.image} alt={product.name} />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="text-3xl flex-start">
              {currency.format(product.price)}
            </div>
          </div>
          <div ref={addToCartEl}></div>
        </div>

        <div className="text-3xl flex-start">
          <div className="mt-10 text-xl">{product.description}</div>
          <div className="mt-10 text-sm">{product.longDescription}</div>
        </div>
      </div>
    </div>
  );
}
