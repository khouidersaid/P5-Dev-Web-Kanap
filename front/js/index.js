export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
