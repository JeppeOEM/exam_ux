// import { is_logged_in } from "../functions/is_logged_in";
// import { focused_element } from "../functions/accesability";
is_logged_in();
document.addEventListener("DOMContentLoaded", () => {
  let address_confirmed;
  let billing_active;
  sum_price();
  restore_form("address_form");
  show_html();
  header_selectors();
  focused_element();

  const change_data = document.querySelector("#change_data");
  const saved = document.querySelector("#saved");
  const confirm_btn = document.querySelector("#confirm_btn");
  const payment_btn = document.querySelector("#payment_btn");

  change_data.addEventListener("click", (event) => {
    address_form.classList.remove("hide");
    change_data.classList.add("hide");
    document.querySelector(".btn_border").classList.add("hide");
    saved.classList.add("hide");
    confirm_btn.classList.remove("hide");
    confirm_btn.classList.add("showblock");
    payment_btn.classList.add("hide");
    address_confirmed = false;
    show_html();
  });

  address_form.addEventListener("submit", function (event) {
    const checkbox = document.querySelector(".billing_check");
    event.preventDefault();

    if (checkbox.checked) {
      const html = "<h5>Billing Address</h5><p>Same as delivery</p>";
      document.querySelector(".billing_address").innerHTML = html;
      console.log("Checkbox is checked");
    } else {
      console.log("Checkbox is not checked");
    }
    // credit_modal();
    try {
      const change_data = document.querySelector("#change_data");
      change_data.classList.toggle("showblock");
      document.querySelector(".btn_border").classList.add("showflex");
    } catch {
      console.log("could not toggle showblock on #change_data");
    }
    document.querySelector("#address_form").classList.add("hide");
    const saved = document.querySelector("#saved");
    saved.classList.remove("hide");
    address_confirmed = true;
    show_html();
    restore_radio_btn();
    get_form_data("address_form", "saved");
    //hide the confirm button and put in pay button
    document.querySelector("#confirm_btn").classList.add("hide");
    document.querySelector("#payment_btn").classList.remove("hide");
  });
  document.querySelector("#enter_payment_info").addEventListener("click", () => {
    console.log("clicked");
    let error = "no error";
    const credit = document.querySelector("#credit");
    const mobile_pay = document.querySelector("#mobile_pay");
    const dhl = document.querySelector("#dhl");
    const post_nord = document.querySelector("#post_nord");
    const bring = document.querySelector("#bring");
    console.log(
      bring.checked,
      "bring",
      mobile_pay.checked,
      "mobile",
      dhl.checked,
      "dhl",
      post_nord.checked,
      "post",
      credit.checked,
      "credit"
    );
    if (dhl.checked === false && post_nord.checked === false && bring.checked === false) {
      error = "delivery provider";
    } else if (credit.checked === false && mobile_pay.checked === false) {
      console.log("payment");
      error = "payment solution";
    }

    if (credit.checked && error === "no error") {
      console.log("lol");
      credit_modal();
    } else if (mobile_pay.checked && error === "no error") {
      console.log("lol2");
      mobile_pay_modal();
    } else {
      modal_error(error);
    }

    const close_btn = document.querySelector("#close");
    console.log(close_btn);
    close_btn.addEventListener("click", (event) => {
      closeModal();
    });
  });

  const pay = document.querySelector(".payment_form");
  pay.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submitted");
  });
  console.log(localStorage.getItem("checkout"));
  document.querySelector(".checkout_price").innerText = localStorage.getItem("checkout");

  listeners();

  function restore_form(form, billing = "") {
    console.log(form);
    console.log(form.id);

    const target_form = document.querySelector(`#${form}`);
    target_form.querySelector(".email").value = sessionStorage.getItem(`email${billing}`) || "";
    target_form.querySelector(".first_name").value = sessionStorage.getItem("first_name") || "";
    target_form.querySelector(".last_name").value = sessionStorage.getItem("last_name") || "";
    target_form.querySelector(".address").value = sessionStorage.getItem("address") || "";
    target_form.querySelector(".zip").value = sessionStorage.getItem("zip") || "";
    target_form.querySelector(".city").value = sessionStorage.getItem("city") || "";
    target_form.querySelector(".mobile").value = sessionStorage.getItem("mobile") || "";
  }

  // function restore_form() {
  //   document.querySelector(".email").value = sessionStorage.getItem(`email`) || "";
  //   document.querySelector(".first_name").value = sessionStorage.getItem("first_name") || "";
  //   document.querySelector(".last_name").value = sessionStorage.getItem("last_name") || "";
  //   document.querySelector(".address").value = sessionStorage.getItem("address") || "";
  //   document.querySelector(".zip").value = sessionStorage.getItem("zip") || "";
  //   document.querySelector(".city").value = sessionStorage.getItem("city") || "";
  //   document.querySelector(".mobile").value = sessionStorage.getItem("mobile") || "";
  // }

  // Get the element by its ID

  function show_html() {
    const show_html = document.querySelectorAll(".address_confirmed");
    const hide_html = document.querySelectorAll(".no_address");
    show_html.forEach((html) => {
      if (address_confirmed) {
        html.style.display = "block";
      } else {
        // If the condition is false, hide the element
        html.style.display = "none";
      }
    });

    hide_html.forEach((html) => {
      if (address_confirmed) {
        html.style.display = "none";
      } else {
        html.style.display = "block";
      }
    });
  }

  document.querySelector("#post").addEventListener("click", function (event) {
    if (event.target.type === "radio" && String(event.target.classList) === "post_form") {
      document.querySelectorAll(".post_form").forEach(function (radio) {
        radio.checked = false;
      });
      localStorage.setItem("delivery", event.target.value);
      document.querySelector(".delivery_price").innerText = event.target.value;
      sum_price();
      event.target.checked = true;
    }
  });

  document.querySelector("#pay").addEventListener("click", function (event) {
    if (event.target.type === "radio") {
      document.querySelectorAll(".pay_form").forEach(function (radio) {
        radio.checked = false;
      });

      event.target.checked = true;
    }
  });

  function sum_price() {
    const sum = parseFloat(localStorage.getItem("checkout")) + parseFloat(localStorage.getItem("delivery"));
    document.querySelector(".sum_price").innerText = sum;
  }

  function restore_radio_btn() {
    try {
      const id = sessionStorage.getItem("radio");
      document.querySelector(`#${id}`).checked = true;
    } catch {}
  }

  function load_billing() {
    billing_active = true;
    const billing = document.querySelector(".billing");
    const form = document.createElement("form");
    const fieldset = document.querySelector(".fieldset");
    form.method = "post";
    form.id = "billing";
    let clone = fieldset.cloneNode(true);
    form.appendChild(clone);
    //remove billing extra cloned checkbox
    const clean = form.querySelectorAll(".billing_check");
    clean.forEach((ele) => {
      ele.remove();
    });
    clone.querySelector("legend").innerText = "Billing address";
    // sessionStorage.getItem("billing") ? form.reset() : restore_form(form, "_billing");
    billing.appendChild(form);
  }

  function hide_billing() {
    billing_active = false;
    document.querySelector("#billing").remove();
  }

  function listeners() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        console.log(event.target.className);
        console.log(event.target.value);
        console.log(event.target.type);
        if (event.target.type === "radio") {
          sessionStorage.setItem("radio", event.target.className);
          console.log("hit");
        } else if (event.target.type === "checkbox") {
          console.log("checkbox!!!!!");
          console.log(event.target.checked);
          event.target.checked ? hide_billing() : load_billing();
          sessionStorage.setItem("radio", event.target.className);
        } else if (event.target.type !== "radio" && event.target.type !== "checkbox") {
          sessionStorage.setItem(event.target.className, event.target.value);
        }
      });
    });
  }

  function remove_billing() {
    const billing = document.querySelector("#billing");
    const inputs = billing.querySelectorAll("input");
    inputs.forEach((input) => {
      input.removeEventListener("input", (event) => {
        sessionStorage.setItem(event.target.className + "_billing", event.target.value);
      });
    });
  }

  function billing_listeners() {
    const billing = document.querySelector("#billing");
    const inputs = billing.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        sessionStorage.setItem(event.target.className + "_billing", event.target.value);
        sessionStorage.getItem(event.target.className + "_billing");
      });
    });
  }
  function get_form_data(the_form, saved_data) {
    let form = document.querySelector(`#${the_form}`);
    const email = form.querySelector(".email");
    const first_name = form.querySelector(".first_name");
    const last_name = form.querySelector(".last_name");
    const address = form.querySelector(".address");
    const zip = form.querySelector(".zip");
    const city = form.querySelector(".city");
    const mobile = form.querySelector(".mobile");

    // Example: Accessing values
    console.log("Email:", email.value);
    console.log("First Name:", first_name.value);
    console.log("Last Name:", last_name.value);
    console.log("Address:", address.value);
    console.log("Zip Code:", zip.value);
    console.log("City:", city.value);
    console.log("Mobile:", mobile.value);

    let saved = document.querySelector(`#${saved_data}`);
    const email_saved = saved.querySelector(".email");
    const first_name_saved = saved.querySelector(".first_name");
    const last_name_saved = saved.querySelector(".last_name");
    const address_saved = saved.querySelector(".address");
    const zip_saved = saved.querySelector(".zip");
    const city_saved = saved.querySelector(".city");
    const mobile_saved = saved.querySelector(".mobile");

    email_saved.innerText = email.value;
    first_name_saved.innerText = first_name.value;
    last_name_saved.innerText = last_name.value;
    first_name_saved.innerText = first_name.value;
    address_saved.innerText = address.value;
    zip_saved.innerText = zip.value;
    city_saved.innerText = city.value;
    mobile_saved.innerText = mobile.value;
  }
});

