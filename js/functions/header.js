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

  //   const aside = document.querySelector("#cart");
  //   const hide = document.querySelector(".continue");
  //   const show_cart = document.querySelector("#cart_btn");
  //   const body = document.querySelector("body");

  //   hide.addEventListener("click", (event) => {
  //     aside.classList.remove("show");
  //     body.classList.remove("body_overflow");
  //   });
  //   show_cart.addEventListener("click", (event) => {
  //     show_current_items();
  //     aside.classList.add("show");
  //     body.classList.add("body_overflow");
  //   });
  //   const filter_btns = document.querySelectorAll(".navbar .filter");
  //   if (window.location.pathname === "/shop.html") {
  //     filter_btns.forEach(function (filter_btn) {
  //       filter_btn.addEventListener("click", get_products);
  //     });
  //   } else {
  //     filter_btns.forEach(function (filter_btn) {
  //       const category = filter_btn.dataset.filter;
  //       console.log(filter_btn);
  //       console.log(category);
  //       // sessionStorage.setItem("category", category);
  //       filter_btn.addEventListener("click", () => {
  //         console.log("llllll");
  //         console.log(filter_btn);
  //         const category = filter_btn.dataset.filter;
  //         console.log(category);
  //         sessionStorage.setItem("category", category);
  //         window.location.href = "/shop.html";
  //       });
  //     });
  //   }
}
