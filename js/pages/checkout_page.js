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
  load_html()
    .then(() => {
      console.log("before cart");
      init_cart("dd");
      // items_total();
      console.log("LOOOOOOOL");
      console.log(sessionStorage.getItem("category"));
      breadcrumb(sessionStorage.getItem("category"));
      let cart = localStorage.getItem("cart");
      console.log(cart);
      show_current_items(true);
      //   document.querySelector(".add_cart").addEventListener("click", () => {
      //     add_to_cart("dd", this_item);
      //     console.log(this_item);
      //     show_current_items();
      //   });

      const hide = document.querySelector(".continue");

      hide.addEventListener("click", () => {
        const aside = document.querySelector("aside");
        aside.classList.remove("show");
      });
    })
    .then(() => {});
});

function update_count_obj(key, value) {
  count[key] = value;
}

async function load_item() {
  let item_id = localStorage.getItem("item_id");
  console.log(item_id);
  let response = await fetch(`https://fakestoreapi.com/products/${item_id}`);
  let json = await response.json();
  console.log(json);
  return json;
}
