// import { cartObservable } from "@store/observers";
import { cartSubject } from "./internal_store/singletons";
import { API_SERVER } from "../config";
import { jwt } from "./login.service";
import { Logger } from "./logger.service"; // the home page team not implemented yet Logger Class

export const cart = cartSubject//.asObservable();

const logger = new Logger();
cart.subscribe((c) => logger.info("first subscriber: ", c));

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
      logger.info("getCart: ", data);
      cartSubject.next(data.cartItems);
      return data;
    })
    .catch((err) => logger.error(err) /*@todo popup error message*/);

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
      if (!res || !res.cartItems) {
        throw new Error(res.message);
      } else {
        getCart();
      }
    });
