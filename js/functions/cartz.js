"use strict";
// import {
//   init_cart,
//   add_to_cart,
//   remove_duplicates,
//   count_items,
//   increase_item,
//   decrease_item,
//   clear_cart,
//   delete_item,
//   count,
//   show_current_items,
// } from "./cart.js";

// import "../cart.js";
import { load_html } from "../html_components.js";
import { breadcrumb } from "./breadcrumb.js";
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

export let count = {};

export async function show_current_items(init = false) {
  const cart = localStorage.getItem("dd");
  let items = JSON.parse(cart);

  count = count_items(items);
  const aside = document.querySelector("aside");
  const filtered_list = remove_duplicates(items);

  await clone_items(filtered_list);
  update_count_html(count);
  if (init) {
  } else {
    aside.classList.add("show");
  }
  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  minus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      let id = selected.id;
      //remove letter that was added before the numeric id
      id = id.substring(1);
      items = decrease_item(id, "dd", count);
      count = count_items(items);
      update_count_html();
    });
  });
  plus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      let id = selected.id;
      id = id.substring(1);
      items = increase_item(id, "dd", count);
      count = count_items(items);
      update_count_html();
    });
  });

  function update_count_html() {
    for (let key in count) {
      const amount = document.querySelector(`#c${key} .amount`);
      amount.innerText = count[key];
    }
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
      clone.querySelector(".delete_item").addEventListener("click", (event) => {
        const selected = event.target.closest("[id]");
        let id = selected.id;
        id = id.substring(1);
        delete_item(id, "dd");
      });
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
}

export function init_cart(key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
    console.log("created cart", localStorage.getItem(key));
  }
  console.log("current cart", localStorage.getItem(key));
}

// export function items_total(key) {
//   const items = get_cart(key);
//   const len = items.length;
//   const total = document.querySelector(".total");
//   total.innerText = len;
// }

export function add_to_cart(key, item) {
  const item_list = get_cart(key);
  item_list.push(item);
  localStorage.setItem(key, JSON.stringify(item_list));
}
export function get_cart(key) {
  const items = localStorage.getItem(key);
  return JSON.parse(items);
}

export function decrease_item(id, key, counted) {
  // the items id is is used as an key in the count object
  console.log(id, key);
  let items = localStorage.getItem(key);
  items = JSON.parse(items);

  let index = items.findIndex((item) => {
    item.id = parseInt(item.id);
    id = parseInt(id);

    if (item.id === id) {
      return true; // Return true when a match is found
    }
    return false; // Return false otherwise
  });

  // findIndex will return -1 if there is not a match
  if (index !== -1) {
    if (counted[id] === 1) {
      // if one item left remove product from cart
      const product = document.querySelector(`#c${id}`);
      product.remove();
    }

    // splice(starting index, number of indexes)
    items.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(items));
    console.log(items);

    return items;
  }
}

export function increase_item(id, key) {
  console.log(id, key);
  let items = localStorage.getItem(key);
  items = JSON.parse(items);
  console.log(items.length);
  //Implicit return/statement evaluated and returned
  const item = items.find((item) => item.id === parseInt(id));
  console.log(item);
  //creates a independent/deep copy of the object
  const deep_copy = JSON.parse(JSON.stringify(item));
  //inserts copy at the start of the array
  items.unshift(deep_copy);
  console.log(items.length);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
}

export function delete_item(id, key) {
  let items = localStorage.getItem(key);

  items = JSON.parse(items);

  const filtered = items.filter((item) => {
    return item.id !== parseInt(id);
  });

  const product = document.querySelector(`#c${id}`);
  product.remove();
  localStorage.setItem(key, JSON.stringify(filtered));
}

export function clear_cart() {
  localStorage.clear();
}

export function count_items(items) {
  let counts = {};
  items.forEach((item) => {
    let key = item.id;

    //if falsy, right side of ?? is returned: counts['key'] = 0+1
    //if truthy left-side of ?? is returned: counts[key] = counts[key]+1
    counts[key] = (counts[key] ?? 0) + 1;
  });

  return counts;
}
export function remove_duplicates(items) {
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};

  // Loop for the array elements
  for (let i in items) {
    // Extract the title
    let objTitle = items[i]["id"];

    // Use the title as the index
    uniqueObject[objTitle] = items[i];
  }

  // Loop to push unique object into array
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  // Display the unique obj ects
  return newArray;
}
