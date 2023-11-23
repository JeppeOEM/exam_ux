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
import { load_html } from "../html_components.js";
import { breadcrumb } from "../functions/breadcrumb.js";
const this_item = {
  id: null,
  title: null,
  price: null,
  image: null,
};

document.addEventListener("DOMContentLoaded", function () {
  load_html().then(() => {
    show_current_items(true);

    // const hide = document.querySelector(".continue");

    // hide.addEventListener("click", () => {
    //   const aside = document.querySelector("aside");
    //   aside.classList.remove("show");
    // });
  });
});
