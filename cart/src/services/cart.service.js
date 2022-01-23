import { cartObservable } from "../store/singelton.observers";
import { API_SERVER } from "../config";
import { jwt } from "./login.service";

export const cart = cartObservable;

cart.subscribe((c) => console.log(c));

export const getCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(cart);
      cart.next(data.cartItems);
      return data;
    });

export const addToCart = (productId) =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authirization: `Bearer ${jwt.value}`,
    },
    body: JSON.stringify({ id: productId }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const clearCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authirization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });
