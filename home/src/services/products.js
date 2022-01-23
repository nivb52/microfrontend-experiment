const API_SERVER = "http://localhost:4000"; // @tood: move this to config file

export const getProducts = () =>
  fetch(`${API_SERVER}/products`)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const getProductById = (id) =>
  fetch(`${API_SERVER}/products/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
