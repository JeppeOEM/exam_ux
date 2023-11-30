"use strict";
import { add_to_cart, show_current_items, init_cart } from "../functions/cartz.js";

import { breadcrumb_links } from "../functions/breadcrumb.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { load_html } from "../html_components.js";
import { get_products, sorted_list, insert_items, get_previous_sorting } from "../functions/get_products.js";



is_logged_in();

addEventListener("DOMContentLoaded", (event) => {
  init_cart();
  const category = sessionStorage.getItem("category");
  get_products(event, category, "load_category");
  console.log(category, "SHOP PAGE");
  get_previous_sorting();

  // breadcrumb_links(sessionStorage.getItem("category"));

  console.log(category, "category !!!!!!!!!!!!!!");

  let selects = document.querySelectorAll(".select");
  selects.forEach((select) => {
    select.addEventListener("change", () => {
      const items = JSON.parse(sessionStorage.getItem("current_items"));
      items, "items to sort nowwwwwwwwwwwwww";
      let sorted_items = sorted_list(items, select.name, parseInt(select.value));
      insert_items(sorted_items);
    });
  });

  // list, type, (direction = 1);
});

// async function breadcrumb_links(category) {
//   let b = await breadcrumb(category);
//   // console.log(b);
//   console.log(b.innerHTML);
//   // console.log(b.querySelector("button"));
//   const breadcrumb_btns = b.querySelectorAll(".breadcrumb_btn");

//   breadcrumb_btns.forEach((btn) => {
//     console.log(btn);
//     btn.addEventListener("click", () => {
//       console.log(btn);
//       console.log("get_p", btn.dataset.filter);
//       sessionStorage.setItem("category", btn.dataset.filter);
//       console.log(sessionStorage.getItem("category"), "category");
//     });
//   });
// }
