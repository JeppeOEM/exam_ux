export function is_logged_in() {
  const email = sessionStorage.getItem("email") ?? null;
  const password = sessionStorage.getItem("password") ?? null;
  if (email !== null && password !== null) {
    console.log("User is logged in");
    alert("user logged in");
    return true;
  } else {
    alert("user NOT logged in");
    console.log("User is not logged in");
    window.location.href = "/login.html";
  }
}