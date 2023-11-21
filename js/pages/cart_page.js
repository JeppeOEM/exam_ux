import { items_total, init_cart, add_to_cart, get_cart, increase_item, decrease_item, clear_cart } from "../cart.js";
import { load_html } from "../html_components.js";


document.addEventListener("DOMContentLoaded", function () {
  load_html();
  init_cart();
  //   items_total();
  build_items();

  document.querySelector(".clear").addEventListener("click", () => {
    clear_cart();
  });
});

function build_items() {
  const items_cart = document.querySelector("#items_cart");
  const template = document.querySelector("template");
  console.log("hej");
  const items = get_cart("dd");
  console.log(items);
  const items_per_key = count_items(items);
  console.log(items_per_key);
  const keys = Object.keys(items_per_key);
  const filtered_list = removeDuplicates(items);

  filtered_list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".image_cart").src = item.image;
    clone.querySelector(".image_cart").alt = item.title;
    clone.querySelector(".title_cart").textContent = item.title;
    clone.querySelector(".price_cart").textContent = item.price;
    clone.querySelector(".quantity").textContent = items_per_key[item.title];
    clone.querySelector(".increase").setAttribute("data-id", item.id);
    clone.querySelector(".decrease").setAttribute("data-id", item.id);
    clone.querySelector(".decrease").addEventListener("click", () => {
      decrease_item();
    });
    clone.querySelector(".increase").addEventListener("click", () => {
      increase_item();
    });
    items_cart.appendChild(clone);
  });
}

function create_cart() {}

function count_items(items) {
  let counts = {};
  items.forEach((item) => {
    let key = item.id;

    //if falsy, right side is returned and counts['key'] = 0+1
    //if truthy left-side is returned counts[key] = counts[key]+1
    counts[key] = (counts[key] ?? 0) + 1;
  });

  return counts;
}
function removeDuplicates(items) {
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
