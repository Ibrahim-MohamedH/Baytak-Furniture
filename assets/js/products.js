let productRow = document.querySelector("#product");
let categories = document.querySelectorAll("#categories input");

// LocalStorage Items
let loggedIn = JSON.parse(localStorage.getItem("logged-in"));
let products = JSON.parse(localStorage.getItem("AllProducts")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function printProducts() {
  productRow.innerHTML = "";
  products.forEach((element, index) => {
    productRow.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div class="card">
        <img
          src="${element.imgURL}"
          class="card-img-top"
          alt="product_picture"
        />
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.description}</p>
          <p class="card-text text-end">E£ ${element.price}</p>
          <div class="text-center">
            <button onclick="addToCart(${index})" class="btn addtoCart btn-primary">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  addToCartBtn = document.querySelectorAll(".addtoCart");
}

// print products based on category
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("change", () => {
    if (categories[i].id == "all") {
      products = JSON.parse(localStorage.getItem("AllProducts"));
      printProducts();
    } else {
      products = [];
      allProducts = JSON.parse(localStorage.getItem("AllProducts"));
      allProducts.forEach((element) => {
        if (element.category == categories[i].id) {
          products.push(element);
        }
      });
      printProducts();
    }
  });
}

function addToCart(index) {
  if (cart.some((element) => element.id == index)) {
    return null;
  } else {
    cart.push({
      id: index,
      amount: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
// call functions when page load
printProducts();

if (!loggedIn) {
  addToCartBtn.forEach((btn) => {
    btn.setAttribute("disabled", "disabled");
    btn.removeAttribute("onclick");
    btn.classList.replace("btn-primary", "btn-secondary");
    btn.innerText = "log in to buy";
  });
}
