let accessBtns = document.querySelector(".access");

// localStorge items
let logged = JSON.parse(localStorage.getItem("logged-in"));

if (logged) {
  accessBtns.innerHTML = `
  <li class="nav-item">
    <button onclick="logOut()" class="btn btn-danger">Logout</button>
  </li>
  `;
}

function logOut() {
  localStorage.removeItem("logged-in");
  location.replace(location.origin + "/index.html");
}
