export async function breadcrumb_links(category) {
  let bread = await breadcrumb(category);
  const breadcrumb_btns = bread.querySelectorAll(".breadcrumb_btn");
  if (window.location.pathname === "/shop.html") {
    breadcrumb_btns.forEach((btn) => {
      console.log(btn);
      btn.addEventListener("click", (event) => {
        console.log(btn);
        console.log("get_p", btn.dataset.filter);
        sessionStorage.setItem("category", btn.dataset.filter);
        get_products(event, btn.dataset.filter);
      });
    });
  } else {
    breadcrumb_btns.forEach((btn) => {
      console.log(btn);
      btn.addEventListener("click", (event) => {
        console.log(btn);
        console.log("link", btn.dataset.filter);
        sessionStorage.setItem("category", btn.dataset.filter);
        window.location.href = "/shop.html";
      });
    });
  }
}

export async function breadcrumb(category) {
  let sub;

  if (category === "men's clothing") {
    sub = "/Men";
  } else if (category === "women's clothing") {
    sub = "/Women";
  } else if (category === "all" || category == "null") {
    category = "";
  }

  const path = document.querySelector(".breadcrumb");

  // Create elements
  const allLink = document.createElement("button");
  allLink.classList = "breadcrumb_btn";
  // allLink.href = "shop.html";
  allLink.innerText = "All products";
  allLink.dataset.filter = "all";
  // allLink.addEventListener("click", () => {
  //   sessionStorage.setItem("category", null);
  // });

  sub ? subcategory() : no_sub_category();

  function subcategory() {
    const clothingLink = document.createElement("button");
    clothingLink.classList = "breadcrumb_btn";
    // clothingLink.id = "clothing";
    // clothingLink.href = "shop.html";
    clothingLink.textContent = "/Clothing";
    clothingLink.dataset.filter = "clothing";
    // clothingLink.addEventListener("click", () => {
    //   sessionStorage.setItem("category", `${category}`);
    // });

    const subLink = document.createElement("button");
    subLink.classList = "breadcrumb_btn";
    subLink.textContent = sub;
    subLink.dataset.filter = sub.charAt(0).toLowerCase() + category.slice(1);

    // Clear existing content
    path.innerHTML = "";

    // Append elements to the DOM
    path.appendChild(allLink);
    // path.appendChild(document.createTextNode(" / "));
    path.appendChild(clothingLink);

    path.appendChild(subLink);
    console.log(path.innerHTML);
  }
  function no_sub_category() {
    path.innerHTML = "";
    path.appendChild(allLink);
    const category_link = document.createElement("button");
    category_link.dataset.filter = category.charAt(0).toLowerCase() + category.slice(1);
    // category_link.href = "shop.html";
    category_link.classList = "breadcrumb_btn";
    category_link.textContent = ` / ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    // category_link.addEventListener("click", () => {
    //   sessionStorage.setItem("category", `${category}`);
    // });
    path.appendChild(category_link);
  }
  console.log(path.innerHTML);
  return path;
}
