"use strict";

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener;
});

async function get_products(category) {
  let dynamic_category = "/";
  if (category != "all") {
    dynamic_category = convert_category(category);
  }
  let response = await fetch(`https://fakestoreapi.com/products${dynamic_category}`);
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
      console.log(category);
      console.log(selected.dataset.category);
      redirect_single_item(item_id);
    });
  });

  return json;
}

function redirect_single_item(item_id) {
  window.location.href = `/item?id=${item_id.toString()}`;
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

function convert_category(category) {
  let output;
  switch (category) {
    case "mens":
      output = "/category/men's clothing";
      break;
    case "womens":
      output = "/category/women's clothing";
      break;
    case "jewelery":
      output = "/category/jewelery";
      break;
    case "electronics":
      output = "/category/electronics";
      break;
  }
  return output;
}
