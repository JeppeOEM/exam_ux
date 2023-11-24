"use strict";
import { add_to_cart, show_current_items } from "../functions/cartz.js";

import { breadcrumb } from "../functions/breadcrumb.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { load_html } from "../html_components.js";
import { get_products } from "../functions/get_products.js";

let this_item = {
  id: 12,
  title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  price: 114,
  image: null,
  img: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
};

addEventListener("DOMContentLoaded", (event) => {
  // is_logged_in();

  const category = sessionStorage.getItem("category");
  get_products(event, category, "load_category");

  breadcrumb(sessionStorage.getItem("category"));

  document.querySelector(".add_cart").addEventListener("click", () => {
    add_to_cart("dd", this_item);
    console.log(this_item);
    show_current_items();
  });
});
