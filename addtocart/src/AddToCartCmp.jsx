import { createEffect, createSignal, Show } from "solid-js";
import { jwt } from "cart/login.service";
import { addToCart } from "cart/cart.service";
import "./index.scss";

console.log(jwt);

export default ({ id }) => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  createEffect(() => { 
    return jwt.subscribe((currentJwt) => {
      setLoggedIn(!!currentJwt);
    });
  });

  return (
    <Show when={loggedIn()}>
      <button 
        onClick={() => addToCart(id)}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add To Cart
      </button>
    </Show>
  )
};
