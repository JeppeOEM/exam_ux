

import { init_cart, add_to_cart, get_cart } from "../cart.js";
import { load_html } from "../html_components.js";
addEventListener("DOMContentLoaded", () => {

  load_html();
  init_cart("dd");
  // items_total("dd");

  console.log(get_cart("dd"));
});
