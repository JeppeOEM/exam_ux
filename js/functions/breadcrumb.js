export function breadcrumb(category) {
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
  const allLink = document.createElement("a");
  allLink.id = "all";
  allLink.href = "index.html";
  allLink.textContent = "All products";
  allLink.addEventListener("click", () => {
    sessionStorage.setItem("category", null);
  });

  sub ? subcategory() : no_sub_category();

  function subcategory() {
    const clothingLink = document.createElement("a");
    clothingLink.id = "clothing";
    clothingLink.href = "shop.html";
    clothingLink.textContent = "clothing";
    clothingLink.addEventListener("click", () => {
      sessionStorage.setItem("category", `${category}`);
    });

    const subLink = document.createElement("a");
    subLink.href = "shop.html";
    subLink.textContent = sub;

    // Clear existing content
    path.innerHTML = "";

    // Append elements to the DOM
    path.appendChild(allLink);
    path.appendChild(document.createTextNode(" / "));
    path.appendChild(clothingLink);
    path.appendChild(document.createTextNode(" / "));
    path.appendChild(subLink);
  }
  function no_sub_category() {
    path.innerHTML = "";
    path.appendChild(allLink);
    const category_link = document.createElement("a");
    category_link.id = "clothing";
    category_link.href = "shop.html";
    category_link.textContent = ` / ${category}`;
    category_link.addEventListener("click", () => {
      sessionStorage.setItem("category", `${category}`);
    });
    path.appendChild(category_link);
  }
}
