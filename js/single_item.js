import { items_total, init_cart, add_to_cart, } from "./cart.js";
import { load_html } from "./html_components.js";

const this_item = {
  id: null,
  title: null,
  price: null,
  img: null,
};

document.addEventListener("DOMContentLoaded", function () {
  load_html();
  init_cart();
  items_total();

  let cart = localStorage.getItem("cart");
  console.log(cart);

  build_page();
  document.querySelector(".add_cart").addEventListener("click", () => {
    add_to_cart("dd", item);

  });
});

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
