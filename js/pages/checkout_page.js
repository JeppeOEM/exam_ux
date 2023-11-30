"use strict";
import { show_current_items } from "../functions/cart.js";
import { is_logged_in } from "../functions/is_logged_in.js";
// import "../cart.js";
import { load_html_checkout } from "../html_components.js";
is_logged_in();
document.addEventListener("DOMContentLoaded", function () {
  load_html_checkout().then(() => {
    show_current_items();

    // const hide = document.querySelector(".continue");

    // hide.addEventListener("click", () => {
    //   const aside = document.querySelector("aside");
    //   aside.classList.remove("show");
    // });
  });
});
