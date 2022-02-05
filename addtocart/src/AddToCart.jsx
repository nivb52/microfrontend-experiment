import { render } from "solid-js/web";
import { jwt } from "cart/login.service";

import "./index.scss";

console.log(jwt);

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>jwt: {jwt.value}</div>
  </div>
);
render(App, document.getElementById("app"));
