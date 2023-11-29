export async function breadcrumb(category) {
  let sub;

  if (category === "men's clothing") {
    sub = "Men /";
  } else if (category === "women's clothing") {
    sub = "Women /";
  } else if (category === "all" || category == "null") {
    category = "";
  }

  const path = document.querySelector(".breadcrumb");

  // Create elements
  const allLink = document.createElement("button");
  allLink.classList = "breadcrumb_btn";
  // allLink.href = "shop.html";
  allLink.textContent = "All products";
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
    clothingLink.textContent = "Clothing";
    clothingLink.dataset.filter = "clothing";
    // clothingLink.addEventListener("click", () => {
    //   sessionStorage.setItem("category", `${category}`);
    // });

    const subLink = document.createElement("button");
    // subLink.href = "shop.html";
    subLink.textContent = sub;
    subLink.dataset.filter = sub.charAt(0).toLowerCase() + category.slice(1);

    // Clear existing content
    path.innerHTML = "";

    // Append elements to the DOM
    path.appendChild(allLink);
    path.appendChild(document.createTextNode(" / "));
    path.appendChild(clothingLink);
    path.appendChild(document.createTextNode(" / "));
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
    category_link.textContent = ` / ${category.charAt(0).toLowerCase() + category.slice(1)}`;
    // category_link.addEventListener("click", () => {
    //   sessionStorage.setItem("category", `${category}`);
    // });
    path.appendChild(category_link);
  }
  console.log(path.innerHTML);
  return path;
}
