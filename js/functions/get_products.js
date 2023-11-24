import { breadcrumb } from "../functions/breadcrumb.js";

export async function get_products(event, category, load = "") {
  category;

  if (load === "load_category") {
    "Value of category before condition:", category;
    //if sessionStorage.getItem() is empty null is returned
    //but converts to a string automatically when passed on to this function
    if (category == "null") {
      category = "all";
      "Value of category after condition:", category;
      sessionStorage.setItem("category", "all");
      category;
    }
  } else {
    category;
    category = event.target.dataset.filter;
  }
  let dynamic_category = "/";
  if (category != "all") {
    sessionStorage.setItem("category", `${category}`);
    dynamic_category = `/category/${category}`;
  }

  breadcrumb(category);
  let item_array;
  if (category === "clothing") {
    item_array = await fetch_clothing();
    // item_array = sorted_list(item_array, "alphabetic");
  } else {
    let response = await fetch(`https://fakestoreapi.com/products${dynamic_category}`);
    item_array = await response.json();
    let sorting = JSON.parse(sessionStorage.getItem("current_sorting"));
    item_array = sorted_list(item_array, sorting["type"], sorting["direction"]);
  }
  item_array = await insert_items(item_array);
  sessionStorage.setItem("category", category);
  "ITEM ARRAY MOFOOOOOOOOOO", item_array;
  sessionStorage.setItem("current_items", JSON.stringify(item_array));
  "CURRENT FUCKING ITEMS", sessionStorage.getItem("current_items");
  return item_array;
}

export async function insert_items(item_array) {
  await clone_items(item_array);
  let items = document.querySelectorAll(".grid_item");
  //callback functions are passed without parameters
  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      const category = selected.dataset.category;
      const item_id = selected.id;
      localStorage.setItem("item_id", `${item_id}`);
      redirect_single_item(item_id);
    });
  });

  return item_array;
}

async function fetch_clothing() {
  const response_men = await fetch(`https://fakestoreapi.com/products/category/men's clothing/`);
  const response_women = await fetch(`https://fakestoreapi.com/products/category/women's clothing/`);
  response_men;
  response_women;
  const json_men = await response_men.json();
  const json_women = await response_women.json();
  const combined = [...json_men, ...json_women];
  "before", combined;
  return combined;
}

async function clone_items(json) {
  "EL JSON", json;
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
    ("nothing to remove");
  }
}

function redirect_all() {
  sessionStorage.setItem("category", null);
}

function redirect_single_item() {
  window.location.href = "item.html";
}

// ******************SORTING******************

export function sorted_list(list, type, direction = 1) {
  // direction = 1 does not change output
  // direction = -1 reverses output
  let sorted;

  if (type === "alphabetic") {
    sorted = list.sort(alphabetic);
  } else if (type === "price") {
    sorted = list.sort(price);
  }

  sessionStorage.setItem("current_sorting", JSON.stringify({ type: type, direction: direction }));
  return sorted;

  function alphabetic(product_a, product_b) {
    if (product_a.title.toUpperCase() < product_b.title.toUpperCase()) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

  function price(product_a, product_b) {
    if (parseFloat(product_a.price) < parseFloat(product_b.price)) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
}
