import { items_total, init_cart, add_to_cart } from "../cart.js";
import { load_html } from "../html_components.js";
import { breadcrumb } from "../functions/breadcrumb.js";
const this_item = {
  id: null,
  title: null,
  price: null,
  img: null,
};

document.addEventListener("DOMContentLoaded", function () {
  load_html().then(() => {
    init_cart();
    items_total();
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

    hide.addEventListener("click", () => {
      const aside = document.querySelector("aside");
      aside.classList.remove("show");
    });
  });
});

function show_current_items() {
  const cart = localStorage.getItem("dd");
  const items = JSON.parse(cart);
  const aside = document.querySelector("aside");
  clone_items(items);

  aside.classList.add("show");
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
