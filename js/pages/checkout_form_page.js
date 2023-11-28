import { is_logged_in } from "../functions/is_logged_in";

document.addEventListener("DOMContentLoaded", () => {
  is_logged_in();
  let address_confirmed;
  let billing_active;
  sum_price();
  restore_form("address_form");
  show_html();
  const address_form = document.querySelector("#address_form");
  const change_data = document.querySelector("#change_data");
  change_data.addEventListener("click", (event) => {
    address_form.classList.add("showblock");
    change_data.classList.add("hide");
    document.querySelector(".btn_border").classList.add("hide");
  });

  address_form.addEventListener("submit", (event) => {
    openModal();
    try {
      const change_data = document.querySelector("#change_data");
      change_data.classList.add("showblock");
      document.querySelector(".btn_border").classList.add("showflex");
    } catch {}

    event.preventDefault();

    // event.stopImmediatePropagation();
    // event.stopPropagation();

    document.querySelector("#address_form").classList.add("hide");
    const saved = document.querySelector("#saved");
    saved.classList.add("showdata");
    address_confirmed = true;
    show_html();
    restore_radio_btn();
    get_form_data("address_form", "saved");
  });

  const close_btn = document.querySelector("#close");
  console.log(close_btn);
  close_btn.addEventListener("click", (event) => {
    // document.getElementById("modal_overlay").style.display = "none";
    closeModal();
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
    const clean = form.querySelectorAll(".billing_check");
    clean.forEach((ele) => {
      ele.remove();
    });
    clone.querySelector("legend").innerText = "Billing address";
    sessionStorage.getItem("billing") ? form.reset() : restore_form(form, "_billing");
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

function openModal() {
  document.getElementById("modal_overlay").style.display = "flex";
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
