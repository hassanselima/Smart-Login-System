("use strict");

const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const login = document.getElementById("loginLink");
const incorrect = document.getElementById("incorrect");
const inputs = document.querySelectorAll(".form-control");
const patterns = {
  nameRe: /^[a-zA-Z][a-zA-Z\d'-]{2,}$/i,
  emailRe: /^[a-zA-Z][\w\.-]*@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
  passRe: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
};
let storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];

signupBtn.addEventListener("click", signup);

function signup() {
  if (
    inputName.value.trim() !== "" &&
    inputEmail.value.trim() !== "" &&
    inputPassword.value.trim() !== ""
  ) {
    if (checkData()) {
      let user = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
      };
      storedUsers.push(user);
      localStorage.setItem("usersData", JSON.stringify(storedUsers));
      window.location.href = "index.html";
    } else {
      incorrect.innerText = " All inputs must be valid";
    }
  } else {
    incorrect.innerText = " All inputs are required";
  }
}

function checkData() {
  return (
    patterns.nameRe.test(inputName.value) &&
    patterns.emailRe.test(inputEmail.value) &&
    patterns.passRe.test(inputPassword.value)
  );
}

inputs.forEach((input) => {
  let regex = patterns[input.getAttribute("data-RegExp")];
  input.addEventListener("input", () => {
    const message = input.parentElement.querySelector(".message");
    if (regex.test(input.value)) {
      input.classList.remove("inValid");
      input.classList.add("valid");
      message.innerText = "valid ✔";
    } else {
      input.classList.remove("valid");
      input.classList.add("inValid");
      message.innerText = "Invalid ✗";
    }
  });
});
