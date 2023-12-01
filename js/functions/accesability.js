export function focused_element() {
  document.addEventListener("keypress", function (event) {
    // event.preventDefault();
    console.log(event);
    if (event.key === "Enter") {
      get_focused();
    } else {
      console.log(event);
    }
  });

  function get_focused() {
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
    } else if (focus.tagName === "INPUT") {
      console.log(focus);
      focus.click();
    } 
    // focus.click();
    // console.log(focus);
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

    // } else {
    //   console.log(focus);
    //   // const select = focus.querySelector(".select");
    //   focus.click();
    // }
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
