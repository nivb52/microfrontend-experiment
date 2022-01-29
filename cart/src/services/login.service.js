// import { jwtObservable } from "@store/observers";
import { jwtSubject } from "./internal_store/singletons";

import { API_SERVER } from "../config";
import { getCart } from "./cart.service";
export const jwt = jwtSubject;

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
      console.log({jwt})
      getCart(); // load the data to be ready when the user looks on the cart
      return data.access_token;
    });
