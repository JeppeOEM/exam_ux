document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".register").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get("email");
    const password = formData.get("password");
    const retype_password = formData.get("retype_password");
    console.log(email);
    console.log(password);
    // let is_email_registered = email_check(email);
    // console.log(is_email_registered);
    let is_validated = validate_credentials(password, retype_password, email);

    // save_user(email, password);
  });

  document.querySelector(".login").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get("login_email");
    const password = formData.get("login_password");
    console.log(email);
    console.log(password);
    sessionStorage.setItem("key", "value");
    let data = sessionStorage.getItem("key");
    sessionStorage.removeItem("key");
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
  });
});

async function login(email, password) {
  let response = await fetch("http://localhost:3000/users");
  let login = await response.json();
  console.log(login);
}

async function email_check(email) {
  console.log(email);
  let response = await fetch(`http://localhost:3000/users?email=${email}`);
  let email = await response.json();
  console.log(email);
}

function validate_credentials(password, retyped_password, email) {
  // search executes reges and returns first match in the string.
  let re_special_chars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  let re_lower_case = /[a-z]/;
  let re_upper_case = /[A-Z]/;
  let re_digit = /[0-9]/;
  let re_email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re_email.test(email)) {
    return false;
  }
  if (password != retyped_password) {
    return false;
  }
  if (password.length < 8) {
    console.log("Password is too short");
    return false;
  } else if (!re_lower_case.test(password)) {
    console.log("Password must contain at least one lowercase letter");
    return false;
  } else if (!re_upper_case.test(password)) {
    console.log("Password must contain at least one uppercase letter");
    return false;
  } else if (!re_digit.test(password)) {
    console.log("Password must contain at least one number");
    return false;
  } else if (!re_special_chars.test(password)) {
    console.log("Password must contain at least one special character");
    return false;
  } else {
    console.log("Success!");
    return true;
  }
}
async function save_user(email, password) {
  let data = {
    email: email,
    password: password,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch("http://localhost:3000/users", options);
  response = await response.status();
  console.log(response);
}
function test() {
  save_user("ddsds@dd.dk", "lolololD!88");
}
