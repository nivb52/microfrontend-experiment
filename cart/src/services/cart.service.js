import { cartObservable } from "../store/singelton.observers";
import { API_SERVER } from "../config";
import { jwt } from "./login.service";

export const cart = cartObservable;

cart.subscribe((c) => console.log(c));

const makeHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt.value}`,
});

export const getCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "GET",
    headers: makeHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(cart);
      cart.next(data.cartItems);
      return data;
    })
    .catch((err) => console.error(err) /*@todo popup error message*/);

export const addToCart = (productId) =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify({ id: productId }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const clearCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: makeHeaders(),
  })
    .catch((err) => {
      if (err.code === 500) {
        console.error("clear cart failed: server error ", err);
      } else {
        throw err;
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) {
        throw new Error(res.message);
      } else {
        getCart();
      }
    });
