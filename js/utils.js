function convert_category(category) {
  let output;
  switch (category) {
    case "mens":
      output = "/category/men's clothing";
      break;
    case "womens":
      output = "/category/women's clothing";
      break;
    case "jewelery":
      output = "/category/jewelery";
      break;
    case "electronics":
      output = "/category/electronics";
      break;
  }
  return output;
}
