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

import { breadcrumb } from "../functions/breadcrumb.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { load_html } from "../html_components.js";
import { get_products } from "../functions/get_products.js";
import { focused_element } from "../functions/accesability.js";

addEventListener("DOMContentLoaded", (event) => {
  // is_logged_in();
  load_html().then(() => {
    init_cart("dd");
    const category = sessionStorage.getItem("category");
    get_products(event, category, "load_category");
    focused_element();
    document.querySelector(".add_cart").addEventListener("click", () => {
      // add_to_cart("dd", this_item);

      show_current_items();
    });

    const filter_btns = document.querySelectorAll(".t");
    filter_btns.forEach((btn) => {
      console.log(btn.dataset.filter);
      btn.addEventListener("click", get_products);
    });
  });
});
