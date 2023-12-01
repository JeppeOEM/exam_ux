export function header_selectors() {
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
