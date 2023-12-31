export function focused_element() {


  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Call your function here
      get_focused();
    }
  });

  function get_focused() {
    const focus = document.activeElement;

    if (focus.tagName === "LI" && focus.querySelector(".dropdown_btn")) {
      const btn = focus.querySelector("button");
      const dropdownContent = focus.querySelector(".dropdown-content");
      dropdownContent.style.display = "block";
    }

    if (focus.tagName === "LI" && focus.querySelector(".user_btn")) {
      const btn = focus.querySelector("button");
      const dropdownContent = focus.querySelector(".dropdown_logout");
      dropdownContent.style.display = "block";
    }

    if (focus.tagName === "LI") {
      const btn = focus.querySelector("button");
      btn.click();
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
