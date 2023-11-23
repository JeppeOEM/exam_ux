export let count = {};

export async function show_current_items() {
  const cart = localStorage.getItem("dd");
  let items = JSON.parse(cart);
  count = count_items(items);
  const aside = document.querySelector("aside");
  const filtered_list = remove_duplicates(items);
  console.log(filtered_list);
  await clone_items(filtered_list);
  update_count_html(count);
  aside.classList.add("show");
  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  minus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selected = event.target.closest("[id]");
      let id = selected.id;
      //remove letter that was added before the numeric id
      id = id.substring(1);
      console.log(event.target);
      items = decrease_item(id, "dd", count);
      count = count_items(items);
      let count_equal_one = update_count_html();
    });
  });
  plus.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      add_to_cart("dd", this_item);
      items = localStorage.getItem("dd");
      items = JSON.parse(items);
      count = count_items(items);
      update_count_html();
    });
  });

  function update_count_html() {
    for (let key in count) {
      console.log(count[key]);

      const amount = document.querySelector(`#c${key} .amount`);
      amount.innerText = count[key];
      console.log(amount);
    }
    console.log("ccccc", count);
  }
  async function clone_items(json) {
    const product_grid = document.querySelector("#cart");
    const template = document.querySelector("template");
    remove_elements("cart_item");
    console.log("DSSSSSSSSSSSSSSS", json);
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
  console.log(localStorage.getItem(key));
}
export function get_cart(key) {
  console.log("keeeeeeeeeeey", key);
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function decrease_item(id, key, counted) {
  // the items id is is used as an key in the count object
  console.log("id", counted[id]);

  console.log(id, key);
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  console.log(data);

  let index = data.findIndex((item) => {
    item.id = parseInt(item.id);
    id = parseInt(id);
    console.log(item.id, id);
    if (item.id === id) {
      console.log("success");
      console.log(id);
      return true; // Return true when a match is found
    }
    return false; // Return false otherwise
  });
  console.log(index);

  // findIndex will return -1 if there is not a match
  if (index !== -1) {
    if (counted[id] === 1) {
      // if one item left remove product from cart
      const product = document.querySelector(`#c${id}`);
      product.remove();
    }
    console.log(typeof index);
    console.log(data, "fucking index", index);
    // splice(starting index, number of indexes)
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
    console.log(data);

    return data;
  }
}

export function increase_item(id, key, item) {
  console.log(id, key);
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  let index = data.findIndex((item) => {
    item.id === id;
  });
  console.log(typeof "data");
  //findIndex will return -1 if there is not match
  if (index !== -1) {
    //insert at beginning of array
    data.unshift(item);
  }

  return data;
}

export function delete_item(id, key) {
  let items = localStorage.getItem(key);
  console.log(items, "issssssssssssssssssssssssstems");
  items = JSON.parse(items);
  console.log(typeof id);
  const filtered = items.filter((item) => {
    return item.id !== parseInt(id);
  });
  console.log(filtered);
  const product = document.querySelector(`#c${id}`);
  product.remove();
  localStorage.setItem(key, JSON.stringify(filtered));
}

export function clear_cart() {
  localStorage.clear();
  console.log(localStorage.getItem("dd"));
}

export function count_items(items) {
  console.log(items, "ITEEEEEEEEEMS");
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
