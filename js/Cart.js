export function init_cart(key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }
}

export function items_total(key) {
  const items = get_cart(key);
  const len = items.length;
  const total = document.querySelector(".total");
  total.innerText = len;
}

export function add_to_cart(key, item) {
  const item_list = get_cart(key);
  item_list.push(item);
  localStorage.setItem(key, JSON.stringify(item_list));
}
export function get_cart(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function decrease_item(key, item_title) {
  const data = localStorage.getItem(key);
  let index = data.findIndex((item) => {
    item.title === item_title;
  });
  //findIndex will return -1 if there is not match
  if (indexToRemove !== -1) {
    //splice(starting index, number of indexes)
    array.splice(indexToRemove, 1);
  }

  return JSON.parse(data);
}

export function increase_item(key, item_title) {
  const data = localStorage.getItem(key);
  let index = data.findIndex((item) => {
    item.title === item_title;
  });
  //findIndex will return -1 if there is not match
  if (indexToRemove !== -1) {
    //splice(starting index, number of indexes)
    array.splice(indexToRemove, 1);
  }

  return JSON.parse(data);
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
