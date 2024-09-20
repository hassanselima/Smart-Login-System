"use strict";

const logoutBtn = document.getElementById("logoutBtn");
const message = document.getElementById("welcome-msg");

let userName = localStorage.getItem("userName");
message.innerText = userName;

logoutBtn.addEventListener("click", logout);
function logout() {
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}
