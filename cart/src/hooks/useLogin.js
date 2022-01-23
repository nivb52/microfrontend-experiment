import { useState, useEffect } from "react";

import { jwt } from "../services/login.service";
export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(!!jwt.value);

  useEffect(() => {
    setLoggedIn(!! jwt.value);

    return jwt.subscribe((_) => setLoggedIn(!!jwt.value));
  }, []);

  return loggedIn;
}
