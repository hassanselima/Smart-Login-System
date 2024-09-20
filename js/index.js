"use strict";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const signUp = document.getElementById("signupLink");
const incorrect = document.getElementById("incorrect");
const inputs = document.querySelectorAll(".form-control");
const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
const patterns = {
  nameRe: /^[a-zA-Z][a-zA-Z\d'-]{2,}$/i,
  emailRe: /^[a-zA-Z][\w\.-]*@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
  passRe: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
};

loginBtn.addEventListener("click", login);

function login() {
  if (isDataValid()) {
    if (getData()) {
      window.location.href = "home.html";
    } else {
      incorrect.innerText = "Your email or password is incorrect";
    }
  } else {
    incorrect.innerText = "All inputs are required";
  }
}

function getData() {
  let user = {
    email: email.value,
    password: password.value,
  };
  return isCorrectData(user);
}

function isCorrectData(user) {
  let isCorrect = false;
  for (let i = 0; i < storedUsers.length; i++) {
    if (
      user.email === storedUsers[i].email &&
      user.password === storedUsers[i].password
    ) {
      isCorrect = true;
      localStorage.setItem("userName", storedUsers[i].name);
      break;
    }
  }
  return isCorrect;
}

function isDataValid() {
  if (
    patterns.emailRe.test(email.value) &&
    patterns.passRe.test(password.value)
  ) {
    return true;
  } else {
    return false;
  }
}
