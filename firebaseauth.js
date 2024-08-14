// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBPbk1aVTNMnrUOJZu6Fpg-lVr6shf0K4",
  authDomain: "form-authentication-5cf22.firebaseapp.com",
  projectId: "form-authentication-5cf22",
  storageBucket: "form-authentication-5cf22.appspot.com",
  messagingSenderId: "701947966529",
  appId: "1:701947966529:web:a20c94a602d3ff040882c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Register event listener for Sign Up button
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      showMessage("Account Created Successfully", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
          showMessage(
            "Error writing document: " + error.message,
            "signUpMessage"
          );
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email Address Already Exists!!!", "signUpMessage");
      } else {
        showMessage("Unable to create User: " + error.message, "signUpMessage");
      }
    });
});

// Set up reCAPTCHA verifier
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow user to proceed
      if (document.getElementById("signInPhone").checked) {
        sendVerificationCode();
      }
    },
  },
  auth
);

// Function to send OTP
function sendVerificationCode() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      showMessage("OTP sent to " + phoneNumber, "signInMessage");
      document.getElementById("verify-code").style.display = "block";
    })
    .catch((error) => {
      showMessage("Error sending OTP: " + error.message, "signInMessage");
    });
}

// Add event listener to Send OTP button
document
  .getElementById("sendOtpButton")
  .addEventListener("click", sendVerificationCode);

// Function to verify OTP
function verifyCode() {
  const otp = document.getElementById("otp").value;
  window.confirmationResult
    .confirm(otp)
    .then((result) => {
      const user = result.user;
      showMessage("Phone number verified and logged in", "signInMessage");
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      showMessage("Error verifying OTP: " + error.message, "signInMessage");
    });
}

// Add event listener to Verify OTP button
document
  .getElementById("verifyOtpButton")
  .addEventListener("click", verifyCode);

// Sign In event listener
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  if (document.getElementById("signInEmail").checked) {
    // Sign In with Email/Password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage("Login is successful", "signInMessage");
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "homepage.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          showMessage("Incorrect Email or Password", "signInMessage");
        } else {
          showMessage("Account does not exist", "signInMessage");
        }
      });
  }
});

// Monitor authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.uid);
    // Proceed with fetching files or other authenticated actions
  } else {
    // No user is signed in
    console.log("No user is signed in");
    // Handle unauthenticated state
  }
});
