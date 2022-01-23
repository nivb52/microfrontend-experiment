import React, { useState, useEffect } from "react";
import Login from "./Login";
import MiniCart from "./MiniCart";
import { jwt } from "./services/login.service";

export default function CartContent() {
  const [token, setToken] = useState("");

  useEffect(() => {
    return jwt.subscribe((val) => setToken(val ?? ""));
  }, []);

  return (
    <div>
      <div>JWT: {token}</div>
      <Login />
      <MiniCart />
    </div>
  );
}
