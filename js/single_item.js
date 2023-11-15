var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");

// Now 'id' contains the value passed from the previous page
console.log(id);
