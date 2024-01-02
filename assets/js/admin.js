// add inputs
let addInputs = document.querySelectorAll("#addProduct input");
let addTextArea = document.querySelector("#addProduct textarea");
let selectCategory = document.querySelector("#addProduct select");
// both tables
let table = document.querySelectorAll("table");
let tableBody = document.querySelectorAll("tbody");
// update inputs
let updateInputs = document.querySelectorAll("#updateProduct input");
let updateTextArea = document.querySelector("#updateProduct textarea");
let updateCategory = document.querySelector("#updateProduct select");
// add admins inputs
let addAdmin = document.querySelectorAll("#addAdmin input");
// show product button
let showProduct = document.querySelector(".showAll");
// show users button
let showUsers = document.querySelector(".showUsers");

// Local Storage Aray
let products = JSON.parse(localStorage.getItem("AllProducts")) || [];
let admins = JSON.parse(localStorage.getItem("admins")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

// clear inputs after adding new product
function clearInputs() {
  for (let i = 0; i < addInputs.length; i++) {
    addInputs[i].value = "";
  }
  addTextArea.value = "";
  selectCategory.value = "";
}

// render Inputs
function renderProduct() {
  let product = {
    name: addInputs[0].value,
    description: addTextArea.value,
    price: addInputs[1].value,
    imgURL: addInputs[2].value,
    category: selectCategory.value,
  };

  products.push(product);
  localStorage.setItem("AllProducts", JSON.stringify(products));
  clearInputs();
  printProducts();
}

// print products inside the table
function printProducts() {
  tableBody[0].innerHTML = "";
  products.forEach((element, index) => {
    tableBody[0].innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${element.name}</td>
      <td>${element.description.substring(0, 20) + "..."}</td>
      <td>E£ ${element.price}</td>
      <td>
        <img width="120" src="${element.imgURL}" alt="">
      </td>
      <td>${element.category}</td>
      <td><button
      onclick="editProduct(${index})"
      data-bs-toggle="modal"
      data-bs-target="#updateProduct"
      class="btn btn-warning">
      <i class="fa-solid fa-pen-to-square"></i>
    </button></td>
      <td>
      <button onclick="deleteProduct(${index})" class="btn btn-danger">
        <i class="fa-solid fa-delete-left"></i>
      </button></td>
    </tr>
    `;
  });
}

// Delete Product from Store
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("AllProducts", JSON.stringify(products));
  printProducts();
}

// edit product
let updateIndex;
function editProduct(index) {
  updateIndex = index;
  updateInputs[0].value = products[index].name;
  updateInputs[1].value = products[index].price;
  updateInputs[2].value = products[index].imgURL;
  updateTextArea.value = products[index].description;
  updateCategory.value = products[index].category;
}
// update product
function updateProduct() {
  products[updateIndex] = {
    name: updateInputs[0].value,
    description: updateTextArea.value,
    price: updateInputs[1].value,
    imgURL: updateInputs[2].value,
    category: updateCategory.value,
  };
  localStorage.setItem("AllProducts", JSON.stringify(products));
  printProducts();
}

// add new Admin
function addNewAdmin() {
  let admin = {
    name: addAdmin[0].value,
    email: addAdmin[1].value,
    password: addAdmin[2].value,
  };
  admins.push(admin);
  localStorage.setItem("admins", JSON.stringify(admins));
}

// print Users inside the table
function printUsers() {
  tableBody[1].innerHTML = "";
  users.forEach((user, id) => {
    tableBody[1].innerHTML += `
    <tr>
      <td>${id + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
    </tr>
    `;
  });
}

// show and hide product table
function showAllProducts() {
  if (table[1].clientHeight != 0) {
    showAllUsers();
  }
  if (table[0].clientHeight == 0) {
    table[0].style.display = "table";
    table[0].style.height = table[0].scrollHeight + "px";
    showProduct.classList.replace("btn-info", "btn-secondary");
    showProduct.innerText = "Hide Products";
    setTimeout(() => {
      table[0].style.opacity = "1";
    }, 500);
  } else {
    table[0].style.opacity = 0;
    setTimeout(() => {
      table[0].style.display = null;
      table[0].style.height = null;
      showProduct.classList.replace("btn-secondary", "btn-info");
      showProduct.innerText = "Show Products";
    }, 500);
  }
}
// show and hide Users table
function showAllUsers() {
  if (table[0].clientHeight != 0) {
    showAllProducts();
  }
  if (table[1].clientHeight == 0) {
    table[1].style.display = "table";
    table[1].style.height = table[1].scrollHeight + "px";
    showUsers.classList.replace("btn-info", "btn-secondary");
    showUsers.innerText = "Hide Users";
    setTimeout(() => {
      table[1].style.opacity = "1";
    }, 500);
  } else {
    table[1].style.opacity = 0;
    setTimeout(() => {
      table[1].style.display = null;
      table[1].style.height = null;
      showUsers.classList.replace("btn-secondary", "btn-info");
      showUsers.innerText = "Show Users";
    }, 500);
  }
}
printProducts();
printUsers();