function credit_modal() {
  document.getElementById("modal_overlay").style.display = "flex";
}

function mobile_pay_modal() {
  const mobile_pay_html = `
  <form class='payment_form mobilepay' method='post'>
    <span tabindex="0" class='h4-font' id='close'>
      X
    </span>
    <legend class='h4-font'>Enter mobile number</legend>
    <fieldset class='flex_column'>
      <label for='number'>Phone number:</label>
      <input type='text' id='number' name='number' pattern='[0-9]{8}' title='Enter a 8-digit phone number' required />
      <div class='button'>
        <button class='button pay' type='submit' value='Submit'>
          Pay
        </button>
      </div>
    </fieldset>
  </form>
`;
  document.getElementById("modal_overlay").style.display = "flex";
  document.querySelector(".modal").innerHTML = mobile_pay_html;
}

function modal_error(error) {
  const error_modal = ` <span tabindex="0" class="h4-font" id="close">X</span>
  <h4>You mush choose a ${error}</h4>
  <div class="close_modal button">
    <button>Ok</button>
  </div>
  `;
  document.getElementById("modal_overlay").style.display = "flex";
  document.querySelector(".modal").innerHTML = error_modal;
  document.querySelector(".close_modal").addEventListener("click", closeModal);
}

// Function to close the modal
function closeModal() {
  document.getElementById("modal_overlay").style.display = "none";
}

