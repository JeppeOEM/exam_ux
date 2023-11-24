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
  // load_html().then(() => {
  //Repeating content in carts
  build_page();
  breadcrumb(sessionStorage.getItem("category"));
  document.querySelector(".add_cart").addEventListener("click", () => {
    add_to_cart("dd", this_item);
    show_current_items();
  });
});

async function build_page() {
  let item = await load_item();

  document.querySelector(".item_title").innerText = item.title;
  document.querySelector(".item_image").src = item.image;
  document.querySelector(".item_image").alt = item.title;
  document.querySelector(".item_price").innerText = item.price;
  document.querySelector(".item_rate").innerText = item.rating["rate"];
  document.querySelector(".item_count").innerText = item.rating["count"];
  document.querySelector(".item_description").innerText = item.description;
  const breadcrumb = document.querySelector(".breadcrumb");
  const split = item.title.split(" ");
  const four_words = split.slice(0, 4);
  const words = four_words.join(" ");
  breadcrumb.innerText = breadcrumb.innerText + " " + words;
  this_item.title = item.title;
  this_item.img = item.image;
  this_item.price = item.price;
  this_item.id = item.id;
}
async function load_item() {
  let item_id = localStorage.getItem("item_id");
  item_id;
  let response = await fetch(`https://fakestoreapi.com/products/${item_id}`);
  let json = await response.json();
  json;
  return json;
}
