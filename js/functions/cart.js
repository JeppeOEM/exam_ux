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
  console.log("keeeeeeeeeeey", key);
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function decrease_item(id, key) {
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
    console.log(typeof index);
    console.log(data, "fucking index", index);
    // splice(starting index, number of indexes)
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
    console.log(data);
  }

  return data;
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

export function set_item_count(key, count_obj) {
  localStorage.setItem(key, JSON.stringify(count_obj));
}

export function get_item_count(key, count_obj) {
  localStorage.setItem(key, JSON.stringify(count_obj));
}

export function clear_cart() {
  localStorage.clear();
  console.log(localStorage.getItem("dd"));
}

export function count_items(items) {
  console.log(items);
  let counts = {};
  items.forEach((item) => {
    let key = item.id;

    //if falsy, right side is returned and counts['key'] = 0+1
    //if truthy left-side is returned counts[key] = counts[key]+1
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
