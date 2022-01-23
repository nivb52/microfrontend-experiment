import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";

import SafeComponent from "./SafeComponent";
import Header from "home/Header";
import PDPContent from "./PDPContent";
const Footer  = React.lazy(() => import("home/Footer"));

const App = () => (
  <Router>
    <div className="mx-auto max-w-6xl">
      <SafeComponent>
        <Header />
      </SafeComponent>

      <Routes>
        <Route path="/product/:id" element={<PDPContent />} />
      </Routes>

      <Suspense fallback="<div></div>">
        <Footer />
      </Suspense>
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById("app"));
