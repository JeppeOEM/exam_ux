"use strict";
import { show_current_items } from "../functions/cart.js";

// import "../cart.js";
import { load_html_checkout } from "../html_components.js";

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
