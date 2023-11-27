// document.addEventListener("DOMContentLoaded", () => {
let address_confirmed;
restore_form("address_form");
show_html();

const confirm_btn = document.querySelector("#address_form");
confirm_btn.addEventListener("submit", (event) => {
  event.preventDefault();

  // event.stopImmediatePropagation();
  // event.stopPropagation();
  const email = document.querySelector(".email");
  const first_name = document.querySelector(".first_name");
  const last_name = document.querySelector(".last_name");
  const address = document.querySelector(".address");
  const zip = document.querySelector(".zip");
  const city = document.querySelector(".city");
  const mobile = document.querySelector(".mobile");

  // Example: Accessing values
  console.log("Email:", email.value);
  console.log("First Name:", first_name.value);
  console.log("Last Name:", last_name.value);
  console.log("Address:", address.value);
  console.log("Zip Code:", zip.value);
  console.log("City:", city.value);
  console.log("Mobile:", mobile.value);

  document.querySelector("#address_form").classList.add("hide");
  const saved = document.querySelector("#saved");
  saved.classList.add("showdata");
  address_confirmed = true;
  show_html();
  restore_radio_btn();

  const email_saved = document.querySelector(".email");
  const first_name_saved = document.querySelector(".first_name");
  const last_name_saved = document.querySelector(".last_name");
  const address_saved = document.querySelector(".address");
  const zip_saved = document.querySelector(".zip");
  const city_saved = document.querySelector(".city");
  const mobile_saved = document.querySelector(".mobile");

  email_saved.innerText = email.value;
  first_name_saved.innerText = first_name.value;
  last_name_saved.innerText = last_name.value;
  first_name_saved.innerText = first_name.value;
  address_saved.innerText = address.value;
  zip_saved.innerText = zip.value;
  city_saved.innerText = city.value;
  mobile_saved.innerText = mobile.value;
});
listeners();
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
        console.log(event.target.closest("#billing"));
        sessionStorage.setItem(event.target.className, event.target.value);

        event.target.closest("#billing")
          ? sessionStorage.setItem(event.target.className, event.target.value)
          : sessionStorage.setItem(event.target.className + "_billing", event.target.value);
      }
    });
  });
  // });
}
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
  if (event.target.type === "radio") {
    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.checked = false;
    });

    event.target.checked = true;
  }
});

function restore_radio_btn() {
  try {
    const id = sessionStorage.getItem("radio");
    document.querySelector(`#${id}`).checked = true;
  } catch {}
}

function load_billing() {
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
  document.querySelector("#billing").remove();
}

// });
