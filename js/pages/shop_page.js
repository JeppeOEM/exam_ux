"use strict";
import { init_cart, add_to_cart, get_cart } from "../cart.js";
import { is_logged_in } from "../functions/is_logged_in.js";
import { load_html } from "../html_components.js";
import { breadcrumb } from "../functions/breadcrumb.js";
addEventListener("DOMContentLoaded", (event) => {
  const filter_btns = document.querySelectorAll(".t");
  filter_btns.forEach((btn) => {
    console.log(btn.dataset.filter);
    btn.addEventListener("click", get_products);
  });
  // is_logged_in();
  load_html();
  init_cart("dd");
  const category = sessionStorage.getItem("category");
  get_products(event, category);
  console.log(get_cart("dd"));
});

function redirect_all() {
  sessionStorage.setItem("category", null);
}

async function get_products(event, category = null) {
  try {
    category = event.target.dataset.filter;
  } catch (error) {}

  console.log(category);
  let dynamic_category = "/";
  sessionStorage.setItem("category", "all");
  if (category != "all") {
    sessionStorage.setItem("category", `${category}`);
    dynamic_category = `/category/${category}`;
    console.log(dynamic_category);
  }
  breadcrumb(category);
  let response = await fetch(`https://fakestoreapi.com/products${dynamic_category}`);
  console.log(response);
  let json = await response.json();
  console.log(json);
  await clone_items(json);
  let items = document.querySelectorAll(".grid_item");
  //callback functions are passed without parameters
  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      const category = selected.dataset.category;
      const item_id = selected.id;
      localStorage.setItem("item_id", `${item_id}`);
      console.log(category);
      console.log(selected.dataset.category);
      redirect_single_item(item_id);
    });
  });
  sessionStorage.setItem("category", category);
  return json;
}

function redirect_single_item(item_id) {
  window.location.href = "item.html";
}

async function clone_items(json) {
  const product_grid = document.querySelector("#product-grid");
  const template = document.querySelector("template");
  remove_elements("grid_item");
  json.forEach((obj) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".grid_item").id = obj.id;
    clone.querySelector(".grid_item").setAttribute("data-category", obj.category);
    clone.querySelector(".name").textContent = obj.title;
    clone.querySelector(".product_image").src = obj.image;
    clone.querySelector(".product_image").alt = obj.title;
    clone.querySelector(".price").textContent = obj.price;

    // clone.querySelector(".description").textContent = obj.description;
    product_grid.appendChild(clone);
  });
}

function remove_elements(class_name) {
  let elements = document.querySelectorAll(`.${class_name}`);

  try {
    elements.forEach(function (ele) {
      ele.parentNode.removeChild(ele);
    });
  } catch {
    console.log("nothing to remove");
  }
}
