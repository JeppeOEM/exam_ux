document.querySelector(".login").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  console.log(formData);
  const email = formData.get("login_email");
  const password = formData.get("login_password");
  console.log(email);
  console.log(password);
  log_in(email, password);
});
async function log_in(email, password) {
  const response = await fetch("http://localhost:3000/users");
  const json = await response.json();
  console.log(json);
  console.log(email);
  console.log(password);
  const user = json.find((item) => item.password === String(password) && item.email === String(email));
  console.log(user);
  sessionStorage.setItem("email", user.email);
  sessionStorage.setItem("password", user.password);
  window.location.href = "/shop.html";
}
