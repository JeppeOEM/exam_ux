// import { restore_form } from "./checkout_form_page";

document.addEventListener("DOMContentLoaded", () => {
  restore_form();
});

function restore_form() {
  document.querySelector("#email").value = sessionStorage.getItem("email") || "";
  document.querySelector("#first_name").value = sessionStorage.getItem("first_name") || "";
  document.querySelector("#last_name").value = sessionStorage.getItem("last_name") || "";
  document.querySelector("#address").value = sessionStorage.getItem("address") || "";
  document.querySelector("#zip").value = sessionStorage.getItem("zip") || "";
  document.querySelector("#city").value = sessionStorage.getItem("city") || "";
  document.querySelector("#mobile").value = sessionStorage.getItem("mobile") || "";
}
