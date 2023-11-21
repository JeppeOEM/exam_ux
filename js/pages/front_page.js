import { is_logged_in } from "../login/backend.js";
import { init_cart, add_to_cart, get_cart } from "../cart.js";
import { load_html } from "../html_components.js";
addEventListener("DOMContentLoaded", () => {
  load_html();
  init_cart("dd");
  is_logged_in();
  // items_total("dd");

  console.log(get_cart("dd"));
});
