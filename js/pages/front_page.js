import { is_logged_in } from "../login/backend.js";
import { init_cart, add_to_cart, get_cart } from "../cart.js";
import { load_html } from "../html_components.js";
addEventListener("DOMContentLoaded", () => {
  is_logged_in();
  // items_total("dd");

  get_cart("dd");

  document.querySelector(".login").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const email = formData.get("login_email");
    const password = formData.get("login_password");

    log_in(email, password);
  });
  async function log_in(email, password) {
    const response = await fetch("http://localhost:3000/users");
    const json = await response.json();

    const user = json.find((item) => item.password === String(password) && item.email === String(email));

    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("password", user.password);
    window.location.href = "/shop.html";
  }
});
