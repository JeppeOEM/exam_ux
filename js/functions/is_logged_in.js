export function is_logged_in() {
  const email = sessionStorage.getItem("email") ?? null;
  const password = sessionStorage.getItem("password") ?? null;
  if (email !== null && password !== null) {

    alert("user logged in");
    return true;
  } else {
    alert("user NOT logged in");

    window.location.href = "/login.html";
  }
}
