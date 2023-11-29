"use strict";
import { add_to_cart, show_current_items } from "../functions/cartz.js";

// import "../cart.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { breadcrumb } from "../functions/breadcrumb.js";
const this_item = {
  id: null,
  title: null,
  price: null,
  image: null,
};

document.addEventListener("DOMContentLoaded", function () {
  is_logged_in();
  // load_html().then(() => {
  //Repeating content in carts
  build_page();
  const category = sessionStorage.getItem("category");
  console.log(category, "ITEM PAGE");
  breadcrumb(category);
  document.querySelector(".add_cart").addEventListener("click", () => {
    add_to_cart("dd", this_item);
    const aside = document.querySelector("#cart");
    show_current_items();
    aside.classList.add("show");
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
  let response = await fetch(`https://fakestoreapi.com/products/${item_id}`);
  let json = await response.json();

  return json;
}
