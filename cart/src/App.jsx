import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const Header = React.lazy(() => import("home/Header"));
const Footer = React.lazy(() => import("home/Footer"));

import "remixicon/fonts/remixicon.css";
import "./index.scss";
import CartContent from "./CartContent";

const App = () => (
  <div className="mx-auto max-w-6xl">
    <Suspense fallback="<header class='mt-4'></header>">
      <Header />
    </Suspense>

    <CartContent className="mt-4 mb-4" />

    <Suspense fallback="<footer class='mt-4'></footer>">
      <Footer />
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
