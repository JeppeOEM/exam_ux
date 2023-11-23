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

export function alter_cart() {}
