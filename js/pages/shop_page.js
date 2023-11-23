"use strict";
import { init_cart, add_to_cart, get_cart } from "../functions/cart.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { load_html } from "../html_components.js";
import { get_products } from "../functions/get_products.js";
import { focused_element } from "../functions/accesability.js";

addEventListener("DOMContentLoaded", (event) => {
  // is_logged_in();
  load_html().then(() => {
    init_cart("dd");
    const category = sessionStorage.getItem("category");
    console.log(category, "THE FUCKING CATECORY");
    get_products(event, category, "load_category");
    focused_element();

    const filter_btns = document.querySelectorAll(".t");
    filter_btns.forEach((btn) => {
      console.log(btn.dataset.filter);
      btn.addEventListener("click", get_products);
    });
  });
});
