import { breadcrumb } from "../functions/breadcrumb.js";

export async function get_products(event, category, load = "") {
  console.log(category);

  if (load === "load_category") {
    console.log("Value of category before condition:", category);
    //if sessionStorage.getItem() is empty null is returned
    //but converts to a string automatically when passed on to this function
    if (category == "null") {
      category = "all";
      console.log("Value of category after condition:", category);
      sessionStorage.setItem("category", "all");
      console.log(category);
    }
  } else {
    console.log(category);
    category = event.target.dataset.filter;
  }
  let dynamic_category = "/";
  if (category != "all") {
    sessionStorage.setItem("category", `${category}`);
    dynamic_category = `/category/${category}`;
    console.log(dynamic_category);
  }
  console.log("this category", category);
  breadcrumb(category);
  let item_array;
  if (category === "clothing") {
    item_array = await fetch_clothing();
    console.log("after", item_array);
    // item_array = sorted_list(item_array, "alphabetic");
  } else {
    let response = await fetch(`https://fakestoreapi.com/products${dynamic_category}`);
    item_array = await response.json();
    item_array = sorted_list(item_array, "alphabetic", -1);
    console.log(item_array);
  }
  await clone_items(item_array);

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
  return item_array;
}
async function fetch_clothing() {
  const response_men = await fetch(`https://fakestoreapi.com/products/category/men's clothing/`);
  const response_women = await fetch(`https://fakestoreapi.com/products/category/women's clothing/`);
  console.log(response_men);
  console.log(response_women);
  const json_men = await response_men.json();
  const json_women = await response_women.json();
  const combined = [...json_men, ...json_women];
  console.log("before", combined);
  return combined;
}
function sorted_list(list, type, direction = 1) {
  // direction = 1 does not change output
  // direction = -1 reverses output
  let sorted;
  if (type === "alphabetic") {
    sorted = list.sort(alphabetic);
  } else if (type === "price") {
    sorted = list.sort(price);
  }
  console.log(sorted);
  console.log("sorted_list", sorted);

  return sorted;

  function alphabetic(product_a, product_b) {
    if (product_a.title.toUpperCase() < product_b.title.toUpperCase()) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

  function price(product_a, product_b) {
    console.log(`sort is ${settings.sortBy}`);
    if (parseFloat(product_a.price) < parseFloat(product_b.price)) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
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

function redirect_all() {
  sessionStorage.setItem("category", null);
}

function redirect_single_item() {
  window.location.href = "item.html";
}
