import { render } from "solid-js/web";
import AddToCartCmp from "./AddToCartCmp";
export default function PlaceAddToCart(id, el) {
    render(()=> <AddToCartCmp id={id} />, el);
}