// Function to handle form submission (you can replace this with your own logic)
function submitForm(event) {
  event.preventDefault();
  alert("Form submitted!"); // Replace this with your form submission logic
  closeModal();
}
function is_logged_in() {
  const email = sessionStorage.getItem("email");
  if (email !== null) {
    // alert("user logged in");
    return true;
  } else {
    // alert("user NOT logged in");
    window.location.href = "/index.html";
  }
}

function header_selectors() {
  document.querySelector(".dropdown_user").addEventListener("click", () => {
    const element = document.querySelector(".dropdown_logout");
    element.classList.toggle("hide");
  });
  document.querySelector(".dropdown_logout").addEventListener("click", function () {
    this.classList.toggle("hide");
  });
  const burger_menu = document.querySelector(".hamburger_btn");
  const close_menu = document.querySelector(".fixed_top");
  burger_menu.addEventListener("click", function () {
    const menu = document.querySelector(".hamburger_content");
    menu.classList.toggle("showmenu");
  });
  close_menu.addEventListener("click", function () {
    const menu = document.querySelector(".hamburger_content");
    menu.classList.toggle("showmenu");
  });

  document.querySelector(".log_out_btn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/index.html";
  });
}

export function focused_element() {
  document.addEventListener("keypress", function (event) {
    console.log(event);
    if (event.key === "Enter") {
      get_focused(event);
    } else {
      console.log(event);
    }
  });

  function get_focused(event) {
    const focus = document.activeElement;

    if (focus.tagName === "LI" && focus.querySelector(".dropdown_btn")) {
      const btn = focus.querySelector("button");
      const dropdownContent = focus.querySelector(".dropdown-content");
      dropdownContent.style.display = "block";
      console.log(focus);
      console.log(focus.classList);
    } else if (focus.tagName === "LI" && focus.querySelector(".user_btn")) {
      const btn = focus.querySelector("button");
      const dropdownContent = focus.querySelector(".dropdown_logout");
      dropdownContent.style.display = "block";
    } else if (focus.tagName === "LI") {
      const btn = focus.querySelector("button");
      btn.click();
    } else if (focus.tagName === "SELECT") {
      console.log(focus);
      // const select = focus.querySelector(".select");
      focus.click();
    } else if (focus.tagName === "ARTICLE") {
      focus.click();
    } else if (focus.tagName === "ARTICLE") {
      focus.click();
    } else if (focus.type === "radio") {
      console.log(focus);
      console.log("is input");
      focus.click();
    } else if ((focus.tagName === "INPUT" && focus.type === "radio") || focus.type === "checkbox") {
      console.log("radio");

      //   console.log(focus, "ccccccccc");
      //   const checkbox = document.querySelector(".billing_check");

      //   // hide_billing();
      //   if (checkbox.checked === true) {
      //     console.log("true");
      //     checkbox.click();
      //     checkbox.checked = false;
      //   } else {
      //     console.log("false");
      //     checkbox.click();
      //     checkbox.checked = true;
      //   }
      // }

      // focus.click();
      // console.log(focus);
      // console.log(focus.checked);
      // console.log(focus.classList);
      // const close_dropdown = focus.querySelector(".close_dropdown");
      // if (close_dropdown) {
      //   document.addEventListener("keydown", function (event) {
      //     if (event.key === "Tab") {
      //       console.log("Tab key pressed!");
      //       console.log(document.closest(".close_here"));
      //     }
      //   });
      // }
    } else if (focus.tagName !== "INPUT") {
      console.log(focus);

      focus.click();
    }
  }

  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.key === "Enter") {
      // Trigger the click event on the button with the specified ID
      get_focused();
    }
  });

  const nav_items = document.querySelectorAll("nav li");

  nav_items.forEach((list) => {
    const btn = list.querySelector("button");
  });
}
