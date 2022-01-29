import React, { Suspense } from "react";
const Login = React.lazy(() => import("cart/Login"));
const MiniCart = React.lazy(() => import("cart/MiniCart"));

export default function Header() {
  return (
    <div className="p-5 bg-blue-500 text-white text-3xl font-bold">
      <div className="flex">
        <div className="flex-grow">Fidget Spinner World</div>
        <div className="flex-end relative">
          <Suspense fallback="">
            <MiniCart />
            <Login />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
