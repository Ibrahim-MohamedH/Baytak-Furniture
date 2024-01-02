let cartItems = document.querySelector("#cartItems");
let total = document.querySelector(".total");

// from LocalStorage
let products = JSON.parse(localStorage.getItem("AllProducts")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let loggedIn = JSON.parse(localStorage.getItem("logged-in"));

// check if user is logged-in
if (!loggedIn) {
  location.replace(location.origin + "/index.html");
}
// print cart items
function printCart() {
  cartItems.innerHTML = "";
  totalPrice = 0;
  cart.forEach((element, index) => {
    cartItems.innerHTML += `
    <div class="col-12 mb-3">
              <div class="row align-items-center">
                <div class="col-md-4 mb-md-0 mb-3">
                  <img
                    src="${products[element.id].imgURL}"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <div class="col-md-6 col-sm-10 col-8 text-sm-start text-center">
                  <h3>${products[element.id].name}</h3>
                  <p>${products[element.id].description}</p>
                </div>
                <div class="col-sm-2 col-4 text-center">
                  <button onclick="increseAmount(${index})" class="btn btn-info mb-2">+</button>
                  <p class="mb-2">E£ ${products[element.id].price} X ${
      element.amount
    }</p>
                  <button onclick="decreaseAmount(${index})" class="btn btn-info">-</button>
                </div>
              </div>
            </div>
    `;
    totalPrice += +products[element.id].price * element.amount;
  });
  total.innerText = `Total: E£ ${totalPrice}`;
}

function increseAmount(id) {
  cart[id].amount++;
  localStorage.setItem("cart", JSON.stringify(cart));
  printCart();
}

function decreaseAmount(id) {
  if (cart[id].amount > 1) {
    cart[id].amount--;
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();
  } else {
    cart.splice(id, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();
  }
}
printCart();
