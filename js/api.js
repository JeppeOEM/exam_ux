async function get_products() {
  let response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
  let json = await response.json();
  console.log(json);
}
