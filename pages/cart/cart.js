import { addToCart, removeItem } from "../../helper/helper.js";
import { data } from "../../db/db.js";

var products = [];
var cart = [];
const productContainer = document.getElementById("product-container");

function increaseCart(e) {
  console.log(e.target.dataset.id);
  products = JSON.parse(localStorage.getItem("products"));
  if (localStorage.getItem("cart"))
    cart = JSON.parse(localStorage.getItem("cart"));
  const data = addToCart(parseInt(e.target.dataset.id), products, cart);
  localStorage.setItem("products", JSON.stringify(data.products));
  localStorage.setItem("cart", JSON.stringify(data.cart));
  loadProducts();
}
function decreaseCart(e) {
  console.log(e.target.dataset.id);
  products = JSON.parse(localStorage.getItem("products"));
  if (localStorage.getItem("cart"))
    cart = JSON.parse(localStorage.getItem("cart"));
  const data = removeItem(parseInt(e.target.dataset.id), products, cart);
  localStorage.setItem("products", JSON.stringify(data.products));
  localStorage.setItem("cart", JSON.stringify(data.cart));
  loadProducts();
}

function loadProducts() {
  productContainer.innerHTML = "";
  products = products = JSON.parse(localStorage.getItem("products"));
  cart = JSON.parse(localStorage.getItem("cart"));
  cart
    .map((product) => {
      const productDiv = document.createElement("div");
      productDiv.setAttribute("class", "product");
      const img_container = document.createElement("div");
      img_container.setAttribute("class", "img-container");
      const image = document.createElement("img");
      image.setAttribute("src", `${product.images[0]}`);
      img_container.appendChild(image);
      const h2 = document.createElement("h2");
      h2.innerHTML = `${product.title}`;
      h2.setAttribute("class", "title");
      const updateQuantity = document.createElement("div");
      updateQuantity.setAttribute("class", "update-quantity");
      const decrease = document.createElement("button");
      decrease.setAttribute("class", "decrease");
      decrease.dataset.id = `${product.id}`;
      decrease.innerText = "-";
      decrease.addEventListener("click", decreaseCart);
      const quantity = document.createElement("div");
      quantity.setAttribute("class", "quantity");
      quantity.innerText = `${product.quantity}`;
      const increase = document.createElement("button");
      increase.setAttribute("class", "increase");
      increase.dataset.id = `${product.id}`;
      increase.innerText = "+";
      increase.addEventListener("click", increaseCart);
      updateQuantity.append(decrease, quantity, increase);
      const price = document.createElement("h3");
      price.setAttribute("class", "price");
      price.innerHTML = `$${product.price * product.quantity}`;
      productDiv.append(img_container, h2, updateQuantity, price);
      productContainer.appendChild(productDiv);
    })
    .join("");

  let count = 0;
  let total = 0;
  for (let product of cart) {
    count += product.quantity;
    total += parseInt(product.quantity) * parseInt(product.price);
  }
  const cartBtn = document.getElementById("cart-quantity");
  cartBtn.innerText = count;
  const quantity = document.getElementById("quantity");
  quantity.innerText = count;
  const totalPrice = document.getElementById("total-price-text");
  totalPrice.innerText = "$" + total;
}

loadProducts();

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(data));
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", []);
  }
}
