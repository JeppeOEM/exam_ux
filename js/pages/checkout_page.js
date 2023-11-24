"use strict";
import {
  init_cart,
  add_to_cart,
  remove_duplicates,
  count_items,
  increase_item,
  decrease_item,
  clear_cart,
  delete_item,
  count,
  show_current_items,
} from "../functions/cart.js";

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
