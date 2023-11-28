export function is_logged_in() {
  const email = sessionStorage.getItem("email");
  if (email !== null) {
    alert("user logged in");
    return true;
  } else {
    alert("user NOT logged in");
    window.location.href = "/index.html";
  }
}
