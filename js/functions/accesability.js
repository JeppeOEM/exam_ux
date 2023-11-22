export function focused_element() {
  document.addEventListener("keypress", function (event) {
    console.log("dddd");
    if (event.key === "Enter") {
      // Call your function here
      get_focused();
    }
  });
  console.log("lol");

  function get_focused() {
    const focus = document.activeElement;
    if (focus.tagName === "LI") {
      const btn = focus.querySelector("button");
      btn.click();
      console.log(btn, "CLICKED");
    }
  }

  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.key === 13) {
      // Trigger the click event on the button with the specified ID
      get_focused();
    }
  });

  const nav_items = document.querySelectorAll("nav li");

  nav_items.forEach((list) => {
    const btn = list.querySelector("button");
  });
}
