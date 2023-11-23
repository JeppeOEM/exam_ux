"use strict";
import {
  init_cart,
  add_to_cart,
  remove_duplicates,
  count_items,
  increase_item,
  decrease_item,
  clear_cart,
} from "../functions/cart.js";
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

      build_page();
      document.querySelector(".add_cart").addEventListener("click", () => {
        add_to_cart("dd", this_item);
        console.log(this_item);
        show_current_items();
      });

      document.querySelector(".clear_cart").addEventListener("click", () => {
        clear_cart();
      });

      const hide = document.querySelector(".continue");

      hide.addEventListener("click", () => {
        const aside = document.querySelector("aside");
        aside.classList.remove("show");
      });
    })
    .then(() => {});
});

function update_count_obj(key, value) {
  counted[key] = value;
}

function update_count_html(counted) {
  for (let key in counted) {
    console.log(counted[key]);

    const amount = document.querySelector(`#c${key} .amount`);
    amount.innerText = counted[key];
    console.log(amount);
  }

  console.log("ccccc", counted);
}
async function show_current_items() {
  const cart = localStorage.getItem("dd");
  const items = JSON.parse(cart);
  const counted = count_items(items);
  const aside = document.querySelector("aside");
  const filtered_list = remove_duplicates(items);
  console.log(filtered_list);
  await clone_items(filtered_list);
  update_count_html(counted);
  aside.classList.add("show");
  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  minus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      let id = selected.id;
      id = id.substring(1);
      console.log(event.target);
      decrease_item(id, "dd");
      const counted = count_items(cart);
      update_count_html(counted);
    });
  });
  plus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      add_to_cart("dd", this_item);
    });
  });
}

async function clone_items(json) {
  const product_grid = document.querySelector("#cart");
  const template = document.querySelector("template");
  remove_elements("cart_item");
  json.forEach((obj) => {
    const clone = template.content.cloneNode(true);
    //id's must start with a letter
    clone.querySelector(".cart_item").id = "c" + obj.id;
    clone.querySelector(".cart_item").setAttribute("data-category", obj.category);
    clone.querySelector(".name").textContent = obj.title;
    clone.querySelector(".product_image").src = obj.image;
    clone.querySelector(".product_image").alt = obj.title;
    clone.querySelector(".price").textContent = obj.price;
    // clone.querySelector(".description").textContent = obj.description;
    product_grid.appendChild(clone);
  });
}
function remove_elements(class_name) {
  let elements = document.querySelectorAll(`.${String(class_name)}`);

  try {
    elements.forEach(function (ele) {
      ele.parentNode.removeChild(ele);
    });
  } catch {
    console.log("nothing to remove");
  }
}

async function build_page() {
  let item = await load_item();
  console.log(item.description);
  console.log(item.category);
  console.log(item.title);
  console.log(item.title);
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
  console.log(item_id);
  let response = await fetch(`https://fakestoreapi.com/products/${item_id}`);
  let json = await response.json();
  console.log(json);
  return json;
}
