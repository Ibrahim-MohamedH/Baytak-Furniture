// get current page (login or register)
let currentPage = window.location.pathname.split("/");
currentPage = currentPage[currentPage.length - 1];

// get page inputs
let inputs = document.querySelectorAll("input");

// get all users data from local storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// check if the user already logged in
let loggedIn = JSON.parse(localStorage.getItem("logged-in"));
if (loggedIn) {
  window.location.replace(window.location.origin + "/index.html");
}

if (currentPage == "register.html") {
  function createUser() {
    let user = {
      name: inputs[0].value,
      email: inputs[1].value,
      password: inputs[2].value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.replace("login.html");
  }
} else if (currentPage == "login.html") {
  function login() {
    let email = inputs[0].value;
    let password = inputs[1].value;
    let username;
    let canLogin = false;
    users.forEach((element) => {
      if (element.email == email && element.password == password) {
        username = element.name;
        canLogin = true;
      }
    });
    if (canLogin) {
      localStorage.setItem(
        "logged-in",
        JSON.stringify({ email: email, name: username })
      );
      window.location.replace("/index.html");
    } else {
      window.alert("Incorrect email or password");
    }
  }
}
