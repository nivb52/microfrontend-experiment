import { jwtObservable } from "../store/singelton.observers";
import { API_SERVER } from "../config";
import { getCart } from "./cart.service";
export const jwt = jwtObservable;
jwt.subscribe((token) => console.log(token));

export const login = (username, password) =>
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      jwt.next(data.access_token);
      getCart();
      return data.access_token;
    });
