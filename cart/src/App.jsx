import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const Header = React.lazy(() => import("home/Header"));
const Footer = React.lazy(() => import("home/Footer"));
const CartContent = React.lazy(() => import("cart/CartContent"));

import "remixicon/fonts/remixicon.css";
import "./index.scss";

const App = () => (
  <div className="mx-auto max-w-6xl">
    <Suspense fallback={<header className="mt-4"></header>}>
      <Header />
    </Suspense>

    <Suspense fallback={<span>Loading ...</span>}>
      <CartContent className="mt-4 mb-4" />
    </Suspense>

    <Suspense fallback={<footer className="mt-4"></footer>}>
      <Footer />
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
