if (!localStorage.getItem("products")) {
  fetch("./db.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("products", JSON.stringify(data));
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", []);
      }
    });
}
var products = [];
var cart = [];

function addToCart(id) {
  products = JSON.parse(localStorage.getItem("products"));
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let product = products.find((product) => product.id == id);
  for (let product of products) {
    if (product.id == id) {
      product.quantity++;
    }
  }
  if (cart.length == 0) {
    cart.push(product);
  } else {
    let response = cart.find((ele) => ele.id == id);
    if (response === undefined) cart.push(product);
    else {
      for (let product of cart) {
        if (product.id == id) {
          product.quantity++;
        }
      }
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
  loadProducts();
}

function removeItem(id) {
  products = JSON.parse(localStorage.getItem("products"));
  cart = JSON.parse(localStorage.getItem("cart"));
  for (let product of products) {
    if (product.id == id) {
      if (product.quantity > 0) product.quantity--;
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  for (let product of cart) {
    if (product.id == id) {
      product.quantity--;
      if (product.quantity == 0) {
        deleteItem(id);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
  loadProducts();
}

function deleteItem(id) {
  cart = JSON.parse(localStorage.getItem("cart"));
  let temp = cart.filter((item) => item.id != id);
  localStorage.setItem("cart", JSON.stringify(temp));
  loadProducts();
}

function loadProducts() {
  const productContainer = document.getElementById("product-container");
  products = products = JSON.parse(localStorage.getItem("products"));
  if (localStorage.getItem("cart"))
    cart = JSON.parse(localStorage.getItem("cart"));
  const productsData = products
    .map((product) => {
      if (product.quantity > 0)
        return `
    <div class="product">
      <div class="img-container">
        <img src=${product.images[0]} alt="product-img" />
      </div>
      <h2 class="title">${product.title}</h2>
      <h3 class="price">$${product.price}</h3>
      <div class="update-quantity">
        <button class="decrease" id="${product.id}" onclick="decrease(this)">-</button>
        <div class="quantity">${product.quantity}</div>
        <button class="increase" id="${product.id}" onclick="increase(this)">+</button>
      </div>
    </div>
    `;
      else
        return `
    <div class="product">
      <div class="img-container">
        <img src=${product.images[0]} alt="product-img" />
      </div>
      <h2 class="title">${product.title}</h2>
      <h3 class="price">$${product.price}</h3>
      <button class="add-to-cart" id="${product.id}" onclick="addCart(this)">Add to Cart</button>
    </div>`;
    })
    .join("");

  productContainer.innerHTML = productsData;
  let count = 0;
  for (let product of cart) {
    count += product.quantity;
  }
  console.log(count);
  const cartBtn = document.getElementById("cart-quantity");
  cartBtn.innerText = count;
}

function addCart(e) {
  addToCart(parseInt(e.id));
}
function increase(e) {
  addToCart(parseInt(e.id));
}
function decrease(e) {
  removeItem(parseInt(e.id));
}

if (!localStorage.getItem("products")) {
  setTimeout(() => {
    loadProducts();
  }, 1000);
} else {
  loadProducts();
}
