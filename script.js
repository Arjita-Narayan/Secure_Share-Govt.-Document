const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

signUpButton.addEventListener("click", function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

signInButton.addEventListener("click", function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

// Show fields based on selected sign-in method
const emailRadio = document.getElementById("signInEmail");
const phoneRadio = document.getElementById("signInPhone");
const emailSignInFields = document.getElementById("emailSignInFields");
const phoneSignInFields = document.getElementById("phoneSignInFields");

emailRadio.addEventListener("change", function () {
  if (emailRadio.checked) {
    emailSignInFields.style.display = "block";
    phoneSignInFields.style.display = "none";
  }
});

phoneRadio.addEventListener("change", function () {
  if (phoneRadio.checked) {
    emailSignInFields.style.display = "none";
    phoneSignInFields.style.display = "block";
  }
});

// Firebase functions and event listeners as before
