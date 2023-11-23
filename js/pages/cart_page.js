import {
  init_cart,
  add_to_cart,
  get_cart,
  increase_item,
  decrease_item,
  clear_cart,
  remove_duplicates,
  count_items,
} from "../functions/cart.js";
import { load_html } from "../html_components.js";

document.addEventListener("DOMContentLoaded", function () {
  breadcrumb(sessionStorage.getItem("category"));
  build_items();

  document.querySelector(".add_cart").addEventListener("click", () => {
    add_to_cart("dd", this_item);
    console.log(this_item);
    show_current_items();
  });

  document.querySelector(".clear_cart").addEventListener("click", () => {
    clear_cart();
  });
});

function build_items() {
  const items_cart = document.querySelector("#items_cart");
  const template = document.querySelector("template");
  const items = get_cart("dd");
  const items_per_key = count_items(items);
  console.log(items_per_key);
  const keys = Object.keys(items_per_key);
  const filtered_list = remove_duplicates(items);

  filtered_list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".image_cart").src = item.image;
    clone.querySelector(".image_cart").alt = item.title;
    clone.querySelector(".title_cart").textContent = item.title;
    clone.querySelector(".price_cart").textContent = item.price;
    clone.querySelector(".quantity").textContent = items_per_key[item.title];
    clone.querySelector(".increase").setAttribute("data-id", item.id);
    clone.querySelector(".decrease").setAttribute("data-id", item.id);
    clone.querySelector(".decrease").addEventListener("click", () => {
      decrease_item();
    });
    clone.querySelector(".increase").addEventListener("click", () => {
      increase_item();
    });
    items_cart.appendChild(clone);
  });
}

function create_cart() {}
