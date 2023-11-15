const { property } = require("lodash");

document.querySelector(".register").addEventListener("submit", function (event) {
  const formData = new FormData(this);
  const email = formData.get("email");
  const password = formData.get("password");
  const retype_password = formData.get("retype_password");
  console.log(email);
  console.log(password);
  let is_validated = validate_password(password, retype_password);
  if (is_validated) {
    save_user(email, password);
  } else {
    console.log("erorrrrrrrrrrrrrrrrro");
  }
});

async function save_user(email, password) {
  let data = {
    email,
    password,
  };
  let options = {
    method: "POST",
    header: {
      // property names can be with or without quotes
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch("/users", options);
  if (response.status === 200) {
    console.log(response.status);
  }
}

function validate_password(password, retyped_password) {
  // search executes reges and returns first match in the string.
  specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  lower_case = /[a-z]/;
  upper_case = /[A-Z]/;
  digit = /[0-9]/;
  if (password != retyped_password) {
    return false;
  }
  if (password.length < 8) {
    console.log("Password is too short");
    return false;
  } else if (!lower_case.test(password)) {
    console.log("Password must contain at least one lowercase letter");
    return false;
  } else if (!upper_case.test(password)) {
    console.log("Password must contain at least one uppercase letter");
    return false;
  } else if (!digit.test(password)) {
    console.log("Password must contain at least one number");
    return false;
  } else if (!specialChars.test(password)) {
    console.log("Password must contain at least one special character");
    return false;
  } else {
    console.log("Success!");
    return true;
  }
}
